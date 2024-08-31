import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/organism/Navbar";
import SideBar from "@/components/organism/Sidebar";
import { SidebarProvider } from "@/context/SidebarProvider";
import WidthToggleWrapper from "@/components/organism/WidthToggleWrapper";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"], // Optional: specify the weights you need
  subsets: ["latin"], // Correct usage for subsets
});

export const metadata: Metadata = {
  title: "Room",
  description: "Improve yourself with Room",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-almostBlack`}>
        {/* SidebarProvider for toggle the sidebar from click of hamburger menu on navbar */}
        <SidebarProvider>
          <div className="w-full max-w-[1440px]     mx-auto 2xl:max-w-[1536px] relative">
            <div className="px-4">
              <Navbar />
              <div className="relative top-[104px]  ml-[230px]">
                {/* WidthToggleWrapper margin left decrease if !isOpen from sidebarContext useClient Component */}
                <WidthToggleWrapper>{children}</WidthToggleWrapper>
              </div>
            </div>
            <SideBar />
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
