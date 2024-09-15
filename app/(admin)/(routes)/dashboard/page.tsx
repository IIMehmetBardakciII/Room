"use client";
import AddChapter from "@/libs/components/organism/AddChapter";
import CategoryDropDown from "@/libs/components/organism/CategoryDropDown";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiCheckboxChecked } from "react-icons/bi";

type Chapter = {
  title: string;
  file: File | null;
};
const Dashboard = () => {
  const [category, setCategory] = useState({
    id: "",
    category: "",
  });
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);

    // Chapter verilerini JSON olarak ekleyin
    const chapterData = chapters.map((chapter, index) => ({
      title: chapter.title,
      fileKey: `chapterFile${index}`,
    }));
    formData.append("chapters", JSON.stringify(chapterData));

    // Chapter dosyalarını FormData'ya ekleyin
    chapters.forEach((chapter, index) => {
      if (chapter.file) {
        formData.append(`chapterFile${index}`, chapter.file); // Dosyaları ekleyin
      }
    });

    const response = await fetch("/api/addVideos", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      setSuccessMessage("Video başarıyla yüklendi!");
      setError(null);
      setPending(false);
      router.push("/e-learning");
    } else {
      setError(data.error);
      setPending(false);
      setSuccessMessage(null);
    }
  }

  return (
    <div className="w-full h-full mx-auto flex items-center justify-center flex-col mt-[80px]">
      <h1 className="text-paragraphGray">Video Form Admin</h1>
      <form className="flex gap-8 " onSubmit={handleSubmit}>
        {/* Video General İnfo */}
        <div className="flex flex-col gap-[18px]">
          {/* Video Title */}
          <div className="flex flex-col gap-2 w-[350px] ">
            <label
              htmlFor="videoTitle"
              className="text-[12px] w-fit text-white"
            >
              Video Title
            </label>
            <input
              type="text"
              name="videoTitle"
              className="px-3 py-[14px] w-full  rounded-[5px] placeholder:text-paragraphGray"
              placeholder="Kara Kalem Çizim dersleri vb."
            />
          </div>
          {/* Video Description */}
          <div className="flex flex-col gap-2 w-[350px] ">
            <label
              htmlFor="videoTitle"
              className="text-[12px] w-fit text-white"
            >
              Video Description
            </label>
            <textarea
              name="videoDescription"
              className="px-3 py-[14px] w-full rounded-[5px] placeholder:text-paragraphGray"
              placeholder="Bu içeriğin amacı şudur..."
            />
          </div>
          {/* Video Type & Video Category */}
          <div className="flex gap-4">
            {/* Video Type */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="videoType"
                className="text-[12px] w-fit text-white"
              >
                Video Type
              </label>
              <div className="flex gap-4">
                {/* Free Radio Button */}
                <label className="relative flex items-center justify-center w-[100px] h-[50px] rounded-[5px]  cursor-pointer  border border-defaultBlue hover:bg-hoverBlue hover:text-white ">
                  <input
                    type="radio"
                    id="Free"
                    name="videoType"
                    className="hidden peer"
                    value="Free"
                  />
                  <span className="text-[12px] w-full h-full flex items-center justify-center peer-checked:bg-hoverBlue text-defaultBlue hover:text-white peer-checked:text-white whitespace-nowrap">
                    Free
                  </span>
                  <BiCheckboxChecked className="absolute top-0 right-0 hidden peer-checked:block peer-checked:text-white " />
                </label>
                {/* Premium Radio Button */}
                <label className="relative flex items-center justify-center w-[100px] h-[50px] rounded-[5px]  cursor-pointer  border border-defaultGreen  hover:bg-hoverGreen hover:text-white ">
                  <input
                    type="radio"
                    id="Premium"
                    name="videoType"
                    className="hidden peer"
                    value="Premium"
                  />
                  <span className="text-[12px] w-full h-full flex items-center justify-center text-defaultGreen hover:text-white peer-checked:bg-hoverGreen peer-checked:text-white whitespace-nowrap">
                    Premium
                  </span>
                  <BiCheckboxChecked className="absolute top-0 right-0 hidden peer-checked:block peer-checked:text-white" />
                </label>
              </div>
            </div>
            {/* Video Category */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="videoTitle"
                className="text-[12px] w-fit text-white"
              >
                Video Category
              </label>
              <div>
                <CategoryDropDown
                  category={category}
                  setCategory={setCategory}
                />
                <input
                  type="hidden"
                  name="videoCategory"
                  value={category.id} // Ensure category ID is sent
                />
              </div>
            </div>
          </div>
          {/* Video Cover Image & Video Promo Video */}
          <div className="flex gap-2 w-[350px]">
            <div className="flex flex-col gap-2  ">
              <label
                htmlFor="videoTitle"
                className="text-[12px] w-fit text-white"
              >
                Video Cover Image
              </label>
              <input
                type="file"
                name="videoCoverImage"
                className=" w-full  rounded-[5px]  text-white"
              />
            </div>
            <div className="flex flex-col gap-2  ">
              <label
                htmlFor="promoVideo"
                className="text-[12px] w-fit text-white"
              >
                Promo Video
              </label>
              <input
                type="file"
                name="promoVideo"
                className=" w-full  rounded-[5px] text-white  "
              />
            </div>
          </div>
        </div>
        {/* Video Chapter Part */}
        <div className="flex flex-1">
          <AddChapter
            pendingState={pending}
            chapters={chapters}
            setChapters={setChapters}
          />
        </div>
      </form>
      <div className="w-fit h-full mt-4">
        {error && <div className="text-white">{error}</div>}
        {successMessage && <div className="text-white">{successMessage}</div>}
      </div>
    </div>
  );
};

export default Dashboard;
