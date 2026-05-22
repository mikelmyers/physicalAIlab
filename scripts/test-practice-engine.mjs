import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const { selectDailySet, todayDateKey } = await import(
  pathToFileURL(path.join(root, "src/lib/practice/engine.ts"))
);
const { moduleExams } = await import(
  pathToFileURL(path.join(root, "content/exams/index.ts"))
);

function header(label) {
  console.log(`\n=== ${label} ===`);
}

header("Date key format");
const key = todayDateKey(new Date("2026-05-22T14:00:00"));
assert.equal(key, "2026-05-22", "date key should be YYYY-MM-DD");
console.log(`today's key example: ${key}`);

header("Cold-start: no exam history → uniform set sized to count");
const cold = selectDailySet({
  dateKey: "2026-05-22",
  accessibleExams: moduleExams,
  results: {},
  count: 10,
});
assert.equal(cold.length, 10, `expected 10 questions, got ${cold.length}`);
for (const q of cold) {
  assert.ok(q.prompt && q.prompt.length > 0, "every question needs a prompt");
  assert.ok(q.explanation && q.explanation.length > 0, "every question needs an explanation");
  assert.ok(q.answer, "every question needs an answer spec");
  assert.ok(q.moduleSlug, "every question needs moduleSlug");
}
console.log(`cold-start picked from modules: ${Array.from(new Set(cold.map((q) => q.moduleSlug))).join(", ")}`);

header("Same date → same questions");
const a = selectDailySet({
  dateKey: "2026-05-22",
  accessibleExams: moduleExams,
  results: {},
  count: 10,
});
const b = selectDailySet({
  dateKey: "2026-05-22",
  accessibleExams: moduleExams,
  results: {},
  count: 10,
});
for (let i = 0; i < a.length; i++) {
  assert.equal(a[i].prompt, b[i].prompt, `same date should give same prompts at position ${i}`);
}
console.log("daily set is deterministic by date");

header("Different dates → different sets");
const c = selectDailySet({
  dateKey: "2026-05-23",
  accessibleExams: moduleExams,
  results: {},
  count: 10,
});
const diff = a.filter((q, i) => q.prompt !== c[i].prompt).length;
assert.ok(diff > 3, `different dates should differ in at least 4 of 10 prompts; got ${diff}`);
console.log(`day-to-day diff: ${diff}/10 prompts changed`);

header("Weighting toward weak concepts");
const weakConcept = "fractions-and-ratios";
const fakeResults = {
  "math-reentry-toolkit": [
    {
      attemptId: "fake",
      moduleSlug: "math-reentry-toolkit",
      seed: 1,
      totalQuestions: 50,
      correctCount: 30,
      scorePercent: 60,
      passThreshold: 95,
      passed: false,
      submittedAt: new Date().toISOString(),
      durationSeconds: 1200,
      conceptBreakdown: [
        { conceptId: "arithmetic-and-estimation", title: "x", total: 10, correct: 10 },
        { conceptId: "units-and-conversion", title: "x", total: 12, correct: 12 },
        { conceptId: weakConcept, title: "x", total: 10, correct: 1 },
        { conceptId: "signed-numbers-and-order-of-operations", title: "x", total: 10, correct: 10 },
        { conceptId: "engineering-estimation", title: "x", total: 4, correct: 4 },
        { conceptId: "measurement-literacy", title: "x", total: 6, correct: 6 },
      ],
      perQuestion: [],
    },
  ],
};

// Across many dates, the weak concept should appear MORE OFTEN than its uniform share.
const counts = new Map();
let total = 0;
for (let day = 0; day < 90; day++) {
  const date = `2026-06-${(day % 30 + 1).toString().padStart(2, "0")}-${day}`;
  const set = selectDailySet({
    dateKey: date,
    accessibleExams: [moduleExams[0]],
    results: fakeResults,
    count: 10,
  });
  for (const q of set) {
    counts.set(q.conceptId, (counts.get(q.conceptId) ?? 0) + 1);
    total += 1;
  }
}
const weakShare = (counts.get(weakConcept) ?? 0) / total;
// Uniform expectation would be 1/6 ≈ 0.167. We expect noticeably higher.
console.log(`weak concept share: ${(weakShare * 100).toFixed(1)}% (uniform would be ~16.7%)`);
assert.ok(weakShare > 0.2, `weak concept should appear >20% of the time, got ${weakShare}`);

header("No accessible exams → empty set");
const empty = selectDailySet({
  dateKey: "2026-05-22",
  accessibleExams: [],
  results: {},
  count: 10,
});
assert.equal(empty.length, 0);

header("Set size never exceeds total templates");
const tiny = selectDailySet({
  dateKey: "2026-05-22",
  accessibleExams: moduleExams,
  results: {},
  count: 10000,
});
const totalTemplates = moduleExams.reduce((sum, e) => sum + e.templates.length, 0);
assert.ok(tiny.length <= totalTemplates, `practice set ${tiny.length} > template pool ${totalTemplates}`);
console.log(`requested 10000, got ${tiny.length} (pool has ${totalTemplates})`);

console.log("\nAll practice engine tests passed.");
