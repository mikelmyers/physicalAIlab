import Link from "next/link";
import { Clock, FileText } from "lucide-react";
import type { Lesson } from "@/lib/types";
import { StatusBadge } from "../StatusBadge";

type LessonCardProps = {
  lesson: Lesson;
};

export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Link
      className="flex flex-col justify-between gap-4 rounded-md border border-zinc-200 p-4 transition hover:border-cyan-500/50 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 sm:flex-row sm:items-center"
      href={`/lessons/${lesson.slug}`}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <FileText size={15} className="text-cyan-700 dark:text-cyan-300" />
          <h3 className="font-medium text-zinc-950 dark:text-white">{lesson.title}</h3>
          <StatusBadge status={lesson.status} />
        </div>
        <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{lesson.summary}</p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <Clock size={15} />
        {lesson.estimatedMinutes} min
      </span>
    </Link>
  );
}
