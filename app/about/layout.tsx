import type { Metadata } from "next";
import aboutData from "@/data/about.json";
import { AboutLayoutClient } from "@/components/about/AboutLayoutClient";

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
    <AboutLayoutClient data={aboutData as any}>
      {children}
    </AboutLayoutClient>
  );
}
