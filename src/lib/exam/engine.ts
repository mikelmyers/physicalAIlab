import { createRng, newSeed, type Rng } from "./rng.ts";
import type {
  AnswerSpec,
  ConceptBreakdown,
  ExamQuestionAttempt,
  ExamResult,
  ExamSession,
  GeneratedQuestion,
  ModuleExamConfig,
  QuestionTemplate,
} from "./types.ts";

export function generateExam(config: ModuleExamConfig, seed: number = newSeed()): ExamSession {
  const rng = createRng(seed);
  const questions = sampleQuestions(config, rng);

  return {
    id: cryptoRandomId(),
    moduleSlug: config.moduleSlug,
    seed,
    startedAt: new Date().toISOString(),
    totalQuestions: questions.length,
    passThreshold: config.passThreshold,
    questions,
    responses: questions.map(() => null),
  };
}

function sampleQuestions(config: ModuleExamConfig, rng: Rng): GeneratedQuestion[] {
  const byConcept = new Map<string, QuestionTemplate[]>();
  for (const tpl of config.templates) {
    const list = byConcept.get(tpl.conceptId) ?? [];
    list.push(tpl);
    byConcept.set(tpl.conceptId, list);
  }

  const totalWeight = Object.values(config.conceptWeights).reduce((s, w) => s + w, 0);
  const quotas = new Map<string, number>();
  let assigned = 0;

  for (const concept of config.concepts) {
    const w = config.conceptWeights[concept.id] ?? 0;
    const share = Math.floor((w / totalWeight) * config.totalQuestions);
    quotas.set(concept.id, share);
    assigned += share;
  }

  const remainingConcepts = config.concepts
    .slice()
    .sort((a, b) => (config.conceptWeights[b.id] ?? 0) - (config.conceptWeights[a.id] ?? 0));
  let i = 0;
  while (assigned < config.totalQuestions) {
    const c = remainingConcepts[i % remainingConcepts.length];
    quotas.set(c.id, (quotas.get(c.id) ?? 0) + 1);
    assigned++;
    i++;
  }

  const out: GeneratedQuestion[] = [];

  for (const concept of config.concepts) {
    const need = quotas.get(concept.id) ?? 0;
    const pool = byConcept.get(concept.id) ?? [];
    if (pool.length === 0 || need === 0) continue;

    const shuffled = rng.shuffle(pool);
    for (let k = 0; k < need; k++) {
      const tpl = shuffled[k % shuffled.length];
      const generated = tpl.generate(rng);
      out.push({
        templateId: tpl.id,
        conceptId: tpl.conceptId,
        difficulty: tpl.difficulty,
        ...generated,
      });
    }
  }

  return rng.shuffle(out);
}

export function gradeExam(
  config: ModuleExamConfig,
  session: ExamSession,
  responses: Array<string | number[] | null>,
): ExamResult {
  const perQuestion: ExamQuestionAttempt[] = session.questions.map((q, idx) => {
    const response = responses[idx] ?? null;
    return {
      index: idx,
      question: q,
      response,
      correct: response === null ? false : isResponseCorrect(q.answer, response),
    };
  });

  const correctCount = perQuestion.filter((q) => q.correct).length;
  const scorePercent = Math.round((correctCount / session.totalQuestions) * 1000) / 10;

  const conceptBreakdown = buildConceptBreakdown(config, perQuestion);

  const submittedAt = new Date().toISOString();
  const durationSeconds = Math.max(
    0,
    Math.round((Date.parse(submittedAt) - Date.parse(session.startedAt)) / 1000),
  );

  return {
    attemptId: session.id,
    moduleSlug: session.moduleSlug,
    seed: session.seed,
    totalQuestions: session.totalQuestions,
    correctCount,
    scorePercent,
    passThreshold: session.passThreshold,
    passed: scorePercent >= session.passThreshold,
    submittedAt,
    durationSeconds,
    conceptBreakdown,
    perQuestion,
  };
}

function buildConceptBreakdown(
  config: ModuleExamConfig,
  attempts: ExamQuestionAttempt[],
): ConceptBreakdown[] {
  const map = new Map<string, ConceptBreakdown>();
  for (const concept of config.concepts) {
    map.set(concept.id, {
      conceptId: concept.id,
      title: concept.title,
      total: 0,
      correct: 0,
    });
  }
  for (const a of attempts) {
    const entry = map.get(a.question.conceptId);
    if (!entry) continue;
    entry.total += 1;
    if (a.correct) entry.correct += 1;
  }
  return Array.from(map.values()).filter((b) => b.total > 0);
}

export function isResponseCorrect(answer: AnswerSpec, response: string | number[]): boolean {
  switch (answer.kind) {
    case "numeric": {
      if (typeof response !== "string" || !response.trim()) return false;
      return checkNumeric(answer.value, answer.unit, answer.tolerance ?? 0, answer.toleranceMode ?? "absolute", response);
    }
    case "text": {
      if (typeof response !== "string" || !response.trim()) return false;
      const normalized = normalizeText(response);
      return answer.acceptedAnswers.some((acc) => normalizeText(acc) === normalized);
    }
    case "multiple-choice": {
      if (typeof response !== "string" || !response.trim()) return false;
      const idx = Number(response);
      return Number.isInteger(idx) && idx === answer.correctIndex;
    }
    case "multi-select": {
      if (!Array.isArray(response) || response.length === 0) return false;
      const a = response.slice().sort((x, y) => x - y);
      const b = answer.correctIndices.slice().sort((x, y) => x - y);
      if (a.length !== b.length) return false;
      return a.every((v, i) => v === b[i]);
    }
  }
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/×/g, "x")
    .replace(/\*/g, "x")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function checkNumeric(
  expected: number,
  unit: string | undefined,
  tolerance: number,
  toleranceMode: "absolute" | "relative",
  response: string,
): boolean {
  const trimmed = response.trim().replace(/,/g, "");
  const match = trimmed.match(/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)(?:\s*([a-zA-Z/%^0-9\-°Ωμ]+))?$/i);
  if (!match) return false;

  const num = Number(match[1]);
  if (!Number.isFinite(num)) return false;

  const givenUnit = (match[2] ?? "").trim();
  if (unit) {
    if (normalizeUnit(givenUnit) !== normalizeUnit(unit)) return false;
  }

  if (toleranceMode === "relative") {
    const allowed = Math.abs(expected) * tolerance;
    return Math.abs(num - expected) <= allowed;
  }
  return Math.abs(num - expected) <= tolerance;
}

function normalizeUnit(unit: string): string {
  const u = unit.trim();
  if (!u) return "";
  const lower = u.toLowerCase();
  const aliases: Record<string, string> = {
    a: "A",
    amp: "A",
    amps: "A",
    ampere: "A",
    amperes: "A",
    v: "V",
    volt: "V",
    volts: "V",
    "ω": "ohm",
    ohm: "ohm",
    ohms: "ohm",
    h: "h",
    hr: "h",
    hrs: "h",
    hour: "h",
    hours: "h",
    s: "s",
    sec: "s",
    secs: "s",
    second: "s",
    seconds: "s",
    m: "m",
    meter: "m",
    meters: "m",
    metre: "m",
    metres: "m",
    cm: "cm",
    mm: "mm",
    km: "km",
    "m/s": "m/s",
    "meter/s": "m/s",
    "meters/s": "m/s",
    "meters/second": "m/s",
    "metres/second": "m/s",
    "m/s^2": "m/s^2",
    "m/s2": "m/s^2",
    rpm: "RPM",
    "rot/min": "RPM",
    rad: "rad",
    "°": "deg",
    deg: "deg",
    degree: "deg",
    degrees: "deg",
    w: "W",
    watt: "W",
    watts: "W",
    mw: "mW",
    j: "J",
    joule: "J",
    joules: "J",
    g: "g",
    kg: "kg",
    n: "N",
    newton: "N",
    newtons: "N",
    hz: "Hz",
    khz: "kHz",
    mhz: "MHz",
  };
  return aliases[lower] ?? u;
}

function cryptoRandomId(): string {
  if (typeof globalThis !== "undefined" && globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return `attempt-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
