import Link from "next/link";
import { ArrowRight, CircuitBoard, Flame, GraduationCap, NotebookText, ShieldCheck, Sigma } from "lucide-react";
import { TrackCard } from "@/components/curriculum/TrackCard";
import { moduleExams } from "../../content/exams";
import { projects, tracks, getTrackLessons } from "@/lib/data";

export default function Home() {
  const featuredTracks = tracks.slice(0, 4);
  const signals = [
    { label: "Tracks", value: `${tracks.length}` },
    { label: "Module exams", value: `${moduleExams.length}` },
    { label: "Pass bar", value: "95%" },
    { label: "Daily set", value: "10 q" },
  ];

  return (
    <>
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              Self-directed technical college
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-6xl">
              Physical AI Lab
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              A serious personal learning platform for mastering math, code, engineering, mechatronics, robotics,
              drones, computer vision, telemetry, and eventually theoretical physics.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-zinc-950"
                href="/practice"
              >
                <Flame size={16} /> Daily practice
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-800 dark:text-emerald-200"
                href="/exams"
              >
                <ShieldCheck size={16} /> Module exams
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                href="/curriculum"
              >
                Curriculum <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="grid content-start gap-4">
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="grid grid-cols-2 gap-3">
                {signals.map((signal) => (
                  <div className="rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950" key={signal.label}>
                    <p className="text-2xl font-semibold text-zinc-950 dark:text-white">{signal.value}</p>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{signal.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                [Sigma, "Math-first foundations"],
                [CircuitBoard, "Bench-to-field builds"],
                [NotebookText, "Public proof-of-work"],
                [GraduationCap, "Physics-ready path"],
              ].map(([Icon, label]) => (
                <div className="flex items-center gap-3 rounded-md border border-zinc-200 p-3 dark:border-zinc-800" key={String(label)}>
                  <Icon size={18} className="text-cyan-700 dark:text-cyan-300" />
                  <span>{label as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">Start here</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              The first tracks establish the math, code, circuits, and system-thinking base.
            </p>
          </div>
          <Link className="text-sm font-medium text-cyan-700 hover:underline dark:text-cyan-300" href="/curriculum">
            All tracks
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredTracks.map((track) => (
            <TrackCard key={track.slug} track={track} lessonSlugs={getTrackLessons(track.slug).map((lesson) => lesson.slug)} />
          ))}
        </div>
      </section>
      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">First proof-of-work project</h2>
          <p className="mt-3 max-w-3xl text-zinc-700 dark:text-zinc-300">{projects[0].description}</p>
          <Link
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-700 hover:underline dark:text-cyan-300"
            href={`/projects/${projects[0].slug}`}
          >
            Open {projects[0].title} <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
