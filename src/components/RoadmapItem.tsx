import type { RoadmapPhase } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

type RoadmapItemProps = {
  phase: RoadmapPhase;
};

export function RoadmapItem({ phase }: RoadmapItemProps) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">{phase.title}</h2>
        <StatusBadge status={phase.status} />
      </div>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
        {phase.items.map((item) => (
          <li className="flex gap-3" key={item}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-600 dark:bg-cyan-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
