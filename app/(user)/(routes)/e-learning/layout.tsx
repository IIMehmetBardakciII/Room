// app/special-page/layout.tsx
import CategoryBar from "@/libs/components/organism/CategoryBar";
import React from "react";

export default function SpecialPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CategoryBar />
      {children}
    </div>
  );
}
