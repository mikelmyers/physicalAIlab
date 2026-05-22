import { BuildLogCard } from "@/components/build-log/BuildLogCard";
import { LocalBuildLogForm } from "@/components/build-log/LocalBuildLogForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { getBuildLogs } from "@/lib/data";

export default function BuildLogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Build Log"
        title="A technical notebook for experiments, failures, and proof."
        description="Seed entries live in the repo. MVP draft entries are stored locally in the browser until a database-backed workflow is added."
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4">
          {getBuildLogs().map((entry) => (
            <BuildLogCard entry={entry} key={entry.slug} />
          ))}
        </div>
        <LocalBuildLogForm />
      </section>
    </>
  );
}
