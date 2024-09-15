import { getAllVideos } from "@/libs/actions/Videos";
import VideosCard from "@/libs/components/organism/VideosCard";

const E_learning = async () => {
  const videos = await getAllVideos();
  const env = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  return (
    <div className="grid grid-cols-1  gap-x-[60px] gap-y-[40px]  sm:grid-cols-3">
      <h3 className="text-white">{env}</h3>
      <h3 className="text-white">{typeof env}</h3>
      {/* {videos.map((video) => (
        <VideosCard
          key={video.id}
          title={video.title}
          coverImageUrl={video.coverImageUrl}
          description={video.description}
          videoId={video.id}
          videoType={video.videoType}
          videoRate={video.rate}
          categoryId={video.categoryId}
        />
      ))} */}
    </div>
  );
};

export default E_learning;
