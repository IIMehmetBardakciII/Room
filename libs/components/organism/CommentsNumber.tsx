import { getCommentsNumbers } from "@/libs/actions/Videos";

type commentNumberprops = {
  commentsNumber: number;
};
const CommentsNumber = ({ commentsNumber }: commentNumberprops) => {
  return (
    <div className="text-paragraphGray font-normal tracking-[-0.01em] text-xs hover:underline cursor-pointer">
      {commentsNumber} değerlendirme
    </div>
  );
};

export default CommentsNumber;
