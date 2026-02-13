"use client";

import React, { useEffect, useState } from "react";
import Title from "@/components/Title";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";

type ContactMethod = {
  type: "email" | "linkedin" | "github" | string;
  label: string;
  value: string;
};

type ContactData = {
  headline: string;
  subheadline: string;
  methods: ContactMethod[];
};

type Props = {
  data: ContactData;
  children: React.ReactNode;
};

export const ContactLayoutClient: React.FC<Props> = ({ data, children }) => {
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

  return (
    <div className="grid lg:grid-cols-2 w-full h-full">
      <div className="w-full h-[calc(100vh-30px)] overflow-y-auto">
        {/* title */}
        <Title title={data.headline} />

        {/* subheadline */}
        <div className="p-1 border-t border-brand-border">
          <p className="text-sm text-black/75 dark:text-white leading-relaxed">
            {data.subheadline}
          </p>
        </div>

        {/* contact methods */}
        <div className="border-t border-brand-border p-1">
          <h2 className="text-base font-bold text-black dark:text-brand-secondary mb-1">
            Contact Methods
          </h2>
          <div className="space-y-1">
            {data.methods.map((method, index) => (
              <div
                key={index}
                className="text-[13px] text-black/75 dark:text-brand-secondary/75"
              >
                <div className="font-semibold">{method.label}</div>
                {method.type === "email" ? (
                  <Link
                    href={`mailto:${method.value}`}
                    className="text-brand-blue underline break-all"
                  >
                    {method.value}
                  </Link>
                ) : (
                  <Link
                    href={method.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue underline break-all"
                  >
                    {method.value}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* mobile: button to open sheet */}
        {!isDesktop && (
          <div className="border-t border-brand-border p-1">
            <button
              type="button"
              className="text-xs font-bold text-brand-blue underline cursor-pointer"
              onClick={() => setIsSheetOpen(true)}
            >
              Open Contact Panel
            </button>
          </div>
        )}
      </div>

      {/* Desktop content */}
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
                Contact
              </SheetTitle>
              <SheetClose className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={19} viewBox="0 0 20 19" fill="none">
                  <line x1="1.06071" y1="0.353478" x2="18.7384" y2="18.0311" stroke="white" />
                  <line x1="0.3536" y1="18.0312" x2="18.0313" y2="0.353543" stroke="white" />
                </svg>
              </SheetClose>
            </SheetHeader>
            <div className="h-[calc(100vh-32px)] overflow-y-auto">{children}</div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};


