import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Track } from "@/lib/types";
import { StatusBadge } from "../StatusBadge";

type CurriculumCardProps = {
  track: Track;
  moduleCount: number;
  lessonCount: number;
};

export function CurriculumCard({ track, moduleCount, lessonCount }: CurriculumCardProps) {
  return (
    <Link
      className="group block rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-cyan-500/50 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
      href={`/tracks/${track.slug}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Track {track.order}</p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-white">{track.title}</h2>
        </div>
        <StatusBadge status={track.status} />
      </div>
      <p className="mt-3 min-h-16 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{track.summary}</p>
      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-zinc-500 dark:text-zinc-400">
          {moduleCount} modules · {lessonCount} lessons
        </span>
        <span className="inline-flex items-center gap-2 font-medium text-cyan-700 dark:text-cyan-300">
          Open <ArrowRight className="transition group-hover:translate-x-0.5" size={15} />
        </span>
      </div>
    </Link>
  );
}
