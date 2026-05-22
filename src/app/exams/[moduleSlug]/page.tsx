import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ListChecks, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ExamHistory } from "@/components/exam/ExamHistory";
import { UnlockGate } from "@/components/exam/UnlockGate";
import { getModuleExam, moduleExams } from "../../../../content/exams";
import { getModule, getModuleLessons, getTrack } from "@/lib/data";

type ExamPageProps = {
  params: Promise<{ moduleSlug: string }>;
};

export function generateStaticParams() {
  return moduleExams.map((exam) => ({ moduleSlug: exam.moduleSlug }));
}

export async function generateMetadata({ params }: ExamPageProps) {
  const { moduleSlug } = await params;
  const exam = getModuleExam(moduleSlug);
  return {
    title: exam ? `${exam.title} | Physical AI Lab` : "Module Exam | Physical AI Lab",
  };
}

export default async function ExamLandingPage({ params }: ExamPageProps) {
  const { moduleSlug } = await params;
  const exam = getModuleExam(moduleSlug);
  if (!exam) notFound();

  const moduleItem = getModule(moduleSlug);
  const track = moduleItem ? getTrack(moduleItem.trackSlug) : undefined;
  const lessons = getModuleLessons(moduleSlug);

  return (
    <>
      <PageHeader
        eyebrow={track ? `${track.title} · ${moduleItem?.title ?? ""}` : "Module Exam"}
        title={exam.title}
        description={exam.description}
      />
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <Spec
            icon={<ListChecks size={18} className="text-cyan-700 dark:text-cyan-300" />}
            label="Questions"
            value={`${exam.totalQuestions}`}
          />
          <Spec
            icon={<ShieldCheck size={18} className="text-cyan-700 dark:text-cyan-300" />}
            label="Pass threshold"
            value={`${exam.passThreshold}%`}
          />
          <Spec
            icon={<Clock size={18} className="text-cyan-700 dark:text-cyan-300" />}
            label="Style"
            value="Randomized · numbers vary"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <article className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">What this exam tests</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              These questions probe whether you understand the concepts, not whether you memorized
              the lesson examples. Numbers and ordering randomize each attempt.
            </p>
            <ul className="mt-4 grid gap-2 text-sm">
              {exam.concepts.map((c) => (
                <li
                  key={c.id}
                  className="rounded-md border border-zinc-200 p-3 dark:border-zinc-800"
                >
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">{c.title}</p>
                  <p className="mt-1 text-zinc-600 dark:text-zinc-400">{c.description}</p>
                </li>
              ))}
            </ul>

            {lessons.length > 0 ? (
              <>
                <h3 className="mt-6 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Lessons in this module
                </h3>
                <ul className="mt-2 grid gap-1.5 text-sm">
                  {lessons.map((lesson) => (
                    <li key={lesson.slug}>
                      <Link
                        className="text-cyan-700 hover:underline dark:text-cyan-300"
                        href={`/lessons/${lesson.slug}`}
                      >
                        {lesson.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <div className="mt-8">
              <UnlockGate moduleSlug={exam.moduleSlug} />
            </div>
          </article>

          <aside className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">Your attempts</h2>
            <div className="mt-4">
              <ExamHistory moduleSlug={exam.moduleSlug} passThreshold={exam.passThreshold} />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
      </div>
      <p className="mt-2 text-lg font-semibold text-zinc-950 dark:text-white">{value}</p>
    </div>
  );
}
