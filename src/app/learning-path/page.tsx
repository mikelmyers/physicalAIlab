import Link from "next/link";
import { ArrowRight, CheckCircle2, GraduationCap, SearchCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { diagnosticPrompts, getTrack, masteryLevels, studyPhases } from "@/lib/data";

export default function LearningPathPage() {
  return (
    <>
      <PageHeader
        eyebrow="Learning Path"
        title="From re-entry to research-grade work."
        description="This path assumes a long gap from school and rebuilds from first principles. The standard is not passive completion; every level requires visible proof."
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-5">
          {masteryLevels.map((level) => (
            <article
              className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
              key={level.level}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-950 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">
                {level.level}
              </div>
              <h2 className="mt-4 text-lg font-semibold text-zinc-950 dark:text-white">{level.title}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{level.summary}</p>
            </article>
          ))}
        </div>

        <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <SearchCheck className="text-cyan-700 dark:text-cyan-300" size={22} />
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                  Re-entry diagnostics
                </h2>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                These are not gatekeeping tests. They identify what needs rebuilding so the curriculum can be honest,
                complete, and useful.
              </p>
            </div>
            <StatusBadge status="now" />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {diagnosticPrompts.map((prompt) => (
              <article className="rounded-md border border-zinc-200 p-4 dark:border-zinc-800" key={prompt.slug}>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
                  {prompt.area}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-zinc-950 dark:text-white">{prompt.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{prompt.prompt}</p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {prompt.checks.map((check) => (
                    <li className="flex gap-2" key={check}>
                      <CheckCircle2 className="mt-0.5 shrink-0 text-cyan-700 dark:text-cyan-300" size={15} />
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="text-cyan-700 dark:text-cyan-300" size={24} />
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">Study phases</h2>
          </div>
          {studyPhases.map((phase) => (
            <article
              className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
              key={phase.slug}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{phase.timeframe}</p>
                  <h3 className="mt-1 text-xl font-semibold text-zinc-950 dark:text-white">{phase.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                    {phase.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {phase.trackSlugs.map((slug) => {
                    const track = getTrack(slug);
                    return track ? (
                      <Link
                        className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300"
                        href={`/tracks/${track.slug}`}
                        key={track.slug}
                      >
                        {track.title}
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300 md:grid-cols-2">
                {phase.outcomes.map((outcome) => (
                  <li className="flex gap-3" key={outcome}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-600 dark:bg-cyan-300" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-6 dark:bg-cyan-400/10">
          <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">The standard</h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            The goal is not to imitate a degree checklist. The goal is to become capable of reading hard material,
            building real systems, reproducing results, publishing useful work, and asking better questions than the
            curriculum started with.
          </p>
          <Link
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-800 hover:underline dark:text-cyan-200"
            href="/curriculum"
          >
            Continue to curriculum <ArrowRight size={15} />
          </Link>
        </section>
      </section>
    </>
  );
}
