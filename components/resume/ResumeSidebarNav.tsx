"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
};

export const ResumeSidebarNav: React.FC<Props> = ({ nav }) => {
  const pathname = usePathname();
  const currentRef =
    pathname?.split("/").filter(Boolean).slice(-1)[0] ?? nav[0]?.ref;

  return (
    <nav className="w-full text-xs">
      <ul className="divide-y divide-brand-border border-t border-brand-border">
        {nav.map((item) => {
          const isActive = currentRef === item.ref;

          return (
            <li key={item.ref}>
              <Link
                href={`/resume/${item.ref}`}
                scroll={false}
                className={`block p-1 ${
                  isActive
                    ? " text-brand-blue"
                    : "dark:text-brand-secondary text-black"
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold truncate">{item.label}</span>
                  {item.meta?.right && item.meta.right.length > 0 && (
                    <span className="flex flex-col items-end text-[10px] leading-tight text-brand-secondary">
                      {item.meta.right.map((m) => (
                        <span key={m}>{m}</span>
                      ))}
                    </span>
                  )}
                </div>
                {item.meta?.left && item.meta.left.length > 0 && (
                  <div className="mt-0.5 flex flex-wrap gap-x-2 text-[10px] leading-tight text-brand-secondary">
                    {item.meta.left.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};


