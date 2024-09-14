// //* app/api/addVideos/route.ts
// import { NextResponse } from "next/server";
// import { db, storage } from "@/libs/firebase/config";
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { v4 as uuidv4 } from "uuid";
// import { z } from "zod";
// import { revalidatePath } from "next/cache";

// //* Video Max Size , Image Max Size , Chapter Max size
// const MAX_VIDEO_SIZE_MB = 50;
// const MAX_IMAGE_SIZE_MB = 5;

// //! VIDEO SCHEMA BY ZOD
// const videoSchema = z.object({
//   videoTitle: z.string().min(1, "Title en az 10 karakter olmalı ve boş olamaz"),
//   videoDescription: z.string().min(1, "Description minimum 30 karakter olmalı"),
//   videoType: z.enum(["Free", "Premium"], {
//     invalid_type_error: "Geçersiz Video Tipi",
//     required_error: "Video Tipi Seçiniz",
//   }),
//   videoCategory: z.string().min(1, "Kategori boş olamaz"),
//   videoCoverImage: z
//     .instanceof(File)
//     .refine((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024, {
//       message: `Kapak resmi ${MAX_IMAGE_SIZE_MB}MB'dan büyük olamaz`,
//     }),
//   promoVideo: z
//     .instanceof(File)
//     .refine((file) => file.size <= MAX_VIDEO_SIZE_MB * 1024 * 1024, {
//       message: `Promo video ${MAX_VIDEO_SIZE_MB}MB'dan büyük olamaz`,
//     }),
//   chapters: z.array(
//     z.object({
//       title: z.string().min(1, "Bölüm başlığı boş olamaz"),
//       fileKey: z.string(), // fileKey bir string olmalı
//     })
//   ),
// });
// export async function POST(request: Request) {
//   try {
//     //* FormData'dan veri alma
//     const formData = await request.formData();
//     const videoTitle = formData.get("videoTitle") as string;
//     const videoDescription = formData.get("videoDescription") as string;
//     const videoType = formData.get("videoType") as string;
//     const videoCategory = formData.get("videoCategory") as string;
//     const chapters = JSON.parse(formData.get("chapters") as string);
//     //* Cover Image ve Promo Video'yu Storage'a yükleme
//     const videoCoverImage = formData.get("videoCoverImage") as File;
//     const promoVideo = formData.get("promoVideo") as File;

//     // Debug: Blob olup olmadıklarını kontrol edin

//     //* Şemayı kullanarak doğrulama
//     const validationResult = videoSchema.safeParse({
//       videoTitle,
//       videoDescription,
//       videoType,
//       videoCategory,
//       videoCoverImage,
//       promoVideo,
//       chapters,
//     });

//     if (!validationResult.success) {
//       //! Hata durumunda uygun hata mesajını döndür
//       return NextResponse.json(
//         {
//           error: validationResult.error.errors.map((e) => e.message).join(", "),
//         },
//         { status: 400 }
//       );
//     }
//     //* Video dosyaları için benzersiz ID oluşturun
//     const videoId = uuidv4();

//     const coverImageRef = ref(storage, `Videos/${videoId}/coverImage`);
//     const promoVideoRef = ref(storage, `Videos/${videoId}/promoVideo`);

//     await Promise.all([
//       uploadBytes(coverImageRef, videoCoverImage),
//       uploadBytes(promoVideoRef, promoVideo),
//     ]);

//     const coverImageUrl = await getDownloadURL(coverImageRef);
//     const promoVideoUrl = await getDownloadURL(promoVideoRef);

//     //* Chapter dosyalarını yükleme ve url lerini alma
//     const chapterData = [];
//     for (let i = 0; i < chapters.length; i++) {
//       //* chapterFile Olarak fileları ayrı yolladığımızda her birini teker teker burda çekiyoruz.
//       const chapterFile = formData.get(`chapterFile${i}`) as Blob;
//       if (chapterFile) {
//         const chapterRef = ref(
//           storage,
//           `Videos/${videoId}/chapters/${uuidv4()}`
//         );
//         await uploadBytes(chapterRef, chapterFile);
//         const chapterUrl = await getDownloadURL(chapterRef);

//         chapterData.push({
//           title: chapters[i].title,
//           fileUrl: chapterUrl,
//         });
//       }
//     }

//     // Tüm bilgileri tek seferde Firestore'a ekleyin
//     await addDoc(collection(db, "Videos"), {
//       title: videoTitle,
//       description: videoDescription,
//       categoryId: videoCategory,
//       videoType: videoType,
//       createdAt: Timestamp.now(),
//       coverImageUrl,
//       promoVideoUrl,
//       chapters: chapterData,
//       rate: 0,
//     });
//     revalidatePath("/e-learning");
//     return NextResponse.json({ message: "Video başarıyla yüklendi!" });
//   } catch (error: any) {
//     console.error("Video yüklenemedi:", error);
//     return NextResponse.json(
//       { error: "Bir hata oluştu: " + (error.message || "Bilinmeyen hata") },
//       { status: 500 }
//     );
//   }
// }

//! Admin Sdk

import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { adminDb, adminStorage } from "@/libs/firebaseAdmin/config";
import { Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

// //* Video Max Size , Image Max Size , Chapter Max size
const MAX_VIDEO_SIZE_MB = 50;
const MAX_IMAGE_SIZE_MB = 5;

// //! VIDEO SCHEMA BY ZOD
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
    const formData = await request.formData();
    const videoTitle = formData.get("videoTitle") as string;
    const videoDescription = formData.get("videoDescription") as string;
    const videoType = formData.get("videoType") as string;
    const videoCategory = formData.get("videoCategory") as string;
    const chapters = JSON.parse(formData.get("chapters") as string);

    const videoCoverImage = formData.get("videoCoverImage") as File;
    const promoVideo = formData.get("promoVideo") as File;

    //     //* Şemayı kullanarak doğrulama
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

    // Video dosyaları için benzersiz ID oluşturun
    const videoId = uuidv4();

    const coverImageRef = adminStorage
      .bucket()
      .file(`Videos/${videoId}/coverImage`);
    const promoVideoRef = adminStorage
      .bucket()
      .file(`Videos/${videoId}/promoVideo`);

    // File'ı Buffer'a çevirme
    const videoCoverBuffer = Buffer.from(await videoCoverImage.arrayBuffer());
    const promoVideoBuffer = Buffer.from(await promoVideo.arrayBuffer());

    // Dosya yükleme işlemi Buffer kullanarak yapılmalı
    await Promise.all([
      coverImageRef.save(videoCoverBuffer, {
        contentType: videoCoverImage.type,
      }),
      promoVideoRef.save(promoVideoBuffer, { contentType: promoVideo.type }),
    ]);

    // Dosyaları herkese açık hale getirme
    await coverImageRef.makePublic();
    await promoVideoRef.makePublic();

    // URL oluşturma
    const coverImageUrl = `https://firebasestorage.googleapis.com/v0/b/${
      adminStorage.bucket().name
    }/o/${encodeURIComponent(`Videos/${videoId}/coverImage`)}?alt=media`;
    const promoVideoUrl = `https://firebasestorage.googleapis.com/v0/b/${
      adminStorage.bucket().name
    }/o/${encodeURIComponent(`Videos/${videoId}/promoVideo`)}?alt=media`;

    console.log("Cover Image URL:", coverImageUrl);
    console.log("Promo Video URL:", promoVideoUrl);

    // https://firebasestorage.googleapis.com/v0/b/room-8facb.appspot.com/o/Videos%2Faf90c30f-729c-4942-bc37-262ce93e5536%2FcoverImage?alt=media&token=93b7429b-3f5a-4f6e-89a5-d4d12cd44ce4

    // Bölüm dosyalarını yükleme ve URL'lerini alma
    const chapterData = [];
    for (let i = 0; i < chapters.length; i++) {
      const chapterFile = formData.get(`chapterFile${i}`) as File;
      if (chapterFile) {
        const chapterBuffer = Buffer.from(await chapterFile.arrayBuffer());
        const chapterRef = adminStorage
          .bucket()
          .file(`Videos/${videoId}/chapters/${uuidv4()}`);

        // Dosyayı yükleme
        await chapterRef.save(chapterBuffer, { contentType: chapterFile.type });

        // Dosyanın herkese açık hale getirilmesi
        await chapterRef.makePublic();

        // URL oluşturma
        const chapterUrl = `https://firebasestorage.googleapis.com/v0/b/${
          adminStorage.bucket().name
        }/o/${encodeURIComponent(chapterRef.name)}?alt=media`;

        chapterData.push({
          title: chapters[i].title,
          fileUrl: chapterUrl,
        });
      }
    }

    // Firestore'a verileri ekleyin (Admin SDK kullanarak)
    await adminDb.collection("Videos").add({
      title: videoTitle,
      description: videoDescription,
      categoryId: videoCategory,
      videoType: videoType,
      createdAt: Timestamp.now(),
      coverImageUrl: coverImageUrl,
      promoVideoUrl: promoVideoUrl,
      chapters: chapterData,
      rate: 0,
    });

    return NextResponse.json({ message: "Video başarıyla yüklendi!" });
  } catch (error: any) {
    console.error("Video yüklenemedi:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu: " + (error.message || "Bilinmeyen hata") },
      { status: 500 }
    );
  }
}
