import { getAllVideos } from "@/libs/actions/Videos";
import VideosCard from "@/libs/components/organism/VideosCard";

const E_learning = async () => {
  const videos = await getAllVideos();
  return (
    <div className="grid grid-cols-1 gap-6  sm:grid-cols-3">
      {videos.map((video) => (
        <VideosCard
          key={video.id}
          singlePage={video.id}
          title={video.title}
          coverImageUrl={video.coverImageUrl}
          description={video.description}
          videoId={video.id}
        />
      ))}
    </div>
  );
};

export default E_learning;
