import { cn } from "@/libs/utils/cn";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import CommentsNumber from "./CommentsNumber";
import { getCategoryName, getCommentsNumbers } from "@/libs/actions/Videos";
import StaticVideoRate from "../utils/StaticVideoRate";

type VideosCardProps = {
  title: string;
  coverImageUrl: string;
  description: string;
  videoId: string;
  videoType: string;
  videoRate: number;
  categoryId: string;
};
const VideosCard = async ({
  coverImageUrl,
  description,
  title,
  videoType,
  videoId,
  videoRate,
  categoryId,
}: VideosCardProps) => {
  // const [rating, setRating] = useState();

  const [categoryName, commentsNumber] = await Promise.all([
    getCategoryName(categoryId),
    getCommentsNumbers(videoId),
  ]);

  return (
    <a href={`/e-learning/${videoId}`}>
      <div className="w-full flex flex-col gap-1 ">
        {/* Videos Cover Image */}
        <div className="h-[190px]  relative ">
          <Image
            src={coverImageUrl}
            alt={title}
            fill
            className="object-cover rounded-[12px] hover:rounded-none transition-all ease-in-out  "
          />
        </div>
        {/* Videos Title */}
        <div className="flex gap-3 items-center justify-between ">
          <p className="text-white tracking-[-0.01em]">{title}</p>
          <div className="flex gap-2">
            <p
              className={cn(
                "text-white px-[10px] py-[4px]  bg-sidebarNavHover rounded-[5px]"
              )}
            >
              {categoryName}
            </p>
            <p
              className={cn(
                "text-white px-[10px] py-[4px]   rounded-[5px]",
                videoType === "Free" ? "bg-defaultBlue" : "bg-defaultGreen"
              )}
            >
              {videoType}
            </p>
          </div>
        </div>
        {/* Videos descpription */}
        <span className="tracking-[-0.01em] text-paragraphGray mt-1">
          {description.slice(0, 100) + "..."}
        </span>
        {/* Videos rating & comments */}
        <div className="flex items-center gap-2 ">
          <StaticVideoRate videoRate={videoRate} />
          <CommentsNumber commentsNumber={commentsNumber} />
        </div>
      </div>
    </a>
  );
};

export default VideosCard;
