import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ExamStatusBadge } from "@/components/exam/ExamStatusBadge";
import { getModule, getTrack, modules, tracks } from "@/lib/data";
import { moduleExams } from "../../../content/exams";

export const metadata = {
  title: "Module Exams | Physical AI Lab",
};

export default function ExamsPage() {
  const examModules = moduleExams
    .map((exam) => ({ exam, module: getModule(exam.moduleSlug) }))
    .filter((entry) => entry.module);

  const upcoming = modules
    .filter((m) => !moduleExams.some((exam) => exam.moduleSlug === m.slug))
    .sort((a, b) => {
      const ta = tracks.findIndex((t) => t.slug === a.trackSlug);
      const tb = tracks.findIndex((t) => t.slug === b.trackSlug);
      if (ta !== tb) return ta - tb;
      return a.order - b.order;
    });

  return (
    <>
      <PageHeader
        eyebrow="Module Exams"
        title="50-question concept exams. 95% to pass."
        description="Each module exam is an independent probe of concept mastery. Questions randomize each attempt so you can't memorize your way through."
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {examModules.map(({ exam, module }) => {
            const track = module ? getTrack(module.trackSlug) : undefined;
            return (
              <Link
                href={`/exams/${exam.moduleSlug}`}
                key={exam.moduleSlug}
                className="group rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-cyan-600 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-cyan-400"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                    {track?.title}
                  </p>
                  <ExamStatusBadge moduleSlug={exam.moduleSlug} />
                </div>
                <h2 className="mt-1 text-lg font-semibold text-zinc-950 dark:text-white">
                  {module?.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{module?.summary}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-1.5 text-zinc-700 dark:text-zinc-200">
                    <ShieldCheck size={14} />
                    {exam.totalQuestions} questions · {exam.passThreshold}%
                  </span>
                  <span className="inline-flex items-center gap-1 text-cyan-700 group-hover:gap-2 dark:text-cyan-300">
                    Open <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-900">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Coming next
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Question banks under construction. Each requires its own ~50 concept-mastery templates,
            independent from lesson examples.
          </p>
          <ul className="mt-3 grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
            {upcoming.slice(0, 12).map((m) => {
              const track = getTrack(m.trackSlug);
              return (
                <li key={m.slug} className="text-zinc-700 dark:text-zinc-300">
                  <span className="text-zinc-500 dark:text-zinc-400">{track?.title} · </span>
                  {m.title}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
