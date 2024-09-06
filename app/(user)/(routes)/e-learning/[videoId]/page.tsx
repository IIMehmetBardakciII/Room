import { getSingleVideo } from "@/libs/actions/Videos";
import { useState } from "react";
import { IoMdStar } from "react-icons/io";
const SingleVideoPage = async ({ params }: { params: { videoId: string } }) => {
  // For update to rate .
  const VideoData = await getSingleVideo(params.videoId);
  console.log(typeof VideoData?.rate);
  let rate = VideoData?.rate;
  if (rate != null) {
    rate += 1;
  }
  return <div>{rate}</div>;
};

export default SingleVideoPage;
