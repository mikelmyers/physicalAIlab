import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const { createRng } = await import(pathToFileURL(path.join(root, "src/lib/exam/rng.ts")));
const { generateExam, gradeExam, isResponseCorrect } = await import(
  pathToFileURL(path.join(root, "src/lib/exam/engine.ts"))
);
const { mathReentryExam } = await import(
  pathToFileURL(path.join(root, "content/exams/math-reentry-toolkit.ts"))
);
const { moduleExams } = await import(
  pathToFileURL(path.join(root, "content/exams/index.ts"))
);

function header(label) {
  console.log(`\n=== ${label} ===`);
}

header("Deterministic RNG");
const rng1 = createRng(42);
const rng2 = createRng(42);
for (let i = 0; i < 100; i++) {
  assert.equal(rng1.next(), rng2.next(), "same seed should produce same stream");
}
const intRng = createRng(123);
for (let i = 0; i < 100; i++) {
  const v = intRng.int(1, 10);
  assert.ok(v >= 1 && v <= 10, `int out of range: ${v}`);
}
console.log("rng ok");

header("Numeric grading with units and tolerance");
assert.equal(
  isResponseCorrect({ kind: "numeric", value: 0.5, unit: "h", tolerance: 0.001 }, "0.5 h"),
  true,
);
assert.equal(
  isResponseCorrect({ kind: "numeric", value: 0.5, unit: "h", tolerance: 0.001 }, "0.5 hours"),
  true,
);
assert.equal(
  isResponseCorrect({ kind: "numeric", value: 0.5, unit: "h", tolerance: 0.001 }, "30 min"),
  false,
);
assert.equal(
  isResponseCorrect({ kind: "numeric", value: 12, tolerance: 0.001 }, "12"),
  true,
);
assert.equal(
  isResponseCorrect({ kind: "numeric", value: -9, tolerance: 0 }, "-9"),
  true,
);
console.log("numeric grading ok");

header("Text + multiple-choice + multi-select grading");
assert.equal(
  isResponseCorrect({ kind: "text", acceptedAnswers: ["2/3"] }, "2/3"),
  true,
);
assert.equal(
  isResponseCorrect({ kind: "text", acceptedAnswers: ["2/3"] }, "two thirds"),
  false,
);
assert.equal(
  isResponseCorrect({ kind: "multiple-choice", choices: ["a", "b", "c"], correctIndex: 1 }, "1"),
  true,
);
assert.equal(
  isResponseCorrect({ kind: "multiple-choice", choices: ["a", "b", "c"], correctIndex: 1 }, "0"),
  false,
);
assert.equal(
  isResponseCorrect({ kind: "multi-select", choices: ["a", "b", "c"], correctIndices: [0, 2] }, [2, 0]),
  true,
);
assert.equal(
  isResponseCorrect({ kind: "multi-select", choices: ["a", "b", "c"], correctIndices: [0, 2] }, [0]),
  false,
);
console.log("text/MCQ/multi-select grading ok");

header("Exam generation: count, concept coverage, randomization");
const seed = 9001;
const exam = generateExam(mathReentryExam, seed);
assert.equal(exam.totalQuestions, mathReentryExam.totalQuestions, "should match configured total");
assert.equal(exam.questions.length, mathReentryExam.totalQuestions);

const conceptCounts = new Map();
for (const q of exam.questions) {
  conceptCounts.set(q.conceptId, (conceptCounts.get(q.conceptId) ?? 0) + 1);
}
for (const concept of mathReentryExam.concepts) {
  const count = conceptCounts.get(concept.id) ?? 0;
  assert.ok(count > 0, `concept ${concept.id} should have at least 1 question, got 0`);
}
console.log(
  "concept distribution:",
  Object.fromEntries(Array.from(conceptCounts.entries()).sort()),
);

const examA = generateExam(mathReentryExam, 100);
const examB = generateExam(mathReentryExam, 100);
const examC = generateExam(mathReentryExam, 200);
for (let i = 0; i < examA.questions.length; i++) {
  assert.equal(examA.questions[i].prompt, examB.questions[i].prompt, "same seed → same prompts");
}
const differentPrompts = examA.questions.filter(
  (q, i) => q.prompt !== examC.questions[i].prompt,
).length;
assert.ok(differentPrompts > 25, `different seeds should produce different prompts; got ${differentPrompts}`);
console.log("randomization ok");

header("Full perfect run = 100% pass");
const perfectResponses = exam.questions.map((q) => {
  switch (q.answer.kind) {
    case "numeric":
      return `${q.answer.value}${q.answer.unit ? ` ${q.answer.unit}` : ""}`;
    case "text":
      return q.answer.acceptedAnswers[0];
    case "multiple-choice":
      return `${q.answer.correctIndex}`;
    case "multi-select":
      return q.answer.correctIndices.slice();
  }
});
const perfectResult = gradeExam(mathReentryExam, exam, perfectResponses);
assert.equal(perfectResult.correctCount, exam.totalQuestions, "perfect should equal total");
assert.equal(perfectResult.scorePercent, 100);
assert.equal(perfectResult.passed, true);
console.log(`perfect run: ${perfectResult.scorePercent}% (${perfectResult.correctCount}/${perfectResult.totalQuestions})`);

header("All blanks = 0%");
const blankResponses = exam.questions.map(() => "");
const zeroResult = gradeExam(mathReentryExam, exam, blankResponses);
assert.equal(zeroResult.correctCount, 0);
assert.equal(zeroResult.passed, false);
console.log(`blank run: ${zeroResult.scorePercent}%`);

header("Stress: 20 different seeds all generate valid exams");
for (let i = 0; i < 20; i++) {
  const s = (i + 1) * 1337;
  const e = generateExam(mathReentryExam, s);
  assert.equal(e.questions.length, mathReentryExam.totalQuestions, `seed ${s} wrong length`);
  for (const q of e.questions) {
    assert.ok(q.prompt && q.prompt.length > 0, `seed ${s} empty prompt`);
    assert.ok(q.explanation && q.explanation.length > 0, `seed ${s} empty explanation`);
    assert.ok(q.answer, `seed ${s} missing answer`);
  }
  const responses = e.questions.map((q) => {
    switch (q.answer.kind) {
      case "numeric":
        return `${q.answer.value}${q.answer.unit ? ` ${q.answer.unit}` : ""}`;
      case "text":
        return q.answer.acceptedAnswers[0];
      case "multiple-choice":
        return `${q.answer.correctIndex}`;
      case "multi-select":
        return q.answer.correctIndices.slice();
    }
  });
  const r = gradeExam(mathReentryExam, e, responses);
  assert.equal(r.correctCount, e.totalQuestions, `seed ${s} did not pass perfect`);
}
console.log("20 seeds: all valid and all 100% on perfect-answer pass");

header("Concept weighting roughly matches config");
const counts = new Map();
const totalRuns = 1000;
const totalConfigWeight = Object.values(mathReentryExam.conceptWeights).reduce((s, w) => s + w, 0);
for (let i = 0; i < totalRuns; i++) {
  const e = generateExam(mathReentryExam, i + 1);
  for (const q of e.questions) {
    counts.set(q.conceptId, (counts.get(q.conceptId) ?? 0) + 1);
  }
}
const totalQuestionsAcrossRuns = totalRuns * mathReentryExam.totalQuestions;
for (const [conceptId, weight] of Object.entries(mathReentryExam.conceptWeights)) {
  const expected = (weight / totalConfigWeight) * totalQuestionsAcrossRuns;
  const actual = counts.get(conceptId) ?? 0;
  const drift = Math.abs(actual - expected) / expected;
  console.log(`  ${conceptId}: expected~${Math.round(expected)}, actual ${actual}, drift ${(drift * 100).toFixed(1)}%`);
  assert.ok(drift < 0.1, `concept ${conceptId} drift too high: ${drift}`);
}

header(`All registered exams (${moduleExams.length}): perfect-run sweep`);
for (const exam of moduleExams) {
  for (let i = 0; i < 8; i++) {
    const e = generateExam(exam, (i + 1) * 8009);
    assert.equal(e.questions.length, exam.totalQuestions, `${exam.moduleSlug} wrong length`);
    const responses = e.questions.map((q) => {
      switch (q.answer.kind) {
        case "numeric":
          return `${q.answer.value}${q.answer.unit ? ` ${q.answer.unit}` : ""}`;
        case "text":
          return q.answer.acceptedAnswers[0];
        case "multiple-choice":
          return `${q.answer.correctIndex}`;
        case "multi-select":
          return q.answer.correctIndices.slice();
      }
    });
    const r = gradeExam(exam, e, responses);
    assert.equal(
      r.correctCount,
      e.totalQuestions,
      `${exam.moduleSlug} seed ${(i + 1) * 8009} got ${r.correctCount}/${e.totalQuestions} — broken template`,
    );
  }
  console.log(`  ${exam.moduleSlug}: 8 seeds, 8 perfect runs`);
}

console.log("\nAll exam engine tests passed.");
