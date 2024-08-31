"use client";
import { createContext, ReactNode, useContext, useState } from "react";

// Context için tipi tanımlayın
interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Context oluşturun ve başlangıç değerini undefined yapın
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function SidebarProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Custom hook for using sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
