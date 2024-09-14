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

  console.log({
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY?.substring(0, 50), // Log part of it for security
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });

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
