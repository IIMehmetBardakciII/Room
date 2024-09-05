import Image from "next/image";

type VideosCardProps = {
  title: string;
  coverImageUrl: string;
  description: string;
  singlePage?: string;
  videoId: string;
};
const VideosCard = ({
  coverImageUrl,
  description,
  title,
  singlePage,
  videoId,
}: VideosCardProps) => {
  return (
    <a href={`/e-learning/${videoId}`}>
      <div className="w-full">
        {/* Videos Cover Image */}
        <div className="h-[190px] w-full relative">
          <Image
            src={coverImageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        {/* Videos Title */}
        <div>{title}</div>
        {/* Videos descpription */}
        <div>{description}</div>
        {/* Videos rating & comments */}
        {/* Videos Maker */}
      </div>
    </a>
  );
};

export default VideosCard;
