import type { Metadata } from "next";
import resumeData from "@/data/resume.json";
import { ResumeLayoutClient } from "@/components/resume/ResumeLayoutClient";

export const metadata: Metadata = {
  title: "Peter Meng - Product Management Leader | AI, Platform, Growth, E-commerce",
  description:
    "Product leader with 8+ years across AI, platform, growth, e-commerce, and full-stack delivery. I translate strategy into shipped products and scalable systems.",
};

export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ResumeLayoutClient nav={resumeData.nav as any}>
      {children}
    </ResumeLayoutClient>
  );
}
