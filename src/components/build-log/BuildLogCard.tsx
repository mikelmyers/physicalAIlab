import type { BuildLog } from "@/lib/types";
import { StatusBadge } from "../StatusBadge";

type BuildLogCardProps = {
  entry: BuildLog;
};

export function BuildLogCard({ entry }: BuildLogCardProps) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <time className="text-sm text-zinc-500 dark:text-zinc-400">{entry.date}</time>
          <h2 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-white">{entry.title}</h2>
        </div>
        <StatusBadge status={entry.visibility} />
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{entry.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
