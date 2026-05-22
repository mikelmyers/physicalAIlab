import { createRng } from "../exam/rng.ts";
import type {
  ExamResult,
  GeneratedQuestion,
  ModuleExamConfig,
  QuestionTemplate,
} from "../exam/types.ts";

const DEFAULT_DAILY_COUNT = 10;

export type PracticeQuestion = GeneratedQuestion & {
  moduleSlug: string;
};

export type DailySetInput = {
  dateKey: string;
  accessibleExams: ModuleExamConfig[];
  results: Record<string, ExamResult[]>;
  count?: number;
};

export function todayDateKey(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function seedFromDateKey(dateKey: string): number {
  let h = 2166136261;
  for (let i = 0; i < dateKey.length; i++) {
    h ^= dateKey.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0 || 1;
}

type WeightedTemplate = {
  template: QuestionTemplate;
  moduleSlug: string;
  weight: number;
};

function conceptAccuracyMap(results: ExamResult[]): Map<string, { correct: number; total: number }> {
  const m = new Map<string, { correct: number; total: number }>();
  for (const r of results) {
    for (const c of r.conceptBreakdown) {
      const entry = m.get(c.conceptId) ?? { correct: 0, total: 0 };
      entry.correct += c.correct;
      entry.total += c.total;
      m.set(c.conceptId, entry);
    }
  }
  return m;
}

function templateWeight(conceptId: string, accuracy: Map<string, { correct: number; total: number }>): number {
  const stats = accuracy.get(conceptId);
  if (!stats || stats.total === 0) return 1;
  const acc = stats.correct / stats.total;
  // Lower accuracy → higher weight. Floor at 0.2 so even mastered concepts still appear occasionally.
  return Math.max(0.2, 1.5 - acc);
}

export function selectDailySet({
  dateKey,
  accessibleExams,
  results,
  count = DEFAULT_DAILY_COUNT,
}: DailySetInput): PracticeQuestion[] {
  if (accessibleExams.length === 0) return [];

  const rng = createRng(seedFromDateKey(dateKey));

  const allResults = Object.values(results).flat();
  const accuracy = conceptAccuracyMap(allResults);

  const pool: WeightedTemplate[] = [];
  for (const exam of accessibleExams) {
    for (const template of exam.templates) {
      pool.push({
        template,
        moduleSlug: exam.moduleSlug,
        weight: templateWeight(template.conceptId, accuracy),
      });
    }
  }

  if (pool.length === 0) return [];

  const picked = new Set<string>();
  const out: PracticeQuestion[] = [];
  const targetCount = Math.min(count, pool.length);
  let safety = pool.length * 5;

  while (out.length < targetCount && safety-- > 0) {
    const chosen = rng.pickWeighted(pool, pool.map((p) => p.weight));
    const key = `${chosen.moduleSlug}::${chosen.template.id}`;
    if (picked.has(key)) continue;
    picked.add(key);

    const generated = chosen.template.generate(rng);
    out.push({
      moduleSlug: chosen.moduleSlug,
      templateId: chosen.template.id,
      conceptId: chosen.template.conceptId,
      difficulty: chosen.template.difficulty,
      ...generated,
    });
  }

  return out;
}
