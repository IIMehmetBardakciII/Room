'use server'
import { collection, getDocs, Timestamp } from "firebase/firestore";
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
};

export async function getAllVideos(): Promise<Video[]> {
  const collectionRef = collection(db, "Videos");
  const snapshot = await getDocs(collectionRef);
  const videos: Video[] = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title as string,
      description: data.description as string,
      promoVideoUrl: data.promoVideoUrl as string,
      coverImageUrl: data.coverImageUrl as string,
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
