"use client";
import { useSidebar } from "@/context/SidebarProvider";
import { cn } from "@/utils/cn";

const WidthToggleWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSidebar();
  return <div className={cn(!isOpen && " -ml-[80px] ")}>{children}</div>;
};

export default WidthToggleWrapper;
