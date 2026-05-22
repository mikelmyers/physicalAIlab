"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadResults } from "@/lib/exam/storage";
import type { ExamResult } from "@/lib/exam/types";
import { cn } from "@/lib/utils";

type Props = {
  moduleSlug: string;
  passThreshold: number;
};

export function ExamHistory({ moduleSlug, passThreshold }: Props) {
  const [results, setResults] = useState<ExamResult[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setResults(loadResults(moduleSlug).slice().reverse());
      setLoaded(true);
    });
  }, [moduleSlug]);

  if (!loaded) {
    return null;
  }

  if (results.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        No attempts yet. Your first run will appear here.
      </p>
    );
  }

  const best = results.reduce((b, r) => (r.scorePercent > b.scorePercent ? r : b));

  return (
    <div className="grid gap-3">
      <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Best score
        </p>
        <p
          className={cn(
            "mt-1 text-2xl font-semibold",
            best.scorePercent >= passThreshold
              ? "text-emerald-600 dark:text-emerald-300"
              : "text-zinc-900 dark:text-zinc-100",
          )}
        >
          {best.scorePercent}%
        </p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          {best.correctCount}/{best.totalQuestions} on{" "}
          {new Date(best.submittedAt).toLocaleString()}
        </p>
      </div>

      <ul className="divide-y divide-zinc-200 rounded-md border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
        {results.map((r) => (
          <li key={r.attemptId} className="px-4 py-3">
            <Link
              href={`/exams/${moduleSlug}/results/${r.attemptId}`}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="text-zinc-700 dark:text-zinc-200">
                {new Date(r.submittedAt).toLocaleString()}
              </span>
              <span
                className={cn(
                  "font-medium",
                  r.scorePercent >= passThreshold
                    ? "text-emerald-600 dark:text-emerald-300"
                    : "text-zinc-900 dark:text-zinc-100",
                )}
              >
                {r.scorePercent}% · {r.correctCount}/{r.totalQuestions}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
