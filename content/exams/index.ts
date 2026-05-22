import type { ModuleExamConfig } from "../../src/lib/exam/types.ts";
import { circuitLawsExam } from "./circuit-laws.ts";
import { engineeringAlgebraGeometryExam } from "./engineering-algebra-and-geometry.ts";
import { geometryTrigVectorsExam } from "./geometry-trig-and-vectors.ts";
import { mathReentryExam } from "./math-reentry-toolkit.ts";
import { technicalPythonExam } from "./technical-python.ts";

export const moduleExams: ModuleExamConfig[] = [
  mathReentryExam,
  engineeringAlgebraGeometryExam,
  geometryTrigVectorsExam,
  technicalPythonExam,
  circuitLawsExam,
];

export function getModuleExam(moduleSlug: string): ModuleExamConfig | undefined {
  return moduleExams.find((exam) => exam.moduleSlug === moduleSlug);
}

export function hasModuleExam(moduleSlug: string): boolean {
  return moduleExams.some((exam) => exam.moduleSlug === moduleSlug);
}
