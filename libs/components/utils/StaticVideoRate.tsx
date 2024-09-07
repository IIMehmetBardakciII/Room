import { cn } from "@/libs/utils/cn";
import { IoMdStar } from "react-icons/io";

type StaticVideoRateProps = {
  videoRate?: number;
};

const StaticVideoRate = ({ videoRate = 0 }: StaticVideoRateProps) => {
  return (
    <div>
      <div className="flex items-center ">
        {[...Array(5)].map((_star, index) => {
          return (
            <div key={index}>
              <IoMdStar
                size={24}
                className={cn(
                  "text-[#353413]",
                  index + 1 <= videoRate && "text-[#FFF700]"
                )}
              />
            </div>
          );
        })}
        <span className="font-thin text-paragraphGray tracking-[-0.01em]">
          (3/5)
        </span>
      </div>
    </div>
  );
};

export default StaticVideoRate;
