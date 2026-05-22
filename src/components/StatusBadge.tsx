import type { Status } from "@/lib/types";
import { cn, formatStatus } from "@/lib/utils";

type StatusBadgeProps = {
  status: Status | "now" | "next" | "later" | "complete" | "incomplete" | "public" | "private";
};

const styles: Record<StatusBadgeProps["status"], string> = {
  available: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  draft: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  future: "border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300",
  now: "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  next: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  later: "border-zinc-500/30 bg-zinc-500/10 text-zinc-700 dark:text-zinc-300",
  complete: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  incomplete: "border-zinc-500/30 bg-zinc-500/10 text-zinc-700 dark:text-zinc-300",
  public: "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  private: "border-zinc-500/30 bg-zinc-500/10 text-zinc-700 dark:text-zinc-300",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        styles[status],
      )}
    >
      {formatStatus(status)}
    </span>
  );
}
