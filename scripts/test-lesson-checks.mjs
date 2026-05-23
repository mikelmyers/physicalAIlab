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

const geometryCheck = getLessonCheck("points-lines-planes-angles-check");
assert.ok(geometryCheck, "Expected points-lines-planes-angles-check to exist");

const geometryById = Object.fromEntries(geometryCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(geometryById["angle-vertex"], "B").correct, true);
assert.equal(checkAnswer(geometryById["segment-vs-ray"], "segment").correct, true);
assert.equal(checkAnswer(geometryById["complement-basic"], "53 degrees").correct, true);
assert.equal(checkAnswer(geometryById["supplement-basic"], "52 deg").correct, true);
assert.equal(checkAnswer(geometryById["degrees-to-radians"], "pi/4").correct, true);
assert.equal(checkAnswer(geometryById["vertical-angles"], "64 degrees").correct, true);
assert.equal(checkAnswer(geometryById["skew-lines"], "skew lines").correct, true);
assert.equal(checkAnswer(geometryById["skew-lines"], "parallel").correct, false);

const triangleCheck = getLessonCheck("triangle-congruence-and-similarity-check");
assert.ok(triangleCheck, "Expected triangle-congruence-and-similarity-check to exist");

const triangleById = Object.fromEntries(triangleCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(triangleById["angle-sum"], "67 degrees").correct, true);
assert.equal(checkAnswer(triangleById["sss-name"], "SSS").correct, true);
assert.equal(checkAnswer(triangleById["ssa-invalid"], "no").correct, true);
assert.equal(checkAnswer(triangleById["aaa-meaning"], "similarity").correct, true);
assert.equal(checkAnswer(triangleById["scale-factor"], "3").correct, true);
assert.equal(checkAnswer(triangleById["corresponding-side"], "EF").correct, true);
assert.equal(checkAnswer(triangleById["shadow-height"], "12 m").correct, true);
assert.equal(checkAnswer(triangleById["aaa-meaning"], "congruence").correct, false);

const pythagoreanCheck = getLessonCheck("pythagorean-theorem-and-applications-check");
assert.ok(pythagoreanCheck, "Expected pythagorean-theorem-and-applications-check to exist");

const pythagoreanById = Object.fromEntries(pythagoreanCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(pythagoreanById["hypotenuse-6-8"], "10 cm").correct, true);
assert.equal(checkAnswer(pythagoreanById["missing-leg-13-5"], "12 meters").correct, true);
assert.equal(checkAnswer(pythagoreanById["converse-check"], "yes").correct, true);
assert.equal(checkAnswer(pythagoreanById["coordinate-distance"], "10").correct, true);
assert.equal(checkAnswer(pythagoreanById["robot-displacement"], "5 m").correct, true);
assert.equal(checkAnswer(pythagoreanById["path-vs-displacement"], "7 meters").correct, true);
assert.equal(checkAnswer(pythagoreanById["obtuse-classification"], "obtuse").correct, true);
assert.equal(checkAnswer(pythagoreanById["path-vs-displacement"], "5 m").correct, false);

const perimeterAreaCheck = getLessonCheck("perimeter-area-of-plane-figures-check");
assert.ok(perimeterAreaCheck, "Expected perimeter-area-of-plane-figures-check to exist");

const perimeterAreaById = Object.fromEntries(perimeterAreaCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(perimeterAreaById["rectangle-area"], "24 cm^2").correct, true);
assert.equal(checkAnswer(perimeterAreaById["rectangle-area"], "24 cm2").correct, true);
assert.equal(checkAnswer(perimeterAreaById["rectangle-perimeter"], "20 cm").correct, true);
assert.equal(checkAnswer(perimeterAreaById["triangle-area"], "30 m2").correct, true);
assert.equal(checkAnswer(perimeterAreaById["circle-area"], "25pi").correct, true);
assert.equal(checkAnswer(perimeterAreaById["circle-circumference"], "10 pi").correct, true);
assert.equal(checkAnswer(perimeterAreaById["composite-cutout"], "225 cm^2").correct, true);
assert.equal(checkAnswer(perimeterAreaById["area-units"], "m^2").correct, true);
assert.equal(checkAnswer(perimeterAreaById["rectangle-area"], "20 cm").correct, false);

const circlesCheck = getLessonCheck("circles-arcs-sectors-check");
assert.ok(circlesCheck, "Expected circles-arcs-sectors-check to exist");

const circlesById = Object.fromEntries(circlesCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(circlesById["diameter-from-radius"], "12 cm").correct, true);
assert.equal(checkAnswer(circlesById["circumference-exact"], "10pi").correct, true);
assert.equal(checkAnswer(circlesById["arc-length-radians"], "8 m").correct, true);
assert.equal(checkAnswer(circlesById["sector-area-radians"], "10 m2").correct, true);
assert.equal(checkAnswer(circlesById["tangent-radius-angle"], "90 degrees").correct, true);
assert.equal(checkAnswer(circlesById["inscribed-angle"], "66 deg").correct, true);
assert.equal(checkAnswer(circlesById["arc-vs-chord"], "arc").correct, true);
assert.equal(checkAnswer(circlesById["arc-vs-chord"], "chord").correct, false);

const solidsCheck = getLessonCheck("surface-area-and-volume-of-solids-check");
assert.ok(solidsCheck, "Expected surface-area-and-volume-of-solids-check to exist");

const solidsById = Object.fromEntries(solidsCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(solidsById["rectangular-prism-volume"], "24 cm3").correct, true);
assert.equal(checkAnswer(solidsById["rectangular-prism-volume"], "24 cm^3").correct, true);
assert.equal(checkAnswer(solidsById["rectangular-prism-volume"], "24 cm2").correct, false);
assert.equal(checkAnswer(solidsById["rectangular-prism-surface-area"], "52 cm2").correct, true);
assert.equal(checkAnswer(solidsById["cylinder-volume-exact"], "90pi").correct, true);
assert.equal(checkAnswer(solidsById["cylinder-lateral-area-exact"], "20 pi").correct, true);
assert.equal(checkAnswer(solidsById["cone-volume-exact"], "12*pi").correct, true);
assert.equal(checkAnswer(solidsById["sphere-surface-area-exact"], "16pi").correct, true);
assert.equal(checkAnswer(solidsById["volume-units"], "m3").correct, true);

const trigCheck = getLessonCheck("right-triangle-trigonometry-check");
assert.ok(trigCheck, "Expected right-triangle-trigonometry-check to exist");

const trigById = Object.fromEntries(trigCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(trigById["sine-ratio"], "opposite/hypotenuse").correct, true);
assert.equal(checkAnswer(trigById["cosine-ratio"], "adjacent over hypotenuse").correct, true);
assert.equal(checkAnswer(trigById["tangent-ratio"], "opposite/adjacent").correct, true);
assert.equal(checkAnswer(trigById["three-four-five-sine"], "3/5").correct, true);
assert.equal(checkAnswer(trigById["height-from-tangent"], "5.77 m").correct, true);
assert.equal(checkAnswer(trigById["inverse-tangent-angle"], "36.87 degrees").correct, true);
assert.equal(checkAnswer(trigById["calculator-mode"], "radians").correct, true);
assert.equal(checkAnswer(trigById["calculator-mode"], "degrees").correct, false);

const droneTrigCheck = getLessonCheck("trigonometry-for-drones-and-robotics-check");
assert.ok(droneTrigCheck, "Expected trigonometry-for-drones-and-robotics-check to exist");

const droneTrigById = Object.fromEntries(droneTrigCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(droneTrigById["component-x"], "5 m").correct, true);
assert.equal(checkAnswer(droneTrigById["component-y"], "5 meters").correct, true);
assert.equal(checkAnswer(droneTrigById["drone-footprint-width"], "70 m").correct, true);
assert.equal(checkAnswer(droneTrigById["tilted-sensor-distance"], "4.48 m").correct, true);
assert.equal(checkAnswer(droneTrigById["atan2-purpose"], "atan2").correct, true);
assert.equal(checkAnswer(droneTrigById["fov-half-angle"], "40 degrees").correct, true);
assert.equal(checkAnswer(droneTrigById["code-angle-units"], "radians").correct, true);
assert.equal(checkAnswer(droneTrigById["code-angle-units"], "degrees").correct, false);

const unitCircleCheck = getLessonCheck("the-unit-circle-check");
assert.ok(unitCircleCheck, "Expected the-unit-circle-check to exist");

const unitCircleById = Object.fromEntries(unitCircleCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(unitCircleById["unit-circle-equation"], "x^2 + y^2 = 1").correct, true);
assert.equal(checkAnswer(unitCircleById["cosine-coordinate"], "x coordinate").correct, true);
assert.equal(checkAnswer(unitCircleById["sine-coordinate"], "y").correct, true);
assert.equal(checkAnswer(unitCircleById["full-rotation-radians"], "2pi").correct, true);
assert.equal(checkAnswer(unitCircleById["cos-120"], "-1/2").correct, true);
assert.equal(checkAnswer(unitCircleById["sin-210"], "-0.5").correct, true);
assert.equal(checkAnswer(unitCircleById["tangent-undefined"], "division by zero").correct, true);
assert.equal(checkAnswer(unitCircleById["cosine-coordinate"], "y").correct, false);

const identitiesCheck = getLessonCheck("trigonometric-identities-check");
assert.ok(identitiesCheck, "Expected trigonometric-identities-check to exist");

const identitiesById = Object.fromEntries(identitiesCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(identitiesById["pythagorean-identity"], "1").correct, true);
assert.equal(checkAnswer(identitiesById["tangent-quotient"], "sin(theta)/cos(theta)").correct, true);
assert.equal(checkAnswer(identitiesById["secant-reciprocal"], "1/cos(theta)").correct, true);
assert.equal(checkAnswer(identitiesById["one-plus-tan-squared"], "sec^2(theta)").correct, true);
assert.equal(checkAnswer(identitiesById["sin-negative"], "-sin(theta)").correct, true);
assert.equal(checkAnswer(identitiesById["false-sum"], "no").correct, true);
assert.equal(checkAnswer(identitiesById["tan-times-cos"], "sin(theta)").correct, true);
assert.equal(checkAnswer(identitiesById["false-sum"], "yes").correct, false);

const inverseTrigCheck = getLessonCheck("inverse-trig-functions-check");
assert.ok(inverseTrigCheck, "Expected inverse-trig-functions-check to exist");

const inverseTrigById = Object.fromEntries(inverseTrigCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(inverseTrigById["arcsin-half"], "30 degrees").correct, true);
assert.equal(checkAnswer(inverseTrigById["arccos-half"], "60 deg").correct, true);
assert.equal(checkAnswer(inverseTrigById["arctan-one"], "45 degrees").correct, true);
assert.equal(checkAnswer(inverseTrigById["asin-domain"], "no").correct, true);
assert.equal(checkAnswer(inverseTrigById["atan2-heading"], "atan2").correct, true);
assert.equal(checkAnswer(inverseTrigById["principal-value"], "one principal value").correct, true);
assert.equal(checkAnswer(inverseTrigById["code-inverse-output"], "radians").correct, true);
assert.equal(checkAnswer(inverseTrigById["asin-domain"], "yes").correct, false);

const radiansCheck = getLessonCheck("radians-and-arc-length-check");
assert.ok(radiansCheck, "Expected radians-and-arc-length-check to exist");

const radiansById = Object.fromEntries(radiansCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(radiansById["full-rotation"], "2pi").correct, true);
assert.equal(checkAnswer(radiansById["ninety-degrees"], "pi/2").correct, true);
assert.equal(checkAnswer(radiansById["arc-length"], "8 m").correct, true);
assert.equal(checkAnswer(radiansById["sector-area"], "10 m2").correct, true);
assert.equal(checkAnswer(radiansById["linear-speed"], "3 m/s").correct, true);
assert.equal(checkAnswer(radiansById["rpm-to-rad-s"], "2pi rad/s").correct, true);
assert.equal(checkAnswer(radiansById["radian-definition"], "radius").correct, true);
assert.equal(checkAnswer(radiansById["radian-definition"], "diameter").correct, false);

const vectorsZeroCheck = getLessonCheck("vectors-from-zero-check");
assert.ok(vectorsZeroCheck, "Expected vectors-from-zero-check to exist");

const vectorsZeroById = Object.fromEntries(vectorsZeroCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(vectorsZeroById["scalar-or-vector"], "vector").correct, true);
assert.equal(checkAnswer(vectorsZeroById["magnitude-3-4"], "5").correct, true);
assert.equal(checkAnswer(vectorsZeroById["magnitude-3d"], "7").correct, true);
assert.equal(checkAnswer(vectorsZeroById["unit-vector-3-4"], "(3/5, 4/5)").correct, true);
assert.equal(checkAnswer(vectorsZeroById["zero-vector-direction"], "no").correct, true);
assert.equal(checkAnswer(vectorsZeroById["position-vs-displacement"], "displacement").correct, true);
assert.equal(checkAnswer(vectorsZeroById["components-meaning"], "5").correct, true);
assert.equal(checkAnswer(vectorsZeroById["scalar-or-vector"], "scalar").correct, false);

const vectorArithmeticCheck = getLessonCheck("vector-arithmetic-and-scaling-check");
assert.ok(vectorArithmeticCheck, "Expected vector-arithmetic-and-scaling-check to exist");

const vectorArithmeticById = Object.fromEntries(vectorArithmeticCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(vectorArithmeticById["add-vectors"], "(6, 8)").correct, true);
assert.equal(checkAnswer(vectorArithmeticById["subtract-vectors"], "(5,-4)").correct, true);
assert.equal(checkAnswer(vectorArithmeticById["scale-vector"], "(-6, -8)").correct, true);
assert.equal(checkAnswer(vectorArithmeticById["point-displacement"], "(6,4)").correct, true);
assert.equal(checkAnswer(vectorArithmeticById["force-resultant"], "(6, 1)").correct, true);
assert.equal(checkAnswer(vectorArithmeticById["path-vs-displacement"], "5 m").correct, true);
assert.equal(checkAnswer(vectorArithmeticById["negative-scalar"], "reverses direction").correct, true);
assert.equal(checkAnswer(vectorArithmeticById["add-vectors"], "(8, 6)").correct, false);

const dotProductCheck = getLessonCheck("dot-product-and-projections-check");
assert.ok(dotProductCheck, "Expected dot-product-and-projections-check to exist");

const dotProductById = Object.fromEntries(dotProductCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(dotProductById["basic-dot"], "23").correct, true);
assert.equal(checkAnswer(dotProductById["perpendicular-dot"], "0").correct, true);
assert.equal(checkAnswer(dotProductById["dot-sign-negative"], "greater than 90 degrees").correct, true);
assert.equal(checkAnswer(dotProductById["scalar-projection"], "6").correct, true);
assert.equal(checkAnswer(dotProductById["vector-projection"], "(4, 0)").correct, true);
assert.equal(checkAnswer(dotProductById["work-dot"], "50").correct, true);
assert.equal(checkAnswer(dotProductById["dot-product-result-type"], "scalar").correct, true);
assert.equal(checkAnswer(dotProductById["dot-product-result-type"], "vector").correct, false);

const crossProductCheck = getLessonCheck("cross-product-and-right-hand-rule-check");
assert.ok(crossProductCheck, "Expected cross-product-and-right-hand-rule-check to exist");

const crossProductById = Object.fromEntries(crossProductCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(crossProductById["i-cross-j"], "(0, 0, 1)").correct, true);
assert.equal(checkAnswer(crossProductById["j-cross-i"], "(0, 0, -1)").correct, true);
assert.equal(checkAnswer(crossProductById["component-cross"], "(-3, 6, -3)").correct, true);
assert.equal(checkAnswer(crossProductById["parallel-cross"], "zero vector").correct, true);
assert.equal(checkAnswer(crossProductById["parallelogram-area"], "12").correct, true);
assert.equal(checkAnswer(crossProductById["torque-basic"], "6").correct, true);
assert.equal(checkAnswer(crossProductById["right-hand-rule"], "right hand").correct, true);
assert.equal(checkAnswer(crossProductById["i-cross-j"], "(0, 0, -1)").correct, false);

const bearingsCheck = getLessonCheck("bearings-and-headings-for-navigation-check");
assert.ok(bearingsCheck, "Expected bearings-and-headings-for-navigation-check to exist");

const bearingsById = Object.fromEntries(bearingsCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(bearingsById["east-bearing"], "90 degrees").correct, true);
assert.equal(checkAnswer(bearingsById["bearing-to-math"], "330 deg").correct, true);
assert.equal(checkAnswer(bearingsById["bearing-east-component"], "50 m").correct, true);
assert.equal(checkAnswer(bearingsById["bearing-north-component"], "86.6 meters").correct, true);
assert.equal(checkAnswer(bearingsById["atan2-order-bearing"], "atan2(E, N)").correct, true);
assert.equal(checkAnswer(bearingsById["wind-ground-velocity"], "(3, 10)").correct, true);
assert.equal(checkAnswer(bearingsById["heading-track-differ"], "yes").correct, true);
assert.equal(checkAnswer(bearingsById["bearing-to-math"], "120 degrees").correct, false);

const framesCheck = getLessonCheck("coordinate-frames-and-robot-motion-check");
assert.ok(framesCheck, "Expected coordinate-frames-and-robot-motion-check to exist");

const framesById = Object.fromEntries(framesCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(framesById["frame-definition"], "axes").correct, true);
assert.equal(checkAnswer(framesById["rotate-forward-90"], "(0, 2)").correct, true);
assert.equal(checkAnswer(framesById["body-point-to-world"], "(10, 7)").correct, true);
assert.equal(checkAnswer(framesById["world-point-to-body"], "(2, 0)").correct, true);
assert.equal(checkAnswer(framesById["free-vector-translation"], "no").correct, true);
assert.equal(checkAnswer(framesById["same-frame-addition"], "yes").correct, true);
assert.equal(checkAnswer(framesById["body-velocity-wind"], "(0, 3)").correct, true);
assert.equal(checkAnswer(framesById["free-vector-translation"], "yes").correct, false);

const functionsPiecewiseCheck = getLessonCheck("functions-review-and-piecewise-check");
assert.ok(functionsPiecewiseCheck, "Expected functions-review-and-piecewise-check to exist");

const functionsPiecewiseById = Object.fromEntries(functionsPiecewiseCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(functionsPiecewiseById["evaluate-linear"], "11").correct, true);
assert.equal(checkAnswer(functionsPiecewiseById["function-one-output"], "exactly one").correct, true);
assert.equal(checkAnswer(functionsPiecewiseById["domain-denominator"], "x = 4").correct, true);
assert.equal(checkAnswer(functionsPiecewiseById["piecewise-branch"], "9").correct, true);
assert.equal(checkAnswer(functionsPiecewiseById["saturation-output"], "1").correct, true);
assert.equal(checkAnswer(functionsPiecewiseById["deadband-purpose"], "sets them to zero").correct, true);
assert.equal(checkAnswer(functionsPiecewiseById["piecewise-real-systems"], "yes").correct, true);
assert.equal(checkAnswer(functionsPiecewiseById["piecewise-branch"], "5").correct, false);

const polynomialCheck = getLessonCheck("polynomial-functions-and-end-behavior-check");
assert.ok(polynomialCheck, "Expected polynomial-functions-and-end-behavior-check to exist");

const polynomialById = Object.fromEntries(polynomialCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(polynomialById["degree-identification"], "4").correct, true);
assert.equal(checkAnswer(polynomialById["leading-coefficient"], "-5").correct, true);
assert.equal(checkAnswer(polynomialById["polynomial-or-not"], "no").correct, true);
assert.equal(checkAnswer(polynomialById["evaluate-cubic"], "11").correct, true);
assert.equal(checkAnswer(polynomialById["end-behavior-even-negative"], "both ends go down").correct, true);
assert.equal(checkAnswer(polynomialById["root-from-factor"], "-3").correct, true);
assert.equal(checkAnswer(polynomialById["turning-points"], "4").correct, true);
assert.equal(checkAnswer(polynomialById["polynomial-or-not"], "yes").correct, false);

const quadraticCheck = getLessonCheck("quadratic-functions-and-the-quadratic-formula-check");
assert.ok(quadraticCheck, "Expected quadratic-functions-and-the-quadratic-formula-check to exist");

const quadraticById = Object.fromEntries(quadraticCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(quadraticById["identify-a"], "2").correct, true);
assert.equal(checkAnswer(quadraticById["vertex-x"], "3").correct, true);
assert.equal(checkAnswer(quadraticById["factored-roots"], "-2").correct, true);
assert.equal(checkAnswer(quadraticById["discriminant-kind"], "no real roots").correct, true);
assert.equal(checkAnswer(quadraticById["quadratic-formula-root"], "-2").correct, true);
assert.equal(checkAnswer(quadraticById["projectile-maximum-time"], "2 s").correct, true);
assert.equal(checkAnswer(quadraticById["opening-direction"], "down").correct, true);
assert.equal(checkAnswer(quadraticById["opening-direction"], "up").correct, false);

const factoringCheck = getLessonCheck("polynomial-factoring-techniques-check");
assert.ok(factoringCheck, "Expected polynomial-factoring-techniques-check to exist");

const factoringById = Object.fromEntries(factoringCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(factoringById["gcf-factor"], "4x(3x-2)").correct, true);
assert.equal(checkAnswer(factoringById["simple-trinomial"], "(x-3)(x-4)").correct, true);
assert.equal(checkAnswer(factoringById["difference-squares"], "(x-3)(x+3)").correct, true);
assert.equal(checkAnswer(factoringById["perfect-square"], "(x+3)^2").correct, true);
assert.equal(checkAnswer(factoringById["zero-product-root"], "-5").correct, true);
assert.equal(checkAnswer(factoringById["lost-root"], "0").correct, true);
assert.equal(checkAnswer(factoringById["projectile-factor"], "4 s").correct, true);
assert.equal(checkAnswer(factoringById["difference-squares"], "(x-9)(x+9)").correct, false);

const polynomialDivisionCheck = getLessonCheck("polynomial-division-and-factor-theorem-check");
assert.ok(polynomialDivisionCheck, "Expected polynomial-division-and-factor-theorem-check to exist");

const polynomialDivisionById = Object.fromEntries(polynomialDivisionCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(polynomialDivisionById["remainder-theorem"], "18").correct, true);
assert.equal(checkAnswer(polynomialDivisionById["factor-theorem"], "x - 3").correct, true);
assert.equal(checkAnswer(polynomialDivisionById["synthetic-sign"], "-2").correct, true);
assert.equal(checkAnswer(polynomialDivisionById["cubic-quotient"], "x^2 - 5x + 6").correct, true);
assert.equal(checkAnswer(polynomialDivisionById["rational-root-candidate"], "yes").correct, true);
assert.equal(checkAnswer(polynomialDivisionById["quotient-remainder"], "x+2+3/(x+1)").correct, true);
assert.equal(checkAnswer(polynomialDivisionById["missing-zero-coefficients"], "yes").correct, true);
assert.equal(checkAnswer(polynomialDivisionById["synthetic-sign"], "2").correct, false);

const rationalFunctionsCheck = getLessonCheck("rational-functions-and-asymptotes-check");
assert.ok(rationalFunctionsCheck, "Expected rational-functions-and-asymptotes-check to exist");

const rationalFunctionsById = Object.fromEntries(rationalFunctionsCheck.questions.map((question) => [question.id, question]));

assert.equal(checkAnswer(rationalFunctionsById["domain-restriction"], "x = 3").correct, true);
assert.equal(checkAnswer(rationalFunctionsById["hole-point"], "(1, 2)").correct, true);
assert.equal(checkAnswer(rationalFunctionsById["vertical-asymptote"], "x=4").correct, true);
assert.equal(checkAnswer(rationalFunctionsById["horizontal-asymptote"], "y = 2/5").correct, true);
assert.equal(checkAnswer(rationalFunctionsById["slant-asymptote"], "y=x+2").correct, true);
assert.equal(checkAnswer(rationalFunctionsById["one-sided-positive"], "+infinity").correct, true);
assert.equal(checkAnswer(rationalFunctionsById["cancel-factors-not-terms"], "no").correct, true);
assert.equal(checkAnswer(rationalFunctionsById["cancel-factors-not-terms"], "yes").correct, false);

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
