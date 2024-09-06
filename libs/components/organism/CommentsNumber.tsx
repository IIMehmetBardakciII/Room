import { getCommentsNumbers } from "@/libs/actions/Videos";

type commentNumberprops = {
  videoId: string;
};
const CommentsNumber = async ({ videoId }: commentNumberprops) => {
  const commentNumber = await getCommentsNumbers(videoId);
  return (
    <div className="text-paragraphGray font-normal tracking-[-0.01em] text-xs hover:underline">
      {commentNumber} değerlendirme
    </div>
  );
};

export default CommentsNumber;
