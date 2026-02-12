"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();
  const lastElementRef = useRef<HTMLElement | null>(null);
  const [lastElementHeight, setLastElementHeight] = useState<number | null>(null);
  const articleRefs = useRef<Map<string, HTMLElement>>(new Map());
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const isUserScrolling = useRef(true);
  const currentActiveRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    const currentRef = pathname?.split("/").filter(Boolean).slice(-1)[0];
    if (!currentRef) return;
  
    const articleElement = articleRefs.current.get(currentRef);
    if (!articleElement) return;
  
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
  
    isUserScrolling.current = false;
  
    const targetScrollTop = articleElement.offsetTop - 30;
  
    scrollContainer.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });
  
    const timeout = setTimeout(() => {
      isUserScrolling.current = true;
    }, 1000);
  
    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    if (lastElementRef.current) {
      const height = lastElementRef.current.offsetHeight;
      setLastElementHeight(height + 30);
    }
  }, [nav, data]);

  useEffect(() => {
    const intersectingElements = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const articleId = entry.target.id;
          
          if (entry.isIntersecting) {
            const rect = entry.target.getBoundingClientRect();
            intersectingElements.set(articleId, rect.top);
          } else {
            intersectingElements.delete(articleId);
          }
        });

        if (!isUserScrolling.current) {
          return;
        }

        if (intersectingElements.size > 0) {
          let topMostId: string | null = null;
          let minTop = Infinity;

          intersectingElements.forEach((top, id) => {
            if (top <= 50 && top < minTop) {
              minTop = top;
              topMostId = id;
            }
          });

          if (!topMostId) {
            intersectingElements.forEach((top, id) => {
              if (top < minTop) {
                minTop = top;
                topMostId = id;
              }
            });
          }

          if (topMostId && topMostId !== currentActiveRef.current) {
            currentActiveRef.current = topMostId;
            const newUrl = `/resume/${topMostId}`;
            
            if (pathname !== newUrl) {
              window.history.replaceState(null, '', newUrl);
            }
          }
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: "-30px 0px -50% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    articleRefs.current.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      intersectingElements.clear();
    };
  }, [pathname, router, nav, data]);

  const validItems = nav.filter((item) => {
    if (item.kind === "experience") {
      return !!data.content.experience[item.ref];
    }
    if (item.kind === "education") {
      return !!data.content.education[item.ref];
    }
    if (item.kind === "skills") {
      return !!data.content.skills[item.ref];
    }
    return false;
  });

  const lastValidRef = validItems.length > 0 ? validItems[validItems.length - 1].ref : null;

  const setArticleRef = (ref: string) => (element: HTMLElement | null) => {
    if (element) {
      articleRefs.current.set(ref, element);
    } else {
      articleRefs.current.delete(ref);
    }
  };

  return (
    <section 
      ref={scrollContainerRef}
      className="w-full h-full overflow-y-auto text-xs"
    >
        
        {nav.map((item) => {
          const isLastElement = item.ref === lastValidRef;
          
          if (item.kind === "experience") {
              const exp = data.content.experience[item.ref];
              if (!exp) return null;

              return (
                <article
                    key={item.ref}
                    id={item.ref}
                    ref={(el) => {
                      setArticleRef(item.ref)(el);
                      if (isLastElement && el) {
                        lastElementRef.current = el;
                      }
                    }}
                    className="border-b border-brand-border"
                >
                    <h3 className="text-lg font-bold text-black dark:text-white border-b border-brand-border px-1">
                    {exp.title}
                    </h3>

                    <div className="flex flex-col items-start p-1 border-b border-brand-border">
                      <div>
                          {exp.location && (
                          <p className="text-[13px] text-black dark:text-brand-secondary">
                              {exp.location}
                          </p>
                          )}
                      </div>
                      <div className="flex flex-col items-start text-[13px] text-right text-black/75 dark:text-brand-secondary/75">
                          {exp.dateRange && <p>[{exp.dateRange}]</p>}
                          {exp.employmentType && <p>[{exp.employmentType}]</p>}
                      </div>
                    </div>

                    {exp.blocks?.map((block, idx) =>
                      block.type === "bullets" ? (
                          <div key={`${item.ref}-block-${idx}`} className="p-1">
                            {block.title && (
                              <h4 className="text-[13px] font-bold text-black dark:text-brand-secondary mb-1">
                                {block.title}
                              </h4>
                            )}
                            <div>
                              {block.items.map((it) => (
                                <p key={it} className="text-black/75 dark:text-brand-secondary/75">{block.title === "Achievements" ? '* ' : '- '} &nbsp;{it}</p>
                              ))}
                            </div>
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
                    ref={(el) => {
                      setArticleRef(item.ref)(el);
                      if (isLastElement && el) {
                        lastElementRef.current = el;
                      }
                    }}
                    className="border-b border-brand-border"
                >
                    <h3 className="text-lg font-bold text-black dark:text-white mb-1 border-b border-brand-border px-1">
                      Education
                    </h3>
                    <div className="px-1 pb-1">
                      <h3 className="text-[13px] font-bold text-black dark:text-white">
                        {edu.school}
                      </h3>
                      {edu.program && (
                        <p className="mt-1 text-[13px] text-black/75 dark:text-brand-secondary/75">
                          [{edu.program}]
                        </p>
                      )}
                    </div>
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
                    ref={(el) => {
                      setArticleRef(item.ref)(el);
                      if (isLastElement && el) {
                        lastElementRef.current = el;
                      }
                    }}
                    className="border-b border-brand-border"
                >
                    <h3 className="text-lg font-bold text-black dark:text-white border-b border-brand-border px-1">
                    {item.label}
                    </h3>
                    <div className="mt-2 space-y-2 px-1 pb-1">
                    {skills.groups.map((group) => (
                        <div key={group.label}>
                          <p className="text-[13px] font-bold text-black dark:text-white">
                              {group.label}
                          </p>
                          <p className="space-x-0.5 text-[13px] leading-snug">
                              {group.items.map((item) => (
                                  <span key={item} className="text-brand-blue-2">[{item}]</span>
                              ))}
                          </p>
                        </div>
                    ))}
                    </div>
                </article>
              );
          }

          return null;
        })}

        <div
          style={{
            height:
              lastElementHeight !== null
                ? `calc(100vh - ${lastElementHeight}px)`
                : "calc(100vh - 100px)",
          }}
        />

    </section>
  );
};