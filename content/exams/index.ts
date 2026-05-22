import type { ModuleExamConfig } from "../../src/lib/exam/types.ts";
import { mathReentryExam } from "./math-reentry-toolkit.ts";

export const moduleExams: ModuleExamConfig[] = [mathReentryExam];

export function getModuleExam(moduleSlug: string): ModuleExamConfig | undefined {
  return moduleExams.find((exam) => exam.moduleSlug === moduleSlug);
}

export function hasModuleExam(moduleSlug: string): boolean {
  return moduleExams.some((exam) => exam.moduleSlug === moduleSlug);
}
