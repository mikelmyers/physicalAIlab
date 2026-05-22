import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const { checkAnswer } = await import(pathToFileURL(path.join(root, "src/lib/checkAnswer.ts")));
const { getLessonCheck } = await import(pathToFileURL(path.join(root, "src/lib/lessonChecks.ts")));

const check = getLessonCheck("arithmetic-units-core-check");
assert.ok(check, "Expected arithmetic-units-core-check to exist");

const byId = Object.fromEntries(check.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(byId["quantity-parts"], "a number and a unit").correct, true);
assert.equal(checkAnswer(byId["quantity-parts"], "banana").correct, false);

assert.equal(checkAnswer(byId["minutes-to-hours"], "0.5 h").correct, true);
assert.equal(checkAnswer(byId["minutes-to-hours"], "0.5 hours").correct, true);
assert.equal(checkAnswer(byId["minutes-to-hours"], "30 minutes").correct, false);

assert.equal(checkAnswer(byId["speed-time-distance"], "12 meters").correct, true);
assert.equal(checkAnswer(byId["speed-time-distance"], "12 s").correct, false);

assert.equal(checkAnswer(byId["ma-to-a"], "0.075 A").correct, true);
assert.equal(checkAnswer(byId["ma-to-a"], "0.075 amps").correct, true);
assert.equal(checkAnswer(byId["ma-to-a"], "75 mA").correct, false);

assert.equal(checkAnswer(byId["scientific-notation"], "6.8 x 10^-3").correct, true);
assert.equal(checkAnswer(byId["scientific-notation"], "6.8x10^-3").correct, true);
assert.equal(checkAnswer(byId["scientific-notation"], "6.8e-3").correct, true);
assert.equal(checkAnswer(byId["scientific-notation"], "0.0068").correct, false);

const ratioCheck = getLessonCheck("fractions-ratios-core-check");
assert.ok(ratioCheck, "Expected fractions-ratios-core-check to exist");

const ratioById = Object.fromEntries(ratioCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(ratioById["simplify-fraction"], "2/3").correct, true);
assert.equal(checkAnswer(ratioById["unit-rate"], "5 m/s").correct, true);
assert.equal(checkAnswer(ratioById["unit-rate"], "5 meters/second").correct, true);
assert.equal(checkAnswer(ratioById["unit-rate"], "5 m").correct, false);
assert.equal(checkAnswer(ratioById["map-scale"], "30 meters").correct, true);
assert.equal(checkAnswer(ratioById["gear-ratio"], "300 rpm").correct, true);
assert.equal(checkAnswer(ratioById["gear-ratio"], "1800 rpm").correct, false);
assert.equal(checkAnswer(ratioById["part-whole"], "1/4").correct, true);
assert.equal(checkAnswer(ratioById["part-whole"], "1:3").correct, false);

const signedCheck = getLessonCheck("signed-numbers-core-check");
assert.ok(signedCheck, "Expected signed-numbers-core-check to exist");

const signedById = Object.fromEntries(signedCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(signedById["opposite"], "8").correct, true);
assert.equal(checkAnswer(signedById["absolute-value"], "12").correct, true);
assert.equal(checkAnswer(signedById["subtract-negative"], "9").correct, true);
assert.equal(checkAnswer(signedById["negative-square-no-parentheses"], "-9").correct, true);
assert.equal(checkAnswer(signedById["negative-square-no-parentheses"], "9").correct, false);
assert.equal(checkAnswer(signedById["distance-vs-displacement"], "displacement").correct, true);
assert.equal(checkAnswer(signedById["distance-vs-displacement"], "distance").correct, false);

console.log("Lesson check regression tests passed.");
