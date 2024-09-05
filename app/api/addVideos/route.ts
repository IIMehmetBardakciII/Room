// app/api/addVideos/route.ts
import { NextResponse } from "next/server";
import { db, storage } from "@/libs/firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    // FormData'dan veri alın
    const formData = await request.formData();
    const videoTitle = formData.get("videoTitle") as string;
    const videoDescription = formData.get("videoDescription") as string;
    const videoType = formData.get("videoType") as string;
    const videoCategory = formData.get("videoCategory") as string;
    const chapters = JSON.parse(formData.get("chapters") as string);

    // Video dosyaları için benzersiz ID oluşturun
    const videoId = uuidv4();

    // Cover Image ve Promo Video'yu Storage'a yükleyin ve URL'lerini alın
    const coverImage = formData.get("videoCoverImage") as Blob;
    const promoVideo = formData.get("promoVideo") as Blob;

    const coverImageRef = ref(storage, `Videos/${videoId}/coverImage`);
    await uploadBytes(coverImageRef, coverImage);
    const coverImageUrl = await getDownloadURL(coverImageRef);

    const promoVideoRef = ref(storage, `Videos/${videoId}/promoVideo`);
    await uploadBytes(promoVideoRef, promoVideo);
    const promoVideoUrl = await getDownloadURL(promoVideoRef);

    // Chapter dosyalarını yükleyin ve URL'lerini alın

    const chapterData = [];
    for (let i = 0; i < chapters.length; i++) {
      //chapterFile Olarak fileları ayrı yolladığımızda her birini teker teker burda çekiyoruz.
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
