// components/organism/SingleVideoPageClient.tsx
"use client";

import { useState, useEffect } from "react";
import StaticVideoRate from "../utils/StaticVideoRate";
import { cn } from "@/libs/utils/cn";

type SingleVideoPageClientProps = {
  id: string;
  title: string;
  description: string;
  promoVideoUrl: string;
  coverImageUrl: string;
  createdAt: Date;
  categoryId: string;
  videosPart: { title: string; fileUrl: string }[];
  videoType: "Free" | "Premium";
  rate: number;
};
type SingleVideoPageClientComponentProps = {
  videoData: SingleVideoPageClientProps | null;
  commentsNumber: React.ReactNode; // Type for commentsNumber
};
const SingleVideoPageClient = ({
  videoData,
  commentsNumber,
}: SingleVideoPageClientComponentProps) => {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [videoState, setVideoState] = useState<string | null>("");
  const [stateChapterNumber, setStateChapterNumber] = useState<number>(0);
  const [descriptionState, setDescriptionState] = useState(false);
  function changeVideo(setIndex: number) {
    videoData?.videosPart.map((video, index) => {
      if (index === setIndex) {
        setVideoState(video.fileUrl);
        setStateChapterNumber(index + 1);
      }
    });
  }
  useEffect(() => {
    if (videoData) {
      setVideoState(videoData.promoVideoUrl);
      setLoadingStatus(false);
    }
  }, [videoData]);

  if (!videoData) return <div>Video getirilirken hata oluştu...</div>;
  if (loadingStatus)
    return <div className="text-white">Video Yükleniyor...</div>;

  return (
    <div className="w-full flex gap-[10px]">
      {/* Video Section */}
      <div className="w-[932px]">
        {/* Video Player */}
        <div className="relative">
          <video
            src={videoState || ""}
            controls
            controlsList="nodownload"
            className="w-full h-[400px] object-contain"
          ></video>
        </div>
        {/* Video Details */}
        <div className="flex justify-between mt-3">
          <div className="flex-[1]">
            <p className="tracking-[-0.01em] text-white font-medium">
              {videoData.title}
            </p>
            <span className="text-paragraphGray">
              {!descriptionState
                ? `${videoData.description.slice(0, 100)}...`
                : videoData.description}
            </span>
            <span
              className="text-paragraphGray flex items-end justify-end cursor-pointer hover:underline"
              onClick={() =>
                setDescriptionState((descriptionState) => !descriptionState)
              }
            >
              Açıklamayı Detaylı İncele
            </span>
            <p
              className={cn(
                "text-white px-[10px] py-[4px] w-fit   rounded-[5px]",
                videoData.videoType === "Free"
                  ? "bg-defaultBlue"
                  : "bg-defaultGreen"
              )}
            >
              {videoData.videoType}
            </p>
          </div>
          <div>
            {/* Video Rate & Video Comments */}
            <div className="flex items-center gap-2 flex-[1]">
              <StaticVideoRate videoRate={videoData.rate} />
              {commentsNumber}
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Section */}
      <div>
        <div className="flex justify-between w-[300px]">
          <span className="text-paragraphGray">
            Chapters ({stateChapterNumber}/{videoData.videosPart.length})
          </span>
          <span
            className="text-paragraphGray cursor-pointer hover:underline"
            onClick={() => {
              setVideoState(videoData.promoVideoUrl);
              setStateChapterNumber(0);
            }}
          >
            Tanıtım Videosunu İzle
          </span>
        </div>
        {/* Chapters Box */}
        {videoData.videosPart.map((chapter, index) => (
          <div
            className={cn(
              "w-fit  h-[40px] p-[10px]  rounded-[5px] cursor-pointer mt-3",
              videoState === chapter.fileUrl
                ? "bg-hoverBlue"
                : "bg-sidebarNavHover hover:bg-defaultBlue transition-all ease-in-out"
            )}
            key={index}
            onClick={() => changeVideo(index)}
          >
            <p className="text-white ">{chapter.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleVideoPageClient;
