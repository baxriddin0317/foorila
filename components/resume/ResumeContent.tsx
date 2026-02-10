"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

type ResumeNavItem = {
  kind: "experience" | "education" | "skills";
  ref: string;
  label: string;
};

type ExperienceBlock =
  | {
      type: "bullets";
      title?: string;
      items: string[];
    };

type Experience = {
  title: string;
  location?: string;
  dateRange?: string;
  employmentType?: string;
  blocks: ExperienceBlock[];
};

type Education = {
  school: string;
  program?: string;
};

type SkillsGroup = {
  label: string;
  items: string[];
};

type Skills = {
  groups: SkillsGroup[];
};

type ResumeContentData = {
  nav: ResumeNavItem[];
  content: {
    experience: Record<string, Experience>;
    education: Record<string, Education>;
    skills: Record<string, Skills>;
  };
};

type Props = {
  data: ResumeContentData;
  nav: ResumeNavItem[];
  initialRef: string;
};

export const ResumeContent: React.FC<Props> = ({ data, nav, initialRef }) => {

  useEffect(() => {
    if (!initialRef) return;
    const el = document.getElementById(initialRef);
    if (el) {
      el.scrollIntoView({
        behavior: "instant",
        block: "start" as ScrollLogicalPosition,
      });
    }
  }, [initialRef]);

  return (
    <section className="w-full h-full overflow-y-auto text-xs dark:text-brand-secondary text-black">
        {/* left column: high level experience / education timeline */}
        {nav.map((item) => {
        if (item.kind === "experience") {
            const exp = data.content.experience[item.ref];
            if (!exp) return null;

            return (
            <article
                key={item.ref}
                id={item.ref}
                className="border-b border-brand-border p-3"
            >
                <header className="flex justify-between gap-4 mb-2">
                <div>
                    <h3 className="text-sm font-bold text-white">
                    {exp.title}
                    </h3>
                    {exp.location && (
                    <p className="text-[10px] text-brand-secondary">
                        {exp.location}
                    </p>
                    )}
                </div>
                <div className="text-[10px] text-right text-brand-secondary">
                    {exp.dateRange && <p>{exp.dateRange}</p>}
                    {exp.employmentType && <p>{exp.employmentType}</p>}
                </div>
                </header>

                {exp.blocks?.map((block, idx) =>
                block.type === "bullets" ? (
                    <div key={`${item.ref}-block-${idx}`} className="mt-2">
                    {block.title && (
                        <h4 className="text-[11px] font-bold text-white mb-1">
                        {block.title}
                        </h4>
                    )}
                    <ul className="list-disc list-inside space-y-0.5">
                        {block.items.map((it) => (
                        <li key={it}>{it}</li>
                        ))}
                    </ul>
                    </div>
                ) : null
                )}
            </article>
            );
        }

        if (item.kind === "education") {
            const edu = data.content.education[item.ref];
            if (!edu) return null;

            return (
            <article
                key={item.ref}
                id={item.ref}
                className="border-b border-brand-border p-3"
            >
                <h3 className="text-sm font-bold text-white">
                {edu.school}
                </h3>
                {edu.program && (
                <p className="mt-1 text-[11px] text-brand-secondary">
                    {edu.program}
                </p>
                )}
            </article>
            );
        }

        if (item.kind === "skills") {
            const skills = data.content.skills[item.ref];
            if (!skills) return null;

            return (
            <article
                key={item.ref}
                id={item.ref}
                className="border-b border-brand-border p-3"
            >
                <h3 className="text-sm font-bold text-white">
                {item.label}
                </h3>
                <div className="mt-2 space-y-2">
                {skills.groups.map((group) => (
                    <div key={group.label}>
                    <p className="text-[11px] font-semibold text-white">
                        {group.label}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-snug">
                        {group.items.join(" | ")}
                    </p>
                    </div>
                ))}
                </div>
            </article>
            );
        }

        return null;
        })}

        <div className="h-[calc(100vh-100px)]">

        </div>
    </section>
  );
};


