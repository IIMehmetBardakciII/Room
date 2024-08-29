import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";

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
      <body className={roboto.className}>
        <div className="w-full max-w-[1440px] px-4 mx-auto 2xl:max-w-[1536px]  ">
          {children}
        </div>
      </body>
    </html>
  );
}
