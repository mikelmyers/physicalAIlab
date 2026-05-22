import { modules } from "../../../content/tracks/modules.ts";
import { moduleExams } from "../../../content/exams/index.ts";

const examMap = new Map(moduleExams.map((exam) => [exam.moduleSlug, exam]));

export function getModuleExamConfig(moduleSlug: string) {
  return examMap.get(moduleSlug);
}

export function getPrerequisiteExams(moduleSlug: string): { moduleSlug: string; title: string }[] {
  const target = modules.find((m) => m.slug === moduleSlug);
  if (!target) return [];

  const priorInSameTrack = modules
    .filter((m) => m.trackSlug === target.trackSlug && m.order < target.order)
    .sort((a, b) => a.order - b.order);

  return priorInSameTrack
    .filter((m) => examMap.has(m.slug))
    .map((m) => ({ moduleSlug: m.slug, title: m.title }));
}

export function isModuleUnlocked(moduleSlug: string, passedSlugs: ReadonlySet<string>): boolean {
  return getPrerequisiteExams(moduleSlug).every((p) => passedSlugs.has(p.moduleSlug));
}
