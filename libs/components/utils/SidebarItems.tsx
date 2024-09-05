import { ReactNode } from "react";
import { cn } from "@/libs/utils/cn"; // veya başka bir yol
import { useSidebar } from "@/libs/context/SidebarProvider";

type SideBarItemsProps = {
  active: boolean;
  icon: ReactNode; // SVG bileşeni ReactNode olarak kabul ediliyor
  text: string;
  link?: string;
  reverse?: boolean;
};

const SideBarItems = ({
  active,
  icon,
  text,
  link,
  reverse,
}: SideBarItemsProps) => {
  const { isOpen } = useSidebar();
  return (
    <a href={link || "#"}>
      <div
        className={cn(
          "h-[40px] flex  hover:bg-sidebarNavHover hover:rounded-[5px] ",
          active && "bg-sidebarNavHover rounded-[5px]",
          !isOpen && "flex-col h-full"
        )}
      >
        <div
          className={cn(
            "px-4 flex gap-4 items-center   ",
            reverse && "flex-row-reverse",
            !isOpen && "flex-col items-start  justify-center   gap-2 h-fit "
          )}
        >
          <div
            className={cn(
              "w-[24px] h-[24px]",
              active ? "text-white" : "fill-none stroke-white",
              !isOpen && "w-[20 px] h-[20px] "
            )}
          >
            {icon} {/* SVG bileşenini doğrudan render edin */}
          </div>
          <p
            className={cn(
              "text-white whitespace-nowrap",
              !isOpen && "text-[10px]"
            )}
          >
            {text}
          </p>
        </div>
      </div>
    </a>
  );
};

export default SideBarItems;
