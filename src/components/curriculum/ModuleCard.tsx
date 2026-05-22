import type { Lesson, Module } from "@/lib/types";
import { LessonCard } from "./LessonCard";
import { StatusBadge } from "../StatusBadge";

type ModuleCardProps = {
  moduleItem: Module;
  lessons: Lesson[];
};

export function ModuleCard({ moduleItem, lessons }: ModuleCardProps) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Module {moduleItem.order}</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            {moduleItem.title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            {moduleItem.summary}
          </p>
        </div>
        <StatusBadge status={moduleItem.status} />
      </div>
      <div className="mt-5 grid gap-3">
        {lessons.length > 0 ? (
          lessons.map((lesson) => <LessonCard key={lesson.slug} lesson={lesson} />)
        ) : (
          <p className="rounded-md border border-dashed border-zinc-300 p-4 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            Lessons will be added here as this module is written.
          </p>
        )}
      </div>
    </section>
  );
}
