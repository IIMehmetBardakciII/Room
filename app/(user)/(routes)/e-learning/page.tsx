import { getAllVideos } from "@/libs/actions/Videos";
import VideosCard from "@/libs/components/organism/VideosCard";

const E_learning = async () => {
  const videos = await getAllVideos();
  const STRIPE_MONTHLY_PLAN_LINK = process.env.STRIPE_MONTHLY_PLAN_LINK;
  const STRIPE_YEARLY_PLAN_LINK = process.env.STRIPE_YEARLY_PLAN_LINK;
  const STRIPE_MONTHLY_PRICE_ID = process.env.STRIPE_MONTHLY_PRICE_ID;
  const STRIPE_YEARLY_PRICE_ID = process.env.STRIPE_YEARLY_PRICE_ID;
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const STRIPE_WEBHOOK_KEY = process.env.STRIPE_WEBHOOK_KEY;
  return (
    <div className="grid grid-cols-1  gap-x-[60px] gap-y-[40px]  sm:grid-cols-3">
      <h1>{STRIPE_MONTHLY_PLAN_LINK}</h1>
      <h1>{STRIPE_YEARLY_PLAN_LINK}</h1>
      <h1>{STRIPE_MONTHLY_PRICE_ID}</h1>
      <h1>{STRIPE_YEARLY_PRICE_ID}</h1>
      <h1>{STRIPE_SECRET_KEY}</h1>
      <h1>{STRIPE_WEBHOOK_KEY}</h1>
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
