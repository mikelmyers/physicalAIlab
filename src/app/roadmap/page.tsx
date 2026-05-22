import { PageHeader } from "@/components/layout/PageHeader";
import { RoadmapItem } from "@/components/RoadmapItem";
import { roadmap } from "@/lib/data";

export default function RoadmapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Roadmap"
        title="Future-ready, without pretending the future is done."
        description="The MVP is deliberately local and portable. The next work is to research and write a complete zero-assumption curriculum, then add persistence, grading, AI assistance, and research tooling without replacing the curriculum core."
      />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
        {roadmap.map((phase) => (
          <RoadmapItem key={phase.title} phase={phase} />
        ))}
      </section>
    </>
  );
}
