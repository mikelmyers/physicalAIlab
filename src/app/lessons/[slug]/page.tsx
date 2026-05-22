import { notFound } from "next/navigation";
import { LessonViewer } from "@/components/lesson/LessonViewer";
import { getLesson, getModule, getTrack, getTrackLessons, lessons } from "@/lib/data";
import { renderLessonMdx } from "@/lib/mdx";

type LessonPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLesson(slug);

  return {
    title: lesson ? `${lesson.title} | Physical AI Lab` : "Lesson | Physical AI Lab",
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLesson(slug);

  if (!lesson) {
    notFound();
  }

  const track = getTrack(lesson.trackSlug);
  const moduleItem = getModule(lesson.moduleSlug);

  if (!track || !moduleItem) {
    notFound();
  }

  const trackLessons = getTrackLessons(lesson.trackSlug);
  const lessonIndex = trackLessons.findIndex((candidate) => candidate.slug === lesson.slug);
  const previousLesson = lessonIndex > 0 ? trackLessons[lessonIndex - 1] : undefined;
  const nextLesson = lessonIndex >= 0 ? trackLessons[lessonIndex + 1] : undefined;

  if (lesson.status === "future" || lesson.status === "draft") {
    return (
      <LessonViewer
        lesson={lesson}
        moduleTitle={moduleItem.title}
        nextLesson={nextLesson}
        previousLesson={previousLesson}
        trackTitle={track.title}
      >
        <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm leading-7 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Planned lesson — not yet written
          </p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-white">
            What this lesson will cover
          </h2>
          <p className="mt-3 text-zinc-700 dark:text-zinc-300">{lesson.summary}</p>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">
            The lesson is reserved in the curriculum so the full study path is visible, but the
            deep chapter is still being written. The matching module exam may already test the
            concept — see the module page.
          </p>
        </div>
      </LessonViewer>
    );
  }

  const { content } = await renderLessonMdx(lesson.mdxPath);

  return (
    <LessonViewer
      lesson={lesson}
      moduleTitle={moduleItem.title}
      nextLesson={nextLesson}
      previousLesson={previousLesson}
      trackTitle={track.title}
    >
      {content}
    </LessonViewer>
  );
}
