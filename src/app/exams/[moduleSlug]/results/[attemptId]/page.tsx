import { notFound } from "next/navigation";
import { ExamResults } from "@/components/exam/ExamResults";
import { getModuleExam, moduleExams } from "../../../../../../content/exams";
import { getModule } from "@/lib/data";

type ResultPageProps = {
  params: Promise<{ moduleSlug: string; attemptId: string }>;
};

export function generateStaticParams() {
  return moduleExams.map((exam) => ({ moduleSlug: exam.moduleSlug, attemptId: "placeholder" }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: ResultPageProps) {
  const { moduleSlug } = await params;
  const exam = getModuleExam(moduleSlug);
  return {
    title: exam ? `Results · ${exam.title}` : "Exam Results",
  };
}

export default async function ExamResultPage({ params }: ResultPageProps) {
  const { moduleSlug, attemptId } = await params;
  const exam = getModuleExam(moduleSlug);
  if (!exam) notFound();

  const moduleItem = getModule(moduleSlug);

  return (
    <ExamResults
      moduleSlug={moduleSlug}
      attemptId={attemptId}
      moduleTitle={moduleItem?.title ?? exam.title}
      passThreshold={exam.passThreshold}
    />
  );
}
