import resumeData from "@/data/resume.json";
import { ResumeContent } from "@/components/resume/ResumeContent";

type ResumeSlugPageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

const ResumeSlugPage = async ({ params }: ResumeSlugPageProps) => {
  const { slug } = await params;
  const firstSlug = slug?.[0];
  const nav = resumeData.nav ?? [];
  const fallbackRef = nav[0]?.ref as string | undefined;
  const currentRef = (firstSlug as string | undefined) ?? fallbackRef;

  if (!currentRef) {
    return null;
  }

  return (
    <ResumeContent
      data={resumeData as any}
      nav={nav as any}
      initialRef={currentRef}
    />
  );
};

export default ResumeSlugPage;