export type Status = "available" | "draft" | "future";

export type LessonKind = "lesson" | "exercise" | "build" | "quiz" | "project";

export type Track = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  status: Status;
  level: "Foundations" | "Intermediate" | "Advanced" | "Future";
  order: number;
  color: string;
};

export type Module = {
  slug: string;
  trackSlug: string;
  title: string;
  summary: string;
  status: Status;
  order: number;
};

export type Lesson = {
  slug: string;
  trackSlug: string;
  moduleSlug: string;
  title: string;
  summary: string;
  kind: LessonKind;
  status: Status;
  order: number;
  estimatedMinutes: number;
  prerequisites?: string[];
  mdxPath: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  status: Status;
  trackSlugs: string[];
  skills: string[];
  requirements: string[];
  stretchGoals: string[];
  proofOfCompletion: string[];
  githubUrl?: string;
  demoUrl?: string;
};

export type BuildLog = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  visibility: "public" | "private";
};

export type RoadmapPhase = {
  title: string;
  status: "now" | "next" | "later";
  items: string[];
};

export type MasteryLevel = {
  level: number;
  title: string;
  summary: string;
  proof: string[];
};

export type DiagnosticPrompt = {
  slug: string;
  area: string;
  title: string;
  prompt: string;
  checks: string[];
};

export type StudyPhase = {
  slug: string;
  title: string;
  timeframe: string;
  summary: string;
  outcomes: string[];
  trackSlugs: string[];
};
