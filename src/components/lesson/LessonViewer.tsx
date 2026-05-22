import Link from "next/link";
import type { ReactNode } from "react";
import type { Lesson } from "@/lib/types";
import { LessonCheck } from "./LessonCheck";
import { LessonProgressToggle } from "./LessonProgressToggle";
import { StatusBadge } from "../StatusBadge";

type LessonViewerProps = {
  lesson: Lesson;
  trackTitle: string;
  moduleTitle: string;
  previousLesson?: Lesson;
  nextLesson?: Lesson;
  children: ReactNode;
};

export function LessonViewer({
  lesson,
  trackTitle,
  moduleTitle,
  previousLesson,
  nextLesson,
  children,
}: LessonViewerProps) {
  return (
    <article className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-8">
      <div className="min-w-0">
        <div className="mb-8 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <StatusBadge status={lesson.status} />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">{lesson.estimatedMinutes} minutes</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">{lesson.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">{lesson.summary}</p>
        </div>
        <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-pre:border prose-pre:border-zinc-800 prose-pre:bg-zinc-950 prose-code:text-cyan-700 dark:prose-code:text-cyan-300">
          {children}
        </div>
        {lesson.checkId ? <LessonCheck checkId={lesson.checkId} /> : null}
        <nav className="mt-10 grid gap-4 border-t border-zinc-200 pt-6 dark:border-zinc-800 sm:grid-cols-2">
          {previousLesson ? (
            <Link
              className="rounded-lg border border-zinc-200 p-4 transition hover:border-cyan-500/50 dark:border-zinc-800"
              href={`/lessons/${previousLesson.slug}`}
            >
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                Previous
              </span>
              <span className="mt-2 block font-semibold text-zinc-950 dark:text-white">{previousLesson.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              className="rounded-lg border border-zinc-200 p-4 text-right transition hover:border-cyan-500/50 dark:border-zinc-800"
              href={`/lessons/${nextLesson.slug}`}
            >
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                Next
              </span>
              <span className="mt-2 block font-semibold text-zinc-950 dark:text-white">{nextLesson.title}</span>
            </Link>
          ) : null}
        </nav>
      </div>
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Track</p>
          <p className="mt-1 font-semibold text-zinc-950 dark:text-white">{trackTitle}</p>
          <p className="mt-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">Module</p>
          <p className="mt-1 font-semibold text-zinc-950 dark:text-white">{moduleTitle}</p>
          <div className="mt-5">
            <LessonProgressToggle lessonSlug={lesson.slug} />
          </div>
          <Link
            className="mt-4 inline-flex text-sm font-medium text-cyan-700 hover:underline dark:text-cyan-300"
            href={`/tracks/${lesson.trackSlug}`}
          >
            Back to track
          </Link>
        </div>
      </aside>
    </article>
  );
}
