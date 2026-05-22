import type { ModuleExamConfig, QuestionTemplate } from "../../src/lib/exam/types.ts";

const PI = Math.PI;

function round(n: number, places = 2): number {
  const f = Math.pow(10, places);
  return Math.round(n * f) / f;
}

function deg(rad: number): number {
  return (rad * 180) / PI;
}

function rad(degVal: number): number {
  return (degVal * PI) / 180;
}

const pythagorasTemplates: QuestionTemplate[] = [
  {
    id: "pyth-find-hypotenuse",
    conceptId: "right-triangles",
    difficulty: "core",
    generate: (rng) => {
      const triples = [
        [3, 4, 5],
        [5, 12, 13],
        [8, 15, 17],
        [7, 24, 25],
        [20, 21, 29],
      ];
      const [a, b, c] = rng.pick(triples);
      const scale = rng.int(1, 5);
      return {
        prompt: `A right triangle has legs ${a * scale} and ${b * scale}. What is the hypotenuse?`,
        kind: "numeric",
        answer: { kind: "numeric", value: c * scale, tolerance: 0.001 },
        explanation: `c = √(a² + b²) = √(${(a * scale) ** 2} + ${(b * scale) ** 2}) = √${(a * scale) ** 2 + (b * scale) ** 2} = ${c * scale}.`,
      };
    },
  },
  {
    id: "pyth-find-leg",
    conceptId: "right-triangles",
    difficulty: "applied",
    generate: (rng) => {
      const triples = [
        [3, 4, 5],
        [5, 12, 13],
        [8, 15, 17],
      ];
      const [a, b, c] = rng.pick(triples);
      const scale = rng.int(1, 4);
      return {
        prompt: `A right triangle has hypotenuse ${c * scale} and one leg ${a * scale}. What is the other leg?`,
        kind: "numeric",
        answer: { kind: "numeric", value: b * scale, tolerance: 0.001 },
        explanation: `Solve b = √(c² − a²) = √(${(c * scale) ** 2} − ${(a * scale) ** 2}) = ${b * scale}.`,
      };
    },
  },
  {
    id: "pyth-distance-2d",
    conceptId: "right-triangles",
    difficulty: "applied",
    generate: (rng) => {
      const x1 = rng.int(-5, 5);
      const y1 = rng.int(-5, 5);
      const dx = rng.pick([3, 5, 8]);
      const dy = rng.pick([4, 12, 15]);
      const x2 = x1 + dx;
      const y2 = y1 + dy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      return {
        prompt: `Find the straight-line distance between points (${x1}, ${y1}) and (${x2}, ${y2}). Round to 2 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: round(dist, 2), tolerance: 0.02 },
        explanation: `d = √((x₂ − x₁)² + (y₂ − y₁)²) = √(${dx}² + ${dy}²) = ${round(dist, 2)}.`,
      };
    },
  },
  {
    id: "pyth-which-is-right",
    conceptId: "right-triangles",
    difficulty: "challenge",
    generate: (rng) => {
      const right = rng.pick([
        [3, 4, 5],
        [5, 12, 13],
        [8, 15, 17],
        [9, 40, 41],
      ]);
      const wrongs = rng.shuffle([
        [4, 5, 6],
        [7, 9, 12],
        [10, 12, 15],
        [6, 7, 10],
      ]);
      const labels = [right, ...wrongs.slice(0, 3)];
      const shuffled = rng.shuffle(labels);
      const correctIndex = shuffled.findIndex(
        (t) => t === right || (t[0] === right[0] && t[1] === right[1] && t[2] === right[2]),
      );
      return {
        prompt: "Which set of side lengths forms a right triangle?",
        kind: "multiple-choice",
        answer: {
          kind: "multiple-choice",
          choices: shuffled.map((t) => `${t[0]}, ${t[1]}, ${t[2]}`),
          correctIndex,
        },
        explanation: `A right triangle satisfies a² + b² = c² with the largest side as c. Test each option; ${right[0]}, ${right[1]}, ${right[2]} works.`,
      };
    },
  },
];

const trigRatioTemplates: QuestionTemplate[] = [
  {
    id: "trig-which-ratio",
    conceptId: "trigonometric-ratios",
    difficulty: "core",
    generate: (rng) => {
      const cases = [
        {
          q: "You know the side opposite an angle and the hypotenuse. Which ratio do you use to find the angle?",
          choices: ["sin", "cos", "tan", "Pythagoras"],
          correctIndex: 0,
        },
        {
          q: "You know the side adjacent to an angle and the hypotenuse. Which ratio do you use to find the angle?",
          choices: ["sin", "cos", "tan", "Pythagoras"],
          correctIndex: 1,
        },
        {
          q: "You know the side opposite an angle and the side adjacent to it. Which ratio do you use to find the angle?",
          choices: ["sin", "cos", "tan", "Pythagoras"],
          correctIndex: 2,
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: "SOH-CAH-TOA: sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent.",
      };
    },
  },
  {
    id: "trig-find-side-given-angle",
    conceptId: "trigonometric-ratios",
    difficulty: "applied",
    generate: (rng) => {
      const angleDeg = rng.pick([15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 70]);
      const hyp = rng.int(5, 30);
      const mode = rng.pick(["opposite", "adjacent"]);
      if (mode === "opposite") {
        const opp = hyp * Math.sin(rad(angleDeg));
        return {
          prompt: `A ladder ${hyp} m long leans against a wall at ${angleDeg}° from the ground. How high up the wall does it reach? Round to 2 decimals.`,
          kind: "numeric",
          answer: { kind: "numeric", value: round(opp, 2), unit: "m", tolerance: 0.05 },
          explanation: `Height = hyp × sin(angle) = ${hyp} × sin(${angleDeg}°) = ${round(opp, 2)} m.`,
        };
      }
      const adj = hyp * Math.cos(rad(angleDeg));
      return {
        prompt: `A ${hyp} m ladder leans against a wall at ${angleDeg}° from the ground. How far is the base from the wall? Round to 2 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: round(adj, 2), unit: "m", tolerance: 0.05 },
        explanation: `Base distance = hyp × cos(angle) = ${hyp} × cos(${angleDeg}°) = ${round(adj, 2)} m.`,
      };
    },
  },
  {
    id: "trig-find-angle-from-sides",
    conceptId: "trigonometric-ratios",
    difficulty: "applied",
    generate: (rng) => {
      const opp = rng.int(3, 9);
      const adj = rng.int(4, 12);
      const ang = round(deg(Math.atan2(opp, adj)), 1);
      return {
        prompt: `A drone climbs ${opp} m while moving ${adj} m horizontally. What is its climb angle above the horizontal? Round to 1 decimal.`,
        kind: "numeric",
        answer: { kind: "numeric", value: ang, unit: "deg", tolerance: 0.2 },
        explanation: `tan(angle) = opposite/adjacent = ${opp}/${adj} → angle = arctan(${(opp / adj).toFixed(3)}) = ${ang}°.`,
      };
    },
  },
  {
    id: "trig-special-angle",
    conceptId: "trigonometric-ratios",
    difficulty: "challenge",
    generate: (rng) => {
      const cases = [
        { q: "sin(30°)", val: 0.5 },
        { q: "cos(60°)", val: 0.5 },
        { q: "tan(45°)", val: 1 },
        { q: "sin(45°)", val: round(Math.sqrt(2) / 2, 3) },
        { q: "cos(30°)", val: round(Math.sqrt(3) / 2, 3) },
        { q: "tan(30°)", val: round(1 / Math.sqrt(3), 3) },
      ];
      const c = rng.pick(cases);
      return {
        prompt: `Evaluate ${c.q} (to 3 decimals if needed).`,
        kind: "numeric",
        answer: { kind: "numeric", value: c.val, tolerance: 0.005 },
        explanation: `These are special-angle values worth memorizing: ${c.q} = ${c.val}.`,
      };
    },
  },
  {
    id: "trig-radian-degree",
    conceptId: "trigonometric-ratios",
    difficulty: "applied",
    generate: (rng) => {
      const target = rng.pick(["deg-to-rad", "rad-to-deg"]);
      if (target === "deg-to-rad") {
        const angleDeg = rng.pick([30, 45, 60, 90, 120, 135, 180, 270]);
        const angleRad = round((angleDeg * PI) / 180, 4);
        return {
          prompt: `Convert ${angleDeg}° to radians. Round to 4 decimals.`,
          kind: "numeric",
          answer: { kind: "numeric", value: angleRad, unit: "rad", tolerance: 0.001 },
          explanation: `rad = deg × π/180 = ${angleDeg} × π/180 = ${angleRad} rad.`,
        };
      }
      const angleRad = rng.pick([PI / 6, PI / 4, PI / 3, PI / 2, PI, 3 * PI / 2, 2 * PI]);
      const angleDeg = round((angleRad * 180) / PI, 1);
      const display = ["π/6", "π/4", "π/3", "π/2", "π", "3π/2", "2π"][[PI / 6, PI / 4, PI / 3, PI / 2, PI, 3 * PI / 2, 2 * PI].indexOf(angleRad)];
      return {
        prompt: `Convert ${display} radians to degrees.`,
        kind: "numeric",
        answer: { kind: "numeric", value: angleDeg, unit: "deg", tolerance: 0.2 },
        explanation: `deg = rad × 180/π = ${display} × 180/π = ${angleDeg}°.`,
      };
    },
  },
];

const vectorComponentTemplates: QuestionTemplate[] = [
  {
    id: "vec-decompose-to-components",
    conceptId: "vector-components",
    difficulty: "core",
    generate: (rng) => {
      const mag = rng.int(5, 30);
      const ang = rng.pick([15, 20, 30, 37, 45, 53, 60, 75]);
      const vx = round(mag * Math.cos(rad(ang)), 2);
      const target = rng.pick(["x", "y"]);
      if (target === "x") {
        return {
          prompt: `A drone flies at ${mag} m/s at ${ang}° above horizontal. What is the horizontal component of its velocity? Round to 2 decimals.`,
          kind: "numeric",
          answer: { kind: "numeric", value: vx, unit: "m/s", tolerance: 0.1 },
          explanation: `vₓ = v·cos(θ) = ${mag}·cos(${ang}°) = ${vx} m/s.`,
        };
      }
      const vy = round(mag * Math.sin(rad(ang)), 2);
      return {
        prompt: `A drone flies at ${mag} m/s at ${ang}° above horizontal. What is the vertical component of its velocity? Round to 2 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: vy, unit: "m/s", tolerance: 0.1 },
        explanation: `v_y = v·sin(θ) = ${mag}·sin(${ang}°) = ${vy} m/s.`,
      };
    },
  },
  {
    id: "vec-magnitude-from-components",
    conceptId: "vector-components",
    difficulty: "core",
    generate: (rng) => {
      const triples = [
        [3, 4],
        [5, 12],
        [8, 15],
        [6, 8],
      ];
      const [x, y] = rng.pick(triples);
      const mag = Math.sqrt(x * x + y * y);
      return {
        prompt: `A vector has components (${x}, ${y}). What is its magnitude?`,
        kind: "numeric",
        answer: { kind: "numeric", value: round(mag, 3), tolerance: 0.01 },
        explanation: `|v| = √(x² + y²) = √(${x}² + ${y}²) = ${round(mag, 3)}.`,
      };
    },
  },
  {
    id: "vec-direction-from-components",
    conceptId: "vector-components",
    difficulty: "applied",
    generate: (rng) => {
      const x = rng.int(1, 10);
      const y = rng.int(1, 10);
      const ang = round(deg(Math.atan2(y, x)), 1);
      return {
        prompt: `A vector has components (${x}, ${y}). What angle does it make with the positive x-axis? Round to 1 decimal.`,
        kind: "numeric",
        answer: { kind: "numeric", value: ang, unit: "deg", tolerance: 0.3 },
        explanation: `θ = arctan(y/x) = arctan(${y}/${x}) = ${ang}°. (Quadrant I, both components positive.)`,
      };
    },
  },
  {
    id: "vec-add-by-components",
    conceptId: "vector-components",
    difficulty: "applied",
    generate: (rng) => {
      const ax = rng.int(-6, 8);
      const ay = rng.int(-6, 8);
      const bx = rng.int(-6, 8);
      const by = rng.int(-6, 8);
      const target = rng.pick(["x", "y"]);
      if (target === "x") {
        return {
          prompt: `Vector A = (${ax}, ${ay}) and B = (${bx}, ${by}). Find the x-component of A + B.`,
          kind: "numeric",
          answer: { kind: "numeric", value: ax + bx, tolerance: 0 },
          explanation: `(A + B)ₓ = Aₓ + Bₓ = ${ax} + ${bx} = ${ax + bx}.`,
        };
      }
      return {
        prompt: `Vector A = (${ax}, ${ay}) and B = (${bx}, ${by}). Find the y-component of A + B.`,
        kind: "numeric",
        answer: { kind: "numeric", value: ay + by, tolerance: 0 },
        explanation: `(A + B)_y = A_y + B_y = ${ay} + ${by} = ${ay + by}.`,
      };
    },
  },
  {
    id: "vec-scalar-multiply",
    conceptId: "vector-components",
    difficulty: "applied",
    generate: (rng) => {
      const x = rng.int(-7, 7);
      const y = rng.int(-7, 7);
      const k = rng.int(-4, 4) || 2;
      const target = rng.pick(["x", "y", "magnitude"]);
      if (target === "magnitude") {
        const mag = Math.abs(k) * Math.sqrt(x * x + y * y);
        return {
          prompt: `Vector v = (${x}, ${y}). What is the magnitude of ${k}·v? Round to 2 decimals.`,
          kind: "numeric",
          answer: { kind: "numeric", value: round(mag, 2), tolerance: 0.05 },
          explanation: `|k·v| = |k|·|v| = ${Math.abs(k)} × √(${x}² + ${y}²) = ${round(mag, 2)}.`,
        };
      }
      if (target === "x") {
        return {
          prompt: `Vector v = (${x}, ${y}). What is the x-component of ${k}·v?`,
          kind: "numeric",
          answer: { kind: "numeric", value: k * x, tolerance: 0 },
          explanation: `Scalar multiplication scales each component: (k·v)ₓ = k·vₓ = ${k}·${x} = ${k * x}.`,
        };
      }
      return {
        prompt: `Vector v = (${x}, ${y}). What is the y-component of ${k}·v?`,
        kind: "numeric",
        answer: { kind: "numeric", value: k * y, tolerance: 0 },
        explanation: `(k·v)_y = k·v_y = ${k}·${y} = ${k * y}.`,
      };
    },
  },
];

const vectorOperationsTemplates: QuestionTemplate[] = [
  {
    id: "vec-dot-product",
    conceptId: "vector-operations",
    difficulty: "core",
    generate: (rng) => {
      const ax = rng.int(-5, 5);
      const ay = rng.int(-5, 5);
      const bx = rng.int(-5, 5);
      const by = rng.int(-5, 5);
      return {
        prompt: `Compute the dot product (${ax}, ${ay}) · (${bx}, ${by}).`,
        kind: "numeric",
        answer: { kind: "numeric", value: ax * bx + ay * by, tolerance: 0 },
        explanation: `a · b = aₓbₓ + a_yb_y = ${ax}·${bx} + ${ay}·${by} = ${ax * bx + ay * by}.`,
      };
    },
  },
  {
    id: "vec-perpendicular-detection",
    conceptId: "vector-operations",
    difficulty: "applied",
    generate: (rng) => {
      const a = rng.pick([
        [1, 0],
        [3, 4],
        [2, 5],
        [4, 1],
      ]);
      const perp = [-a[1], a[0]];
      const notPerp = rng.shuffle([
        [a[0], a[1]],
        [a[0] + 1, a[1]],
        [a[1], -a[0] + 1],
      ]);
      const choices = rng.shuffle([
        `(${perp[0]}, ${perp[1]})`,
        `(${notPerp[0][0]}, ${notPerp[0][1]})`,
        `(${notPerp[1][0]}, ${notPerp[1][1]})`,
        `(${notPerp[2][0]}, ${notPerp[2][1]})`,
      ]);
      const correctIndex = choices.indexOf(`(${perp[0]}, ${perp[1]})`);
      return {
        prompt: `Which vector is perpendicular to (${a[0]}, ${a[1]})? (Two vectors are perpendicular when their dot product is zero.)`,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices, correctIndex },
        explanation: `(${a[0]}, ${a[1]}) · (${perp[0]}, ${perp[1]}) = ${a[0]}·${perp[0]} + ${a[1]}·${perp[1]} = 0, so they are perpendicular.`,
      };
    },
  },
  {
    id: "vec-dot-angle-meaning",
    conceptId: "vector-operations",
    difficulty: "challenge",
    generate: () => ({
      prompt: "If the dot product of two unit vectors equals 0, what is the angle between them?",
      kind: "multiple-choice",
      answer: {
        kind: "multiple-choice",
        choices: ["0°", "45°", "90°", "180°"],
        correctIndex: 2,
      },
      explanation: "a · b = |a||b|cos(θ). For unit vectors |a||b| = 1, so cos(θ) = 0 → θ = 90°.",
    }),
  },
  {
    id: "vec-cross-magnitude-2d",
    conceptId: "vector-operations",
    difficulty: "challenge",
    generate: (rng) => {
      const ax = rng.int(1, 6);
      const ay = rng.int(1, 6);
      const bx = rng.int(1, 6);
      const by = rng.int(1, 6);
      const cross = ax * by - ay * bx;
      return {
        prompt: `For 2D vectors A = (${ax}, ${ay}) and B = (${bx}, ${by}), compute the scalar cross product Aₓ·B_y − A_y·Bₓ. (This equals the signed area of the parallelogram they span.)`,
        kind: "numeric",
        answer: { kind: "numeric", value: cross, tolerance: 0 },
        explanation: `Aₓ·B_y − A_y·Bₓ = ${ax}·${by} − ${ay}·${bx} = ${cross}. Magnitude = area of the parallelogram; sign indicates orientation.`,
      };
    },
  },
  {
    id: "vec-unit-vector",
    conceptId: "vector-operations",
    difficulty: "applied",
    generate: (rng) => {
      const pairs = [
        [3, 4, 5],
        [6, 8, 10],
        [5, 12, 13],
      ];
      const [x, y, m] = rng.pick(pairs);
      const target = rng.pick(["x", "y"]);
      if (target === "x") {
        return {
          prompt: `What is the x-component of the unit vector in the direction of (${x}, ${y})? Round to 3 decimals.`,
          kind: "numeric",
          answer: { kind: "numeric", value: round(x / m, 3), tolerance: 0.005 },
          explanation: `Unit vector = v / |v|. |v| = ${m}, so x-component = ${x}/${m} = ${round(x / m, 3)}.`,
        };
      }
      return {
        prompt: `What is the y-component of the unit vector in the direction of (${x}, ${y})? Round to 3 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: round(y / m, 3), tolerance: 0.005 },
        explanation: `Unit vector = v / |v|. |v| = ${m}, so y-component = ${y}/${m} = ${round(y / m, 3)}.`,
      };
    },
  },
];

const bearingsTemplates: QuestionTemplate[] = [
  {
    id: "bear-compass-to-math-angle",
    conceptId: "bearings-and-headings",
    difficulty: "applied",
    generate: (rng) => {
      const bearing = rng.pick([45, 90, 120, 180, 225, 270, 315]);
      const math = (90 - bearing + 360) % 360;
      return {
        prompt: `A drone heads on compass bearing ${bearing}° (clockwise from North). What is the equivalent math angle (counter-clockwise from positive x-axis)?`,
        kind: "numeric",
        answer: { kind: "numeric", value: math, unit: "deg", tolerance: 0.2 },
        explanation: `Math angle = (90 − bearing) mod 360 = ${math}°.`,
      };
    },
  },
  {
    id: "bear-displacement-from-bearing",
    conceptId: "bearings-and-headings",
    difficulty: "challenge",
    generate: (rng) => {
      const dist = rng.int(100, 1000);
      const bearing = rng.pick([30, 60, 120, 150]);
      const east = round(dist * Math.sin(rad(bearing)), 1);
      return {
        prompt: `A rover travels ${dist} m on bearing ${bearing}°. How far east does it end up? Round to 1 decimal.`,
        kind: "numeric",
        answer: { kind: "numeric", value: east, unit: "m", tolerance: 1 },
        explanation: `East component = distance × sin(bearing) = ${dist} × sin(${bearing}°) = ${east} m. (Bearings measure clockwise from North, so sin(bearing) gives the east component.)`,
      };
    },
  },
];

const trianglesTemplates: QuestionTemplate[] = [
  {
    id: "tri-angle-sum",
    conceptId: "triangle-properties",
    difficulty: "core",
    generate: (rng) => {
      const a = rng.int(20, 80);
      const maxB = Math.min(170 - a, 100);
      const b = rng.int(20, Math.max(20, maxB));
      const c = 180 - a - b;
      return {
        prompt: `A triangle has angles ${a}° and ${b}°. What is the third angle?`,
        kind: "numeric",
        answer: { kind: "numeric", value: c, unit: "deg", tolerance: 0 },
        explanation: `Angles of a triangle sum to 180°: third = 180 − ${a} − ${b} = ${c}°.`,
      };
    },
  },
  {
    id: "tri-similar",
    conceptId: "triangle-properties",
    difficulty: "applied",
    generate: (rng) => {
      const baseShort = rng.int(2, 8);
      const baseLong = baseShort * 3;
      const targetShort = rng.int(4, 10);
      const targetLong = targetShort * 3;
      return {
        prompt: `Triangle A has sides in ratio ${baseShort}:${baseLong}. A similar triangle B has its shorter side ${targetShort}. What is its longer side?`,
        kind: "numeric",
        answer: { kind: "numeric", value: targetLong, tolerance: 0 },
        explanation: `Similar triangles preserve ratios: ${targetShort}/${baseShort} = ${targetShort / baseShort}, so longer side = ${baseLong} × ${targetShort / baseShort} = ${targetLong}.`,
      };
    },
  },
  {
    id: "tri-area-sas",
    conceptId: "triangle-properties",
    difficulty: "challenge",
    generate: (rng) => {
      const a = rng.int(4, 15);
      const b = rng.int(4, 15);
      const ang = rng.pick([30, 45, 60, 90, 120]);
      const area = round(0.5 * a * b * Math.sin(rad(ang)), 2);
      return {
        prompt: `Find the area of a triangle with two sides ${a} and ${b} and the included angle ${ang}°. Round to 2 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: area, tolerance: 0.05 },
        explanation: `Area = ½·a·b·sin(C) = ½·${a}·${b}·sin(${ang}°) = ${area}.`,
      };
    },
  },
];

const concepts = [
  {
    id: "right-triangles",
    title: "Right Triangles and Pythagoras",
    description: "Sides, hypotenuse, distance formulas, and Pythagorean identities.",
  },
  {
    id: "trigonometric-ratios",
    title: "Trigonometric Ratios",
    description: "Sin/cos/tan, inverse trig, special angles, and radian/degree conversion.",
  },
  {
    id: "vector-components",
    title: "Vector Components",
    description: "Decomposing vectors into x/y, magnitude, direction, addition, and scalar multiplication.",
  },
  {
    id: "vector-operations",
    title: "Vector Operations",
    description: "Dot product, perpendicularity, unit vectors, and the 2D cross product.",
  },
  {
    id: "bearings-and-headings",
    title: "Bearings and Headings",
    description: "Converting between compass bearings and math angles; field navigation.",
  },
  {
    id: "triangle-properties",
    title: "Triangle Properties",
    description: "Angle sums, similar triangles, and area formulas.",
  },
];

export const geometryTrigVectorsExam: ModuleExamConfig = {
  moduleSlug: "geometry-trig-and-vectors",
  title: "Geometry, Trigonometry, and Vectors — Module Exam",
  description:
    "A 50-question exam covering right triangles, trig ratios, vector components and operations, bearings, and triangle properties. Numbers and angles randomize each attempt.",
  totalQuestions: 50,
  passThreshold: 95,
  concepts,
  conceptWeights: {
    "right-triangles": 8,
    "trigonometric-ratios": 12,
    "vector-components": 10,
    "vector-operations": 8,
    "bearings-and-headings": 4,
    "triangle-properties": 8,
  },
  templates: [
    ...pythagorasTemplates,
    ...trigRatioTemplates,
    ...vectorComponentTemplates,
    ...vectorOperationsTemplates,
    ...bearingsTemplates,
    ...trianglesTemplates,
  ],
};
