import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { getProject, getTrack, projects } from "@/lib/data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  return {
    title: project ? `${project.title} | Physical AI Lab` : "Project | Physical AI Lab",
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const relatedTracks = project.trackSlugs.map(getTrack).filter(Boolean);

  return (
    <>
      <PageHeader eyebrow="Project" title={project.title} description={project.description} />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div className="grid gap-6">
          {[
            ["Problem statement", ["Build a small suite of reliable technical calculators and document each formula well enough that another learner can audit the work."]],
            ["Skills practiced", project.skills],
            ["Requirements", project.requirements],
            ["Stretch goals", project.stretchGoals],
            ["Proof of completion", project.proofOfCompletion],
          ].map(([title, items]) => (
            <section className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950" key={title as string}>
              <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">{title as string}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                {(items as string[]).map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-600 dark:bg-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <StatusBadge status={project.status} />
            <h2 className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              Related tracks
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {relatedTracks.map((track) => (
                <Link
                  className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300"
                  href={`/tracks/${track!.slug}`}
                  key={track!.slug}
                >
                  {track!.title}
                </Link>
              ))}
            </div>
            <div className="mt-5 grid gap-3">
              {project.githubUrl ? (
                <a className="inline-flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-300" href={project.githubUrl}>
                  GitHub placeholder <ExternalLink size={14} />
                </a>
              ) : null}
              {project.demoUrl ? (
                <a className="inline-flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-300" href={project.demoUrl}>
                  Demo placeholder <ExternalLink size={14} />
                </a>
              ) : null}
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
