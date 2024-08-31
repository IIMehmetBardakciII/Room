"use client";
import SideBarItems from "../utils/SidebarItems";
import { sidebarNavItems } from "@/content/staticData";
import { useSidebar } from "@/context/SidebarProvider";
import { cn } from "@/utils/cn";

const SideBar = () => {
  const { isOpen } = useSidebar();
  return (
    <aside
      className={cn(
        "fixed  top-[104px]  z-40  overflow-y-auto overflow-x-hidden  w-[230px] max-h-[calc(100vh-104px)] flex-col   flex gap-[10px]",
        !isOpen && " items-start w-[100px] overflow-hidden"
      )}
    >
      {/* For Navigation on sidebar */}
      {/* Main Nav */}
      {sidebarNavItems.mainNav.map((item) => (
        <SideBarItems
          key={item.text}
          active={item.active}
          text={item.text}
          icon={<item.icon />}
          link={item.link}
        />
      ))}
      {isOpen && (
        <>
          <span className="h-[1px] ml-4 w-[204px]  border border-textGray rounded-[5px]" />

          {/* YourInfo */}
          {sidebarNavItems.YourInfo.map((item) => {
            if (item.text === "Siz") {
              return (
                <SideBarItems
                  key={item.text}
                  active={item.active}
                  text={item.text}
                  icon={<item.icon />}
                  link={item.link}
                  reverse
                />
              );
            }
            return (
              <SideBarItems
                key={item.text}
                active={item.active}
                text={item.text}
                icon={<item.icon />}
                link={item.link}
              />
            );
          })}
          {/* Discover */}
          <span className="h-[1px] ml-4 w-[204px]  border border-textGray rounded-[5px]" />
          <p className="text-white px-4">Keşfet</p>
          {sidebarNavItems.Discover.map((item) => (
            <SideBarItems
              key={item.text}
              active={item.active}
              text={item.text}
              icon={<item.icon />}
              link={item.link}
            />
          ))}
          <span className="h-[1px] ml-4 w-[204px]  border border-textGray rounded-[5px]" />
          {sidebarNavItems.Footer.length}
          {/* Footer */}
          {sidebarNavItems.Footer.map((item) => (
            <SideBarItems
              key={item.text}
              active={item.active}
              text={item.text}
              icon={<item.icon />}
              link={item.link}
            />
          ))}
        </>
      )}
    </aside>
  );
};

export default SideBar;
