import { getAllVideos } from "@/libs/actions/Videos";
import VideosCard from "@/libs/components/organism/VideosCard";

const E_learning = async () => {
  const videos = await getAllVideos();

  return (
    <div className="grid grid-cols-1  gap-x-[60px] gap-y-[40px]  sm:grid-cols-3">
      {videos.map((video) => (
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
      ))}
    </div>
  );
};

export default E_learning;
