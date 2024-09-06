import Button from "../utils/Button";

type Chapter = {
  title: string;
  file: File | null;
};

type AddChapterProps = {
  chapters: Chapter[];
  setChapters: (chapters: Chapter[]) => void;
};

const AddChapter = ({ chapters, setChapters }: AddChapterProps) => {
  const addChapter = () => {
    setChapters([...chapters, { title: "", file: null }]);
  };
  //   Title doldurulunca değiştircek fonk.
  const handleTitleChange = (index: number, value: string) => {
    const newChapters = [...chapters];
    newChapters[index].title = value;
    setChapters(newChapters);
  };
  //   File doldurulunca değiştircek fonk.
  const handleFileChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newChapters = [...chapters];
    if (event.target.files && event.target.files.length > 0) {
      newChapters[index].file = event.target.files[0];
    } else {
      newChapters[index].file = null; // Handle case where no file is selected
    }
    setChapters(newChapters);
  };
  return (
    <div className="flex flex-col gap-4 mt-8">
      <button
        onClick={addChapter}
        type="button"
        className=" px-4 py-2 bg-white text-almostBlack rounded-[5px] w-fit"
      >
        Add Chapter +
      </button>
      {chapters.map((_chapter, index) => (
        <div className="flex flex-col gap-2 w-[350px]" key={index}>
          <label
            htmlFor="chapterTitle"
            className="text-[12px] w-fit text-white"
          >
            Chapter {index + 1}
          </label>
          <input
            type="text"
            name="chapterTitle"
            className="px-3 py-[14px] w-full  rounded-[5px] placeholder:text-paragraphGray"
            placeholder={`Chapter ${index + 1} Title`}
            value={_chapter.title}
            onChange={(e) => handleTitleChange(index, e.currentTarget.value)}
          />
          <label htmlFor="chapterFile" className="text-[12px] w-fit text-white">
            Part {index + 1}
          </label>
          <input
            type="file"
            name="chapterFile"
            className=" w-full  rounded-[5px] placeholder:text-paragraphGray text-white"
            id={`chapterFile${index}`}
            onChange={(e) => handleFileChange(index, e)}
          />
        </div>
      ))}

      <Button
        type="submit"
        buttonColor="blue"
        buttonType="default"
        text={
          chapters.length <= 0 ? "Henüz Chapter Eklemedin" : "Video Oluştur"
        }
        className={"w-fit"}
        disabled={chapters.length <= 0}
      />
    </div>
  );
};

export default AddChapter;
