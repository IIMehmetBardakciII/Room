import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Room Admin",
  description: "Improve yourself with Room",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full max-w-[1440px] mx-auto 2xl:max-w-[1536px] relative px-4">
        {children}
      </body>
    </html>
  );
}
