"use client";

import { CheckCircle2, Lock, Sparkles } from "lucide-react";
import { getPrerequisiteExams } from "@/lib/exam/gating";
import { usePassedModules } from "@/lib/exam/usePassedModules";
import { cn } from "@/lib/utils";

type Props = {
  moduleSlug: string;
  className?: string;
};

export function ExamStatusBadge({ moduleSlug, className }: Props) {
  const { passed, loaded } = usePassedModules();
  if (!loaded) return null;

  const isPassed = passed.has(moduleSlug);
  const prereqs = getPrerequisiteExams(moduleSlug);
  const unmet = prereqs.filter((p) => !passed.has(p.moduleSlug));

  if (isPassed) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white",
          className,
        )}
      >
        <CheckCircle2 size={12} /> Module passed
      </span>
    );
  }

  if (unmet.length > 0) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-800 dark:text-amber-200",
          className,
        )}
      >
        <Lock size={12} /> Locked
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 px-2.5 py-1 text-xs font-medium text-cyan-800 dark:text-cyan-200",
        className,
      )}
    >
      <Sparkles size={12} /> Ready to take
    </span>
  );
}
