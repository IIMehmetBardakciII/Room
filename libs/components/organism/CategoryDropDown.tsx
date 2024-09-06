"use client";

import { categories } from "@/libs/content/staticData";
import { cn } from "@/libs/utils/cn";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";

type CategoryDropDownProps = {
  category: { id: string; category: string };
  setCategory: (category: { id: string; category: string }) => void;
};

const CategoryDropDown = ({ category, setCategory }: CategoryDropDownProps) => {
  const [isOpenDropdown, setIsOpenDropDown] = useState(false);
  return (
    <div>
      <div
        className="flex gap-2 items-center w-[50] h-[50px] justify-center bg-white px-2 rounded-[5px] cursor-pointer"
        onClick={() => setIsOpenDropDown((prev) => !prev)}
      >
        <button
          className=" rounded-[5px] text-almostBlack font-medium"
          type="button"
        >
          {category.category || "Kategori Seçiniz"}
        </button>
        <FaArrowDown
          className={cn(
            "text-almostBlack transition-all ease-in",
            isOpenDropdown && "rotate-180"
          )}
          size={12}
        />
      </div>
      {isOpenDropdown && (
        <div className="flex flex-col mt-2 rounded-[5px] items-center gap-2 w-[50] h-full  bg-white">
          {categories.map((catego) => (
            <p
              className="text-almostBlack font-medium cursor-pointer hover:bg-almostBlack hover:text-white w-full flex h-full py-2 justify-center"
              key={catego.id}
              onClick={() => {
                setCategory({ id: catego.id, category: catego.name });
                setIsOpenDropDown(false);
              }}
            >
              {catego.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropDown;
