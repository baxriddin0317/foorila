import resumeData from "@/data/resume.json";
import { redirect } from "next/navigation";

const Resume = () => {
  const firstRef = resumeData.nav?.[0]?.ref;

  if (!firstRef) {
    return null;
  }

  redirect(`/resume/${firstRef}`);
};

export default Resume;