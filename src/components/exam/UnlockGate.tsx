"use client";

import Link from "next/link";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import { getPrerequisiteExams } from "@/lib/exam/gating";
import { usePassedModules } from "@/lib/exam/usePassedModules";

type UnlockGateProps = {
  moduleSlug: string;
};

export function UnlockGate({ moduleSlug }: UnlockGateProps) {
  const { passed, loaded } = usePassedModules();
  const prerequisites = getPrerequisiteExams(moduleSlug);
  const unmet = prerequisites.filter((p) => !passed.has(p.moduleSlug));

  if (!loaded) {
    return (
      <div className="flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-2 rounded-md bg-zinc-200 px-5 py-3 text-sm font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500">
          Loading…
        </span>
      </div>
    );
  }

  if (unmet.length > 0) {
    return (
      <div className="rounded-md border border-amber-500/40 bg-amber-500/10 p-4">
        <div className="flex items-start gap-3">
          <Lock size={18} className="mt-0.5 shrink-0 text-amber-700 dark:text-amber-300" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
              Pass the previous module exam first
            </p>
            <p className="mt-1 text-sm text-amber-900/80 dark:text-amber-100/80">
              This module is locked until you pass:
            </p>
            <ul className="mt-3 grid gap-2">
              {unmet.map((p) => (
                <li key={p.moduleSlug}>
                  <Link
                    href={`/exams/${p.moduleSlug}`}
                    className="inline-flex items-center gap-2 rounded-md bg-amber-600 px-3 py-2 text-sm font-medium text-white"
                  >
                    Take {p.title} exam <ArrowRight size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={`/exams/${moduleSlug}/attempt`}
        className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-3 text-sm font-medium text-white"
      >
        <Sparkles size={16} /> Start new attempt
      </Link>
      <Link
        href={`/exams/${moduleSlug}/attempt?resume=1`}
        className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
      >
        Resume in-progress <ArrowRight size={16} />
      </Link>
    </div>
  );
}
