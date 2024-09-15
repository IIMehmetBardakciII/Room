export type ChapterType = {
  title: string;
  fileUrl: string;
};

export type VideoType = {
  id: string;
  title: string;
  description: string;
  promoVideoUrl: string;
  coverImageUrl: string;
  createdAt: Date;
  categoryId: string; // categoryId eklenmiştir
  videosPart: ChapterType[];
  videoType: "Free" | "Premium"; // videoType eklenmiştir
  rate: number;
};
