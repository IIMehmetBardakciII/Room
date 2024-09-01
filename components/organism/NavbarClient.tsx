"use client";

import { useSidebar } from "@/context/SidebarProvider";
import { MdDehaze } from "react-icons/md";

const NavbarClient = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <>
      <MdDehaze
        className="text-white cursor-pointer hover:bg-sidebarNavHover hover:rounded-md transition ease-in duration-100"
        size={24}
        onClick={toggleSidebar}
      />
    </>
  );
};

export default NavbarClient;
