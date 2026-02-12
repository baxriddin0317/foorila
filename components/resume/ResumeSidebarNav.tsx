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
  const currentRef = pathname?.split("/").filter(Boolean).slice(-1)[0] ?? nav[0]?.ref;
  
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
                className={`flex items-stretch h-11 justify-between px-1 py-0.5 ${
                  isActive
                    ? " bg-brand-blue text-white"
                    : "text-black dark:text-white"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState(null, '', `/resume/${item.ref}`);                  
                }}
              >
                <div className="flex flex-col items-baseline justify-between">
                  <span className="text-[13px] block leading-6 truncate">{item.label}</span>
                  {item.meta?.left && item.meta.left.length > 0 ? (
                    <div className={`flex flex-wrap gap-x-1 text-xs leading-tight dark:text-brand-secondary/75 ${!isActive ? 'text-black/75' : 'text-white'} `}>
                      {item.meta.left.map((m) => (
                        <span key={m}>[{m}]</span>
                      ))}
                    </div>
                  ) : (
                    <div className={`flex flex-wrap gap-x-1 text-xs leading-tight dark:text-brand-secondary/75 ${!isActive ? 'text-black/75' : 'text-white'} `}>
                      <span>[Expand]</span>
                    </div>
                  )}
                </div>
                {item.meta?.right && item.meta.right.length > 0 && (
                  <span className={`flex flex-col items-end justify-between text-xs leading-tight dark:text-brand-secondary/75 ${!isActive ? 'text-black/75' : 'text-white'} `}>
                    {item.meta.right.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};


