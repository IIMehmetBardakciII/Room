"use client";
import { useSidebar } from "@/libs/context/SidebarProvider";
import { cn } from "@/libs/utils/cn";

const WidthToggleWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSidebar();
  return <div className={cn(!isOpen && " -ml-[80px] ")}>{children}</div>;
};

export default WidthToggleWrapper;
