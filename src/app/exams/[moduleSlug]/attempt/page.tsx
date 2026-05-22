import { notFound } from "next/navigation";
import { ExamRunner } from "@/components/exam/ExamRunner";
import { getModuleExam, moduleExams } from "../../../../../content/exams";

type AttemptPageProps = {
  params: Promise<{ moduleSlug: string }>;
  searchParams: Promise<{ resume?: string }>;
};

export function generateStaticParams() {
  return moduleExams.map((exam) => ({ moduleSlug: exam.moduleSlug }));
}

export async function generateMetadata({ params }: AttemptPageProps) {
  const { moduleSlug } = await params;
  const exam = getModuleExam(moduleSlug);
  return {
    title: exam ? `Attempt · ${exam.title}` : "Module Exam Attempt",
  };
}

export default async function ExamAttemptPage({ params, searchParams }: AttemptPageProps) {
  const { moduleSlug } = await params;
  const { resume } = await searchParams;
  const exam = getModuleExam(moduleSlug);
  if (!exam) notFound();

  return <ExamRunner config={exam} resumeExisting={resume === "1"} />;
}
