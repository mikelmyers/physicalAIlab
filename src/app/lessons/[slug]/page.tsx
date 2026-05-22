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

  const { content } = await renderLessonMdx(lesson.mdxPath);
  const trackLessons = getTrackLessons(lesson.trackSlug);
  const lessonIndex = trackLessons.findIndex((candidate) => candidate.slug === lesson.slug);
  const previousLesson = lessonIndex > 0 ? trackLessons[lessonIndex - 1] : undefined;
  const nextLesson = lessonIndex >= 0 ? trackLessons[lessonIndex + 1] : undefined;

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
