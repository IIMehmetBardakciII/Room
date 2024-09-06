//* app/api/addVideos/route.ts
import { NextResponse } from "next/server";
import { db, storage } from "@/libs/firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { revalidatePath } from "next/cache";

//* Video Max Size , Image Max Size , Chapter Max size
const MAX_VIDEO_SIZE_MB = 50;
const MAX_IMAGE_SIZE_MB = 5;

//! VIDEO SCHEMA BY ZOD
const videoSchema = z.object({
  videoTitle: z.string().min(1, "Title en az 10 karakter olmalı ve boş olamaz"),
  videoDescription: z.string().min(1, "Description minimum 30 karakter olmalı"),
  videoType: z.enum(["Free", "Premium"], {
    invalid_type_error: "Geçersiz Video Tipi",
    required_error: "Video Tipi Seçiniz",
  }),
  videoCategory: z.string().min(1, "Kategori boş olamaz"),
  videoCoverImage: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024, {
      message: `Kapak resmi ${MAX_IMAGE_SIZE_MB}MB'dan büyük olamaz`,
    }),
  promoVideo: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_VIDEO_SIZE_MB * 1024 * 1024, {
      message: `Promo video ${MAX_VIDEO_SIZE_MB}MB'dan büyük olamaz`,
    }),
  chapters: z.array(
    z.object({
      title: z.string().min(1, "Bölüm başlığı boş olamaz"),
      fileKey: z.string(), // fileKey bir string olmalı
    })
  ),
});
export async function POST(request: Request) {
  try {
    //* FormData'dan veri alma
    const formData = await request.formData();
    const videoTitle = formData.get("videoTitle") as string;
    const videoDescription = formData.get("videoDescription") as string;
    const videoType = formData.get("videoType") as string;
    const videoCategory = formData.get("videoCategory") as string;
    const chapters = JSON.parse(formData.get("chapters") as string);
    //* Cover Image ve Promo Video'yu Storage'a yükleme
    const videoCoverImage = formData.get("videoCoverImage") as File;
    const promoVideo = formData.get("promoVideo") as File;

    // Debug: Blob olup olmadıklarını kontrol edin

    //* Şemayı kullanarak doğrulama
    const validationResult = videoSchema.safeParse({
      videoTitle,
      videoDescription,
      videoType,
      videoCategory,
      videoCoverImage,
      promoVideo,
      chapters,
    });

    if (!validationResult.success) {
      //! Hata durumunda uygun hata mesajını döndür
      return NextResponse.json(
        {
          error: validationResult.error.errors.map((e) => e.message).join(", "),
        },
        { status: 400 }
      );
    }
    //* Video dosyaları için benzersiz ID oluşturun
    const videoId = uuidv4();

    const coverImageRef = ref(storage, `Videos/${videoId}/coverImage`);
    const promoVideoRef = ref(storage, `Videos/${videoId}/promoVideo`);

    await Promise.all([
      uploadBytes(coverImageRef, videoCoverImage),
      uploadBytes(promoVideoRef, promoVideo),
    ]);

    const coverImageUrl = await getDownloadURL(coverImageRef);
    const promoVideoUrl = await getDownloadURL(promoVideoRef);

    //* Chapter dosyalarını yükleme ve url lerini alma
    const chapterData = [];
    for (let i = 0; i < chapters.length; i++) {
      //* chapterFile Olarak fileları ayrı yolladığımızda her birini teker teker burda çekiyoruz.
      const chapterFile = formData.get(`chapterFile${i}`) as Blob;
      if (chapterFile) {
        const chapterRef = ref(
          storage,
          `Videos/${videoId}/chapters/${uuidv4()}`
        );
        await uploadBytes(chapterRef, chapterFile);
        const chapterUrl = await getDownloadURL(chapterRef);

        chapterData.push({
          title: chapters[i].title,
          fileUrl: chapterUrl,
        });
      }
    }

    // Tüm bilgileri tek seferde Firestore'a ekleyin
    await addDoc(collection(db, "Videos"), {
      title: videoTitle,
      description: videoDescription,
      categoryId: videoCategory,
      videoType: videoType,
      createdAt: Timestamp.now(),
      coverImageUrl,
      promoVideoUrl,
      chapters: chapterData,
      rate: 0,
    });
    revalidatePath("/e-learning");
    return NextResponse.json({ message: "Video başarıyla yüklendi!" });
  } catch (error: any) {
    console.error("Video yüklenemedi:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu: " + (error.message || "Bilinmeyen hata") },
      { status: 500 }
    );
  }
}
