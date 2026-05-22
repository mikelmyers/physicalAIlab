import Link from "next/link";
import type { Track } from "@/lib/types";
import { ProgressForLessons } from "../ProgressForLessons";
import { StatusBadge } from "../StatusBadge";

type TrackCardProps = {
  track: Track;
  lessonSlugs: string[];
};

export function TrackCard({ track, lessonSlugs }: TrackCardProps) {
  return (
    <Link
      className="block rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-cyan-500/50 dark:border-zinc-800 dark:bg-zinc-950"
      href={`/tracks/${track.slug}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{track.level}</p>
          <h2 className="mt-1 text-lg font-semibold text-zinc-950 dark:text-white">{track.title}</h2>
        </div>
        <StatusBadge status={track.status} />
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{track.summary}</p>
      <div className="mt-5">
        <ProgressForLessons lessonSlugs={lessonSlugs} label="Lessons complete" />
      </div>
    </Link>
  );
}
