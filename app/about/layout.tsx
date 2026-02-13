import type { Metadata } from "next";
import Title from "@/components/Title";
import aboutData from "@/data/about.json";

export const metadata: Metadata = {
  title: "About - Peter Meng | AI Product Management Leader",
  description:
    "Product leader with 8+ years across AI, product management, growth, e-commerce, and full-stack delivery. I translate strategy into shipped products and scalable systems.",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-start w-full h-full">
      <div className="max-w-130 xl:max-w-160 w-full h-full">
        {/* title */}
        <Title title={aboutData.headline} />
        {/* JSON driven about */}
        <div className="p-1 border-t border-brand-border">
            <p className="text-sm text-black/75 dark:text-white leading-relaxed">
                {aboutData.summary}
            </p>
        </div>
        <div className="border-t border-brand-border p-1">
            <h2 className="text-base font-bold text-black dark:text-brand-secondary mb-1">
                Highlights
            </h2>
            <div className="space-y-1">
                {aboutData.highlights.map((highlight, index) => (
                  <p 
                    key={index}
                    className="text-[13px] text-black/75 dark:text-brand-secondary/75"
                  >
                    • &nbsp;{highlight}
                  </p>
                ))}
            </div>
        </div>
      </div>

      {/* content */}
      <div className="flex-1 h-full overflow-y-auto border-l border-brand-border">
        {children}
      </div>
    </div>
  );
}
