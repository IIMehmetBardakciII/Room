import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./global.css";

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
        {children}
      </body>
    </html>
  );
}
