import type { Metadata } from "next";
import Link from "next/link";
import resumeData from "@/data/resume.json";
import { ResumeSidebarNav } from "@/components/resume/ResumeSidebarNav";
import Title from "@/components/Title";

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
    <div className="grid lg:grid-cols-2 w-full h-full">
      <div className="w-full h-screen overflow-y-auto">
        {/* title */}
        <Title title="resume" />
        {/* JSON driven resume nav */}
        <div className="flex-1">
          <ResumeSidebarNav nav={resumeData.nav as any} />
        </div>

        <div className="border-t border-brand-border w-full p-1">
          <p className="dark:text-brand-secondary/75 text-black/75 text-xs font-bold">
            Click{" "}
            <Link href={"#"} className="text-brand-blue">
              Here
            </Link>{" "}
            to Download the PDF Version
          </p>
        </div>

      </div>

      {/* content */}
      <div className="hidden lg:block flex-1 h-full overflow-y-auto border-l border-brand-border">
        {children}
      </div>
    </div>
  );
}
