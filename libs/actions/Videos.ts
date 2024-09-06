"use server";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

type Chapter = {
  title: string;
  fileUrl: string;
};

type Video = {
  id: string;
  title: string;
  description: string;
  promoVideoUrl: string;
  coverImageUrl: string;
  createdAt: Date;
  categoryId: string; // categoryId eklenmiştir
  videosPart: Chapter[];
  videoType: "Free" | "Premium"; // videoType eklenmiştir
  rate: number;
};

export async function getAllVideos(): Promise<Video[]> {
  const collectionRef = collection(db, "Videos");
  const queryForSort = query(
    collectionRef,
    orderBy("createdAt", "desc"),
    limit(10)
  );
  const snapshot = await getDocs(queryForSort);
  const videos: Video[] = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title as string,
      description: data.description as string,
      promoVideoUrl: data.promoVideoUrl as string,
      coverImageUrl: data.coverImageUrl as string,
      rate: data.rate as number,
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : new Date(), // Convert Timestamp to Date
      categoryId: data.categoryId as string, // categoryId eklenmiştir
      videosPart: Array.isArray(data.chapters)
        ? data.chapters.map((chapter: any) => ({
            title: chapter.title as string,
            fileUrl: chapter.fileUrl as string,
          }))
        : [],
      videoType: data.videoType as "Free" | "Premium", // videoType eklenmiştir
    };
  });

  return videos;
}

export async function getSingleVideo(
  documentId: string
): Promise<Video | null> {
  const docRef = doc(db, "Videos", documentId);
  const docSnap = await getDoc(docRef);

  //* Bu Id ye ait döküman yoksa boş dön.
  if (!docSnap.exists()) {
    console.log("Dosya Bulunamadı");
    return null;
  }

  //* single Dökümandan yani tek videodan dönen tüm verileri data da tutma işlemi.
  const data = docSnap.data();

  // `createdAt`'i `Date` formatına dönüştür
  const createdAt =
    data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date();

  // chapters bir dizi mi kontrol et sonra chapters içindeki değerleri dönerek chapterları doldur videosPart olarak bir dizi oluştur.
  const videosPart = Array.isArray(data.chapters)
    ? data.chapters.map((chapter: any) => ({
        title: chapter.title as string,
        fileUrl: chapter.fileUrl as string,
      }))
    : [];

  //* Verileri döndürme işlemi
  return {
    id: docSnap.id,
    title: data.title as string,
    description: data.description as string,
    promoVideoUrl: data.promoVideoUrl as string,
    coverImageUrl: data.coverImageUrl as string,
    createdAt,
    categoryId: data.categoryId as string,
    videosPart,
    videoType: data.videoType as "Free" | "Premium",
    rate: data.rate as number,
  };
}

export async function getCommentsNumbers(videoId: string) {
  const commentRef = collection(db, "Comments");
  const commentsQuery = query(commentRef, where("videoId", "==", videoId));
  const querySnapShot = await getDocs(commentsQuery);
  return querySnapShot.size;
}
