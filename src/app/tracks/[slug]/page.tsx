import { notFound } from "next/navigation";
import { ModuleCard } from "@/components/curriculum/ModuleCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProgressForLessons } from "@/components/ProgressForLessons";
import { getModuleLessons, getTrack, getTrackLessons, getTrackModules, tracks } from "@/lib/data";

type TrackPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tracks.map((track) => ({ slug: track.slug }));
}

export async function generateMetadata({ params }: TrackPageProps) {
  const { slug } = await params;
  const track = getTrack(slug);

  return {
    title: track ? `${track.title} | Physical AI Lab` : "Track | Physical AI Lab",
  };
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { slug } = await params;
  const track = getTrack(slug);

  if (!track) {
    notFound();
  }

  const trackModules = getTrackModules(track.slug);
  const trackLessons = getTrackLessons(track.slug);

  return (
    <>
      <PageHeader eyebrow={track.level} title={track.title} description={track.description} />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <ProgressForLessons lessonSlugs={trackLessons.map((lesson) => lesson.slug)} label="Track progress" />
        </div>
        <div className="grid gap-6">
          {trackModules.map((moduleItem) => (
            <ModuleCard
              key={moduleItem.slug}
              moduleItem={moduleItem}
              lessons={getModuleLessons(moduleItem.slug)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
