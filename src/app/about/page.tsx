import { PageHeader } from "@/components/layout/PageHeader";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A lab notebook, curriculum map, and portfolio for one builder."
        description="Physical AI Lab is built for self-directed mastery across software and physical systems, with public artifacts as the measure of progress."
      />
      <section className="mx-auto max-w-4xl px-4 py-10 text-base leading-8 text-zinc-700 dark:text-zinc-300 sm:px-6 lg:px-8">
        <p>
          This project is intentionally not a generic LMS. It is a personal technical college: a place to study concepts,
          practice calculations, write code, build instruments, document experiments, and turn that work into evidence.
        </p>
        <p className="mt-5">
          The first version uses local files and browser storage so it stays open-source friendly and easy to run. Later
          versions can add accounts, Supabase, quiz grading, spaced repetition, simulation notebooks, AI tutoring, and
          public/private build logs without changing the basic content model.
        </p>
      </section>
    </>
  );
}
