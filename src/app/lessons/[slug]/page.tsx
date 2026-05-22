import { notFound } from "next/navigation";
import { LessonViewer } from "@/components/lesson/LessonViewer";
import { getLesson, getModule, getTrack, lessons } from "@/lib/data";
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

  return (
    <LessonViewer lesson={lesson} moduleTitle={moduleItem.title} trackTitle={track.title}>
      {content}
    </LessonViewer>
  );
}
