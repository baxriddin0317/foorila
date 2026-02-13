"use client";

import React, { useEffect, useState } from "react";
import Title from "@/components/Title";
import { ResumeSidebarNav } from "@/components/resume/ResumeSidebarNav";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type ResumeNavItem = {
  kind: "experience" | "education" | "skills";
  ref: string;
  label: string;
  meta?: {
    left?: string[];
    right?: string[];
  };
};

type Props = {
  nav: ResumeNavItem[];
  children: React.ReactNode;
};

export const ResumeLayoutClient: React.FC<Props> = ({ nav, children }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isLg = window.matchMedia("(min-width: 1024px)").matches;
      setIsDesktop(isLg);
      if (isLg) {
        setIsSheetOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavItemClick = () => {
    if (!isDesktop) {
      setIsSheetOpen(true);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 w-full h-full">
      <div className="w-full h-[calc(100vh-30px)] overflow-y-auto">
        {/* title */}
        <Title title="resume" />

        {/* JSON driven resume nav */}
        <div className="flex-1">
          <ResumeSidebarNav nav={nav as any} onItemClick={handleNavItemClick} />
        </div>

        <div className="border-t border-brand-border w-full p-1">
          <p className="dark:text-brand-secondary/75 text-black/75 text-xs font-bold">
            Click{" "}
            <span className="text-brand-blue underline cursor-pointer">
              Here
            </span>{" "}
            to Download the PDF Version
          </p>
        </div>
      </div>

      {/* Desktop content (unchanged) */}
      {isDesktop && (
        <div className="flex-1 h-full overflow-y-auto border-l border-brand-border">
          {children}
        </div>
      )}

      {/* Mobile sheet content (using shadcn Sheet) */}
      {!isDesktop && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent
            side="right"
            className="border-l border-brand-border p-0 gap-0 w-full max-w-full!"
          >
            <SheetHeader className="flex flex-row items-center justify-between border-b border-brand-border px-2 py-1.5">
              <SheetTitle className="text-xs font-bold text-black dark:text-white">
                Resume
              </SheetTitle>
              <SheetClose className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={19} viewBox="0 0 20 19" fill="none">
                  <line x1="1.06071" y1="0.353478" x2="18.7384" y2="18.0311" stroke="white" />
                  <line x1="0.3536" y1="18.0312" x2="18.0313" y2="0.353543" stroke="white" />
                </svg>
              </SheetClose>
            </SheetHeader>
            <div className="h-[calc(100vh-32px)] overflow-y-auto">
              {children}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};


