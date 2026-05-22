import { seedBuildLogs } from "../../content/build-logs/buildLogs";
import { projects } from "../../content/projects/projects";
import { diagnosticPrompts, masteryLevels, studyPhases } from "../../content/tracks/mastery";
import { lessons } from "../../content/tracks/lessons";
import { modules } from "../../content/tracks/modules";
import { tracks } from "../../content/tracks/tracks";
import type { BuildLog, Lesson, Module, Project, RoadmapPhase, Track } from "./types";

export { lessons, modules, projects, seedBuildLogs, tracks };
export { diagnosticPrompts, masteryLevels, studyPhases };

export const roadmap: RoadmapPhase[] = [
  {
    title: "MVP",
    status: "now",
    items: [
      "Static curriculum engine with tracks, modules, and MDX lessons.",
      "LocalStorage progress tracking and build-log drafts.",
      "Project and portfolio sections for public proof-of-work.",
    ],
  },
  {
    title: "Study System",
    status: "next",
    items: [
      "Quiz grading and problem-set attempts.",
      "Spaced repetition for formulas, definitions, and procedures.",
      "Richer lesson metadata for prerequisites and outcomes.",
    ],
  },
  {
    title: "Public Lab",
    status: "next",
    items: [
      "Public/private build logs backed by Supabase.",
      "GitHub integration for project evidence.",
      "Certificate-style progress summaries and portfolio exports.",
    ],
  },
  {
    title: "Advanced Research",
    status: "later",
    items: [
      "Simulation notebooks and LaTeX-heavy theoretical physics lessons.",
      "AI tutor and review assistant after the core curriculum is stable.",
      "Research problem archive with reproducible computations.",
    ],
  },
];

export function getTrack(slug: string): Track | undefined {
  return tracks.find((track) => track.slug === slug);
}

export function getModule(slug: string): Module | undefined {
  return modules.find((moduleItem) => moduleItem.slug === slug);
}

export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getTrackModules(trackSlug: string): Module[] {
  return modules
    .filter((moduleItem) => moduleItem.trackSlug === trackSlug)
    .sort((a, b) => a.order - b.order);
}

export function getModuleLessons(moduleSlug: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.moduleSlug === moduleSlug)
    .sort((a, b) => a.order - b.order);
}

export function getTrackLessons(trackSlug: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.trackSlug === trackSlug)
    .sort((a, b) => a.order - b.order);
}

export function getPortfolioProjects(): Project[] {
  return projects.filter((project) => project.status === "available");
}

export function getBuildLogs(): BuildLog[] {
  return seedBuildLogs.sort((a, b) => b.date.localeCompare(a.date));
}
