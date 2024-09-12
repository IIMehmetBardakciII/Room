import { IoMdSearch } from "react-icons/io";
import Button from "../utils/Button";
import Image from "next/image";
import NavbarClient from "./NavbarClient";

const Navbar = () => {
  // For the sidebar state Context Hook

  return (
    <header className="w-[calc(100%-32px)] fixed z-50  ">
      {/* Top Small Navigation items  */}
      <div className="w-full flex items-center justify-end text-textGray gap-3 py-2 h-fit max-sm:full   ">
        <span className="hover:underline ">
          <a href="#">Room Tanıtım Videosu</a>
        </span>
        {/* Line shape Span */}
        <span className="h-[14px] w-[0.2px] bg-textGray" />
        <span className="hover:underline">
          <a href="#">Hakkımızda</a>
        </span>
        {/* Line shape Span */}
        <span className="h-[14px] w-[0.2px] bg-textGray" />
        <span className="hover:underline">
          <a href="#">İletişim</a>
        </span>
        {/* Line shape Span */}
        <span className="h-[14px] w-[0.2px] bg-textGray" />
        <span className="hover:underline">
          <a href="#">Sıkça Sorulan Sorular</a>
        </span>
      </div>
      {/* Navbar Starter */}
      <div className="w-full flex items-center justify-between">
        {/* Logo & Dehaze(Burger Menu) */}
        <div className="flex gap-4 items-center">
          <NavbarClient />
          <a href="/">
            <h2 className="text-white max-md:text-[16px] max-sm:hidden">
              Room
            </h2>
          </a>
        </div>
        {/* SearchBar */}
        <div className="md:w-[465px] w-[265px] max-sm:w-[165px]  relative flex items-center border border-paragraphGray rounded-[5px] xl:left-32">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Ara"
            className="placeholder:px-4 md:w-[400px] w-[200px] max-sm:w-[100px] text-white  bg-almostBlack outline-none px-[10px] py-[10px]"
          />
          <div className="text-white w-[65px] max-sm:w-[65px] flex items-center bg-paragraphGray px-[10px] py-[10px] justify-center">
            <IoMdSearch size={24} />
          </div>
        </div>
        {/* Navigation Buttons & Profile pictures */}
        <div className="flex gap-5">
          <nav className="flex gap-4 max-lg:hidden">
            {/* Kayıt Ol Button */}
            <Button
              text="Kayıt Ol"
              buttonColor="blue"
              buttonType="default"
              href="/sign-up"
            />
            {/* Giriş Yap Button */}
            <Button text="Giriş Yap" buttonColor="blue" buttonType="ghost" />

            {/* Premiumlu Ol Button */}
            <Button
              text="Premiumlu Ol"
              buttonColor="green"
              buttonType="ghost"
            />
          </nav>
          <nav className=" max-lg:block hidden">
            {/* Oturum Aç küçük çözünürlükte */}
            <Button text="Oturum Aç" buttonColor="blue" buttonType="default" />
          </nav>
          {/* Giriş yapınca PP gözükür */}
          <div className="w-[47px] h-[47px] rounded-full relative bg-textGray hidden">
            <Image
              src="/ProfilFoto.png"
              alt="pp"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
