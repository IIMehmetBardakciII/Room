import { getCommentsNumbers } from "@/libs/actions/Videos";
import { cn } from "@/libs/utils/cn";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import CommentsNumber from "./CommentsNumber";

type VideosCardProps = {
  title: string;
  coverImageUrl: string;
  description: string;
  videoId: string;
  videoType: string;
  videoRate: number;
};
const VideosCard = async ({
  coverImageUrl,
  description,
  title,
  videoType,
  videoId,
  videoRate,
}: VideosCardProps) => {
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
          <p
            className={cn(
              "text-white px-[10px] py-[4px]   rounded-[5px]",
              videoType === "Free" ? "bg-defaultBlue" : "bg-defaultGreen"
            )}
          >
            {videoType}
          </p>
        </div>
        {/* Videos descpription */}
        <span className="tracking-[-0.01em] text-paragraphGray mt-1">
          {description.slice(0, 100) + "..."}
        </span>
        {/* Videos rating & comments */}
        <div className="flex items-center gap-2 ">
          {[...Array(5)].map((_star, index) => (
            <div key={index}>
              <IoMdStar
                size={24}
                className={cn(index + 1 <= videoRate && "text-defaultBlue")}
              />
            </div>
          ))}
          <span className="font-thin text-paragraphGray tracking-[-0.01em]">
            (3/5)
          </span>
          <CommentsNumber videoId={videoId} />
        </div>
      </div>
    </a>
  );
};

export default VideosCard;
