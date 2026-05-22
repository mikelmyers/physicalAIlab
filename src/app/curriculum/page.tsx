import { CurriculumCard } from "@/components/curriculum/CurriculumCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { getTrackLessons, getTrackModules, tracks } from "@/lib/data";

export default function CurriculumPage() {
  return (
    <>
      <PageHeader
        eyebrow="Curriculum"
        title="A map for becoming dangerous across physical AI systems."
        description="Tracks are organized as editable local content: foundations first, then field systems, then deeper physics and capstone work."
      />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8 xl:grid-cols-3">
        {tracks.map((track) => (
          <CurriculumCard
            key={track.slug}
            track={track}
            moduleCount={getTrackModules(track.slug).length}
            lessonCount={getTrackLessons(track.slug).length}
          />
        ))}
      </section>
    </>
  );
}
