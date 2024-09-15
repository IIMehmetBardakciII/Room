import { getCookies } from "@/libs/actions/Cookies";
import { getCommentsNumbers, getSingleVideo } from "@/libs/actions/Videos";
import CommentsNumber from "@/libs/components/organism/CommentsNumber";
import SingleVideoPageClient from "@/libs/components/organism/SingleVideoPageClient";

const SingleVideoPage = async ({ params }: { params: { videoId: string } }) => {
  const { verifiedToken: token } = await getCookies();
  const userType =
    token?.userType === "Free" || token?.userType === "Premium"
      ? token.userType
      : "Free";
  const [videoData, commentsNumber] = await Promise.all([
    getSingleVideo(params.videoId),
    getCommentsNumbers(params.videoId),
  ]);

  return (
    //* ServerSide-ClientSide ilişkisini sağlayabilmek açısından server componentte verileri async çekip client componente yollama işlemi.
    <SingleVideoPageClient
      userType={userType}
      videoData={videoData}
      commentsNumber={<CommentsNumber commentsNumber={commentsNumber} />}
    />
  );
};

export default SingleVideoPage;
