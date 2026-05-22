import type { ModuleExamConfig } from "../../src/lib/exam/types.ts";
import { engineeringAlgebraGeometryExam } from "./engineering-algebra-and-geometry.ts";
import { mathReentryExam } from "./math-reentry-toolkit.ts";

export const moduleExams: ModuleExamConfig[] = [mathReentryExam, engineeringAlgebraGeometryExam];

export function getModuleExam(moduleSlug: string): ModuleExamConfig | undefined {
  return moduleExams.find((exam) => exam.moduleSlug === moduleSlug);
}

export function hasModuleExam(moduleSlug: string): boolean {
  return moduleExams.some((exam) => exam.moduleSlug === moduleSlug);
}
