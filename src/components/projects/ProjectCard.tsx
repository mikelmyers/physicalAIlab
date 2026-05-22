import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { StatusBadge } from "../StatusBadge";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      className="group block rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-cyan-500/50 dark:border-zinc-800 dark:bg-zinc-950"
      href={`/projects/${project.slug}`}
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">{project.title}</h2>
        <StatusBadge status={project.status} />
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.skills.slice(0, 4).map((skill) => (
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300" key={skill}>
            {skill}
          </span>
        ))}
      </div>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-300">
        View project <ArrowRight className="transition group-hover:translate-x-0.5" size={15} />
      </span>
    </Link>
  );
}
