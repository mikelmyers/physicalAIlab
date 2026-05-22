import type { Rng } from "./rng.ts";

export type QuestionKind = "numeric" | "text" | "multiple-choice" | "multi-select";

export type NumericAnswer = {
  kind: "numeric";
  value: number;
  unit?: string;
  tolerance?: number;
  toleranceMode?: "absolute" | "relative";
};

export type TextAnswer = {
  kind: "text";
  acceptedAnswers: string[];
};

export type MultipleChoiceAnswer = {
  kind: "multiple-choice";
  choices: string[];
  correctIndex: number;
};

export type MultiSelectAnswer = {
  kind: "multi-select";
  choices: string[];
  correctIndices: number[];
};

export type AnswerSpec =
  | NumericAnswer
  | TextAnswer
  | MultipleChoiceAnswer
  | MultiSelectAnswer;

export type ConceptArea = {
  id: string;
  title: string;
  description: string;
};

export type GeneratedQuestion = {
  templateId: string;
  conceptId: string;
  difficulty: "core" | "applied" | "challenge";
  prompt: string;
  kind: QuestionKind;
  answer: AnswerSpec;
  explanation: string;
};

export type QuestionTemplate = {
  id: string;
  conceptId: string;
  difficulty: "core" | "applied" | "challenge";
  generate: (rng: Rng) => Omit<GeneratedQuestion, "templateId" | "conceptId" | "difficulty">;
};

export type ModuleExamConfig = {
  moduleSlug: string;
  title: string;
  description: string;
  totalQuestions: number;
  passThreshold: number;
  concepts: ConceptArea[];
  conceptWeights: Record<string, number>;
  templates: QuestionTemplate[];
};

export type ExamQuestionAttempt = {
  index: number;
  question: GeneratedQuestion;
  response: string | number[] | null;
  correct: boolean | null;
};

export type ExamSession = {
  id: string;
  moduleSlug: string;
  seed: number;
  startedAt: string;
  submittedAt?: string;
  totalQuestions: number;
  passThreshold: number;
  questions: GeneratedQuestion[];
  responses: Array<string | number[] | null>;
};

export type ConceptBreakdown = {
  conceptId: string;
  title: string;
  total: number;
  correct: number;
};

export type ExamResult = {
  attemptId: string;
  moduleSlug: string;
  seed: number;
  totalQuestions: number;
  correctCount: number;
  scorePercent: number;
  passThreshold: number;
  passed: boolean;
  submittedAt: string;
  durationSeconds: number;
  conceptBreakdown: ConceptBreakdown[];
  perQuestion: ExamQuestionAttempt[];
};
