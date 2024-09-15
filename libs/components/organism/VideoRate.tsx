"use client";
import { cn } from "@/libs/utils/cn";
import { useState } from "react";
import { IoMdStar } from "react-icons/io";

type videoRatePropsType = {
  videoId: string;
};
const VideoRate = ({ videoId }: videoRatePropsType) => {
  const [rating, setRating] = useState<number | null>(null);
  const [rateColor, setRateColor] = useState<number | null>(null);
  return (
    <div className="flex items-center ">
      {[...Array(5)].map((_star, index) => {
        const currentRate = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rate"
              value={currentRate}
              onClick={() => setRating(currentRate)}
              className="hidden"
            />
            <IoMdStar
              onMouseEnter={() => setRateColor(currentRate)}
              onMouseLeave={() => setRateColor(null)}
              size={24}
              className={cn(
                // index + 1 <= videoRate && "text-defaultBlue",
                currentRate <= (rateColor ?? rating ?? 0) // Use nullish coalescing to handle null values
                  ? "text-[#FFF700] "
                  : "text-[#353413]"
              )}
            />
          </label>
        );
      })}
      <span className="font-thin text-paragraphGray tracking-[-0.01em]">
        (3/5)
      </span>
    </div>
  );
};

export default VideoRate;
