import type { ModuleExamConfig, QuestionTemplate } from "../../src/lib/exam/types.ts";

function round(n: number, places = 2): number {
  const f = Math.pow(10, places);
  return Math.round(n * f) / f;
}

const linearEquationTemplates: QuestionTemplate[] = [
  {
    id: "linear-isolate-x",
    conceptId: "linear-equations",
    difficulty: "core",
    generate: (rng) => {
      const a = rng.int(2, 9);
      const b = rng.int(-15, 15);
      const x = rng.int(-9, 9);
      const c = a * x + b;
      return {
        prompt: `Solve for x: ${a}x ${b >= 0 ? "+ " + b : "- " + Math.abs(b)} = ${c}.`,
        kind: "numeric",
        answer: { kind: "numeric", value: x, tolerance: 0 },
        explanation: `Subtract ${b} from both sides: ${a}x = ${c - b}. Divide by ${a}: x = ${x}.`,
      };
    },
  },
  {
    id: "linear-variables-both-sides",
    conceptId: "linear-equations",
    difficulty: "applied",
    generate: (rng) => {
      const a = rng.int(2, 7);
      const b = rng.int(2, 6);
      const x = rng.int(-8, 8);
      const c = rng.int(-12, 12);
      const d = (a - b) * x + c;
      return {
        prompt: `Solve for x: ${a}x + ${c} = ${b}x + ${d}.`,
        kind: "numeric",
        answer: { kind: "numeric", value: x, tolerance: 0 },
        explanation: `Bring x terms to one side: ${a - b}x = ${d - c}, so x = ${x}.`,
      };
    },
  },
  {
    id: "linear-fraction-clearing",
    conceptId: "linear-equations",
    difficulty: "applied",
    generate: (rng) => {
      const den = rng.pick([2, 3, 4, 5]);
      const x = rng.int(-6, 6);
      const c = rng.int(-8, 8);
      const rhs = x / den + c;
      return {
        prompt: `Solve for x: x/${den} + ${c} = ${rhs}. (Multiply both sides by ${den} first.)`,
        kind: "numeric",
        answer: { kind: "numeric", value: x, tolerance: 0.001 },
        explanation: `Multiply by ${den}: x + ${den * c} = ${den * rhs}, so x = ${x}.`,
      };
    },
  },
  {
    id: "linear-ohms-law",
    conceptId: "linear-equations",
    difficulty: "applied",
    generate: (rng) => {
      const v = rng.int(5, 24);
      const r = rng.pick([100, 220, 470, 1000, 2200]);
      const i = v / r;
      return {
        prompt: `Using V = IR, find the current in a ${r} Ω resistor with ${v} V across it. Express in milliamps (mA).`,
        kind: "numeric",
        answer: { kind: "numeric", value: round(i * 1000, 4), unit: "mA", tolerance: 0.05 },
        explanation: `I = V/R = ${v}/${r} = ${i.toFixed(5)} A = ${(i * 1000).toFixed(3)} mA.`,
      };
    },
  },
  {
    id: "linear-distance-rate-time",
    conceptId: "linear-equations",
    difficulty: "applied",
    generate: (rng) => {
      const v = rng.int(2, 15);
      const t = rng.int(3, 20);
      const d = v * t;
      const target = rng.pick(["d", "v", "t"]);
      if (target === "d") {
        return {
          prompt: `A rover moves at ${v} m/s for ${t} s. How far does it travel?`,
          kind: "numeric",
          answer: { kind: "numeric", value: d, unit: "m", tolerance: 0.001 },
          explanation: `d = v·t = ${v} × ${t} = ${d} m.`,
        };
      }
      if (target === "v") {
        return {
          prompt: `A rover travels ${d} m in ${t} s. What is its speed?`,
          kind: "numeric",
          answer: { kind: "numeric", value: v, unit: "m/s", tolerance: 0.001 },
          explanation: `v = d/t = ${d}/${t} = ${v} m/s.`,
        };
      }
      return {
        prompt: `A rover travels ${d} m at ${v} m/s. How long does it take?`,
        kind: "numeric",
        answer: { kind: "numeric", value: t, unit: "s", tolerance: 0.001 },
        explanation: `t = d/v = ${d}/${v} = ${t} s.`,
      };
    },
  },
  {
    id: "linear-rearrange-formula",
    conceptId: "linear-equations",
    difficulty: "challenge",
    generate: (rng) => {
      const cases = [
        {
          prompt: "Rearrange F = ma to solve for a.",
          choices: ["a = F + m", "a = F − m", "a = F/m", "a = mF"],
          correctIndex: 2,
          explanation: "Divide both sides by m: a = F/m.",
        },
        {
          prompt: "Rearrange V = IR to solve for R.",
          choices: ["R = V·I", "R = V/I", "R = I/V", "R = V − I"],
          correctIndex: 1,
          explanation: "Divide both sides by I: R = V/I.",
        },
        {
          prompt: "Rearrange P = V·I to solve for I.",
          choices: ["I = P + V", "I = V/P", "I = P/V", "I = PV"],
          correctIndex: 2,
          explanation: "Divide both sides by V: I = P/V.",
        },
        {
          prompt: "Rearrange C = 2πr to solve for r.",
          choices: ["r = C·2π", "r = C/(2π)", "r = 2π/C", "r = C − 2π"],
          correctIndex: 1,
          explanation: "Divide both sides by 2π: r = C/(2π).",
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.prompt,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: c.explanation,
      };
    },
  },
];

const dimensionalAnalysisTemplates: QuestionTemplate[] = [
  {
    id: "dim-energy-units",
    conceptId: "dimensional-analysis",
    difficulty: "core",
    generate: (rng) => {
      const cases = [
        {
          q: "What are the SI base units of force (N)?",
          choices: ["kg·m/s²", "kg/s²", "kg·m²/s", "kg·m/s"],
          correctIndex: 0,
        },
        {
          q: "What are the SI base units of energy (J)?",
          choices: ["kg·m²/s", "kg·m²/s²", "kg·m/s²", "kg/s²"],
          correctIndex: 1,
        },
        {
          q: "What are the SI base units of power (W)?",
          choices: ["kg·m²/s³", "kg·m/s²", "kg·m²/s²", "J·s"],
          correctIndex: 0,
        },
        {
          q: "What are the SI base units of momentum?",
          choices: ["kg·m/s²", "kg·m/s", "kg/s", "N·m"],
          correctIndex: 1,
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: `Working from first principles: ${c.choices[c.correctIndex]}.`,
      };
    },
  },
  {
    id: "dim-which-formula-wrong",
    conceptId: "dimensional-analysis",
    difficulty: "applied",
    generate: (rng) => {
      const wrong = rng.pick([
        "v = a·t² (velocity = acceleration × time²)",
        "F = m·v (force = mass × velocity)",
        "E = m·v (energy = mass × velocity)",
        "p = F·t² (momentum = force × time²)",
      ]);
      const right = rng.shuffle([
        "v = a·t",
        "F = m·a",
        "E = ½m·v²",
        "p = F·t",
      ]);
      const choices = rng.shuffle([wrong, ...right.slice(0, 3)]);
      const correctIndex = choices.indexOf(wrong);
      return {
        prompt: "Which equation is dimensionally inconsistent? (Use units to spot the wrong one.)",
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices, correctIndex },
        explanation: `Check each side. ${wrong} fails: the units on each side don't match. Dimensional analysis catches this before you compute a number.`,
      };
    },
  },
  {
    id: "dim-convert-compound",
    conceptId: "dimensional-analysis",
    difficulty: "applied",
    generate: (rng) => {
      const kmh = rng.int(30, 200);
      const ms = round(kmh / 3.6, 2);
      return {
        prompt: `Convert ${kmh} km/h to m/s. Round to 2 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: ms, unit: "m/s", tolerance: 0.05 },
        explanation: `${kmh} km/h × (1000 m / 1 km) × (1 h / 3600 s) = ${kmh}/3.6 = ${ms} m/s.`,
      };
    },
  },
  {
    id: "dim-area-volume",
    conceptId: "dimensional-analysis",
    difficulty: "core",
    generate: (rng) => {
      const len = rng.int(2, 12);
      const wid = rng.int(2, 12);
      const hei = rng.int(2, 12);
      const target = rng.pick(["area", "volume"]);
      if (target === "area") {
        return {
          prompt: `A plate is ${len} cm by ${wid} cm. What is its area?`,
          kind: "numeric",
          answer: { kind: "numeric", value: len * wid, unit: "cm^2", tolerance: 0.001 },
          explanation: `Area = ${len} × ${wid} = ${len * wid} cm². Units: cm × cm = cm².`,
        };
      }
      return {
        prompt: `A box is ${len} × ${wid} × ${hei} cm. What is its volume?`,
        kind: "numeric",
        answer: { kind: "numeric", value: len * wid * hei, unit: "cm^3", tolerance: 0.001 },
        explanation: `Volume = ${len} × ${wid} × ${hei} = ${len * wid * hei} cm³. Units: cm³.`,
      };
    },
  },
  {
    id: "dim-which-unit",
    conceptId: "dimensional-analysis",
    difficulty: "challenge",
    generate: (rng) => {
      const cases = [
        {
          q: "If you multiply (m/s²) by s, what units result?",
          choices: ["m", "m/s", "m²/s", "s"],
          correctIndex: 1,
        },
        {
          q: "If you divide N by m, what units result?",
          choices: ["J", "N/m (a spring constant)", "kg", "N·m"],
          correctIndex: 1,
        },
        {
          q: "If you multiply V by C (coulombs), what units result?",
          choices: ["J (energy)", "W (power)", "A (current)", "Ω (resistance)"],
          correctIndex: 0,
        },
        {
          q: "If you divide J by s, what units result?",
          choices: ["W", "N", "V", "Hz"],
          correctIndex: 0,
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: `Track the units symbolically; the result is ${c.choices[c.correctIndex]}.`,
      };
    },
  },
];

const functionsAndGraphsTemplates: QuestionTemplate[] = [
  {
    id: "graph-slope-from-points",
    conceptId: "functions-and-graphs",
    difficulty: "core",
    generate: (rng) => {
      const x1 = rng.int(-5, 5);
      let x2 = rng.int(-5, 5);
      while (x2 === x1) x2 = rng.int(-5, 5);
      const m = rng.int(-4, 4);
      const b = rng.int(-6, 6);
      const y1 = m * x1 + b;
      const y2 = m * x2 + b;
      return {
        prompt: `A line passes through (${x1}, ${y1}) and (${x2}, ${y2}). What is its slope?`,
        kind: "numeric",
        answer: { kind: "numeric", value: m, tolerance: 0.01 },
        explanation: `Slope = (y₂ − y₁) / (x₂ − x₁) = (${y2} − ${y1}) / (${x2} − ${x1}) = ${m}.`,
      };
    },
  },
  {
    id: "graph-y-intercept",
    conceptId: "functions-and-graphs",
    difficulty: "core",
    generate: (rng) => {
      const m = rng.int(-4, 4);
      const b = rng.int(-9, 9);
      return {
        prompt: `What is the y-intercept of y = ${m}x ${b >= 0 ? "+ " + b : "− " + Math.abs(b)}?`,
        kind: "numeric",
        answer: { kind: "numeric", value: b, tolerance: 0 },
        explanation: `In slope-intercept form y = mx + b, b is the y-intercept. Here b = ${b}.`,
      };
    },
  },
  {
    id: "graph-evaluate-function",
    conceptId: "functions-and-graphs",
    difficulty: "core",
    generate: (rng) => {
      const m = rng.int(-4, 4);
      const b = rng.int(-7, 7);
      const x = rng.int(-5, 5);
      return {
        prompt: `If f(x) = ${m}x ${b >= 0 ? "+ " + b : "− " + Math.abs(b)}, compute f(${x}).`,
        kind: "numeric",
        answer: { kind: "numeric", value: m * x + b, tolerance: 0 },
        explanation: `f(${x}) = ${m}·${x} + ${b} = ${m * x + b}.`,
      };
    },
  },
  {
    id: "graph-slope-meaning",
    conceptId: "functions-and-graphs",
    difficulty: "applied",
    generate: (rng) => {
      const cases = [
        {
          q: "A battery's voltage drops linearly during use. On a plot of voltage vs. time, what does the slope represent?",
          choices: ["Average voltage", "Rate of voltage drop (V/s)", "Total charge", "Time to empty"],
          correctIndex: 1,
        },
        {
          q: "On a position-vs-time plot for a rover, what does the slope represent?",
          choices: ["Acceleration", "Velocity", "Distance traveled", "Time elapsed"],
          correctIndex: 1,
        },
        {
          q: "On a velocity-vs-time plot, what does the slope represent?",
          choices: ["Displacement", "Acceleration", "Speed", "Power"],
          correctIndex: 1,
        },
        {
          q: "On a current-vs-voltage plot for a resistor (I on y, V on x), what is the slope?",
          choices: ["Resistance R", "1/R (conductance)", "Power", "Voltage"],
          correctIndex: 1,
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: `Slope = (change in y) / (change in x). Reading the units of each axis tells you what that ratio represents physically: ${c.choices[c.correctIndex]}.`,
      };
    },
  },
  {
    id: "graph-x-intercept",
    conceptId: "functions-and-graphs",
    difficulty: "applied",
    generate: (rng) => {
      const m = rng.pick([-4, -3, -2, 2, 3, 4]);
      const root = rng.int(-5, 5);
      const b = -m * root;
      return {
        prompt: `What is the x-intercept of y = ${m}x ${b >= 0 ? "+ " + b : "− " + Math.abs(b)}?`,
        kind: "numeric",
        answer: { kind: "numeric", value: root, tolerance: 0.001 },
        explanation: `Set y = 0: ${m}x + ${b} = 0 → x = ${root}.`,
      };
    },
  },
  {
    id: "graph-parallel-perpendicular",
    conceptId: "functions-and-graphs",
    difficulty: "challenge",
    generate: (rng) => {
      const m = rng.pick([1, 2, 3, -2, -3, 1 / 2]);
      const mode = rng.pick(["parallel", "perpendicular"]);
      const target = mode === "parallel" ? m : -1 / m;
      const choices = rng.shuffle([target, -target, m, m + 1].map((n) => `${n}`));
      const correctIndex = choices.indexOf(`${target}`);
      return {
        prompt: `A line has slope ${m}. What slope does a ${mode} line have?`,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices, correctIndex },
        explanation:
          mode === "parallel"
            ? `Parallel lines have equal slopes, so ${m}.`
            : `Perpendicular slopes are negative reciprocals: −1/(${m}) = ${target}.`,
      };
    },
  },
];

const modelingTemplates: QuestionTemplate[] = [
  {
    id: "model-linear-cost",
    conceptId: "algebraic-modeling",
    difficulty: "core",
    generate: (rng) => {
      const fixed = rng.int(5, 25);
      const perUnit = rng.int(2, 9);
      const units = rng.int(3, 20);
      const cost = fixed + perUnit * units;
      return {
        prompt: `Renting a tool costs $${fixed} flat plus $${perUnit} per hour. What's the cost for ${units} hours?`,
        kind: "numeric",
        answer: { kind: "numeric", value: cost, tolerance: 0.01 },
        explanation: `Cost = ${fixed} + ${perUnit} × ${units} = ${cost}.`,
      };
    },
  },
  {
    id: "model-translate-word-problem",
    conceptId: "algebraic-modeling",
    difficulty: "applied",
    generate: (rng) => {
      const cases = [
        {
          q: "A robot's battery starts at 100% and drops 2% per minute of use. Which equation models the percent P after t minutes?",
          choices: ["P = 100 + 2t", "P = 100 − 2t", "P = 2 − 100t", "P = 100·2t"],
          correctIndex: 1,
        },
        {
          q: "A motor's speed is 1500 RPM minus 12 RPM per Newton of load. Which equation gives RPM s in terms of load L?",
          choices: ["s = 1500 + 12L", "s = 1500 − 12L", "s = 12 − 1500L", "s = 12L − 1500"],
          correctIndex: 1,
        },
        {
          q: "A sensor reads voltage V proportional to temperature T: V = 0.01·T + 0.5. What does the 0.5 represent?",
          choices: [
            "The slope (sensitivity)",
            "The temperature at 0 V",
            "The voltage at 0 °C (offset)",
            "The full-scale range",
          ],
          correctIndex: 2,
        },
        {
          q: "A drone climbs at 4 m/s and starts at 12 m altitude. Which equation gives altitude h at time t?",
          choices: ["h = 12 + 4t", "h = 4 + 12t", "h = 12 − 4t", "h = 4t / 12"],
          correctIndex: 0,
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: `Translate words to math: identify the starting value, the rate of change, and what depends on what. Correct: ${c.choices[c.correctIndex]}.`,
      };
    },
  },
  {
    id: "model-mixture",
    conceptId: "algebraic-modeling",
    difficulty: "applied",
    generate: (rng) => {
      const v1 = rng.int(2, 8);
      const v2 = rng.int(2, 8);
      const c1 = rng.pick([10, 20, 30]);
      const c2 = rng.pick([40, 50, 60]);
      const total = v1 + v2;
      const finalC = round((v1 * c1 + v2 * c2) / total, 2);
      return {
        prompt: `Mix ${v1} L at ${c1}% concentration with ${v2} L at ${c2}%. What is the final concentration? Round to 2 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: finalC, unit: "%", tolerance: 0.15 },
        explanation: `Total solute = ${v1}·${c1}% + ${v2}·${c2}% = ${(v1 * c1 + v2 * c2).toFixed(2)} L·%; divide by total volume ${total} L → ${finalC}%.`,
      };
    },
  },
  {
    id: "model-percent-change",
    conceptId: "algebraic-modeling",
    difficulty: "applied",
    generate: (rng) => {
      const initial = rng.int(40, 200);
      const pct = rng.pick([10, 15, 20, 25, 30, 50]);
      const sign = rng.pick([1, -1]);
      const final = round(initial * (1 + (sign * pct) / 100), 2);
      return {
        prompt: `A measurement of ${initial} ${sign > 0 ? "increases" : "decreases"} by ${pct}%. What is the new value?`,
        kind: "numeric",
        answer: { kind: "numeric", value: final, tolerance: 0.05 },
        explanation: `New = ${initial} × (1 ${sign > 0 ? "+" : "−"} ${pct / 100}) = ${final}.`,
      };
    },
  },
  {
    id: "model-rate-time-work",
    conceptId: "algebraic-modeling",
    difficulty: "challenge",
    generate: (rng) => {
      const tA = rng.int(2, 8);
      const tB = rng.int(3, 12);
      const combined = round((tA * tB) / (tA + tB), 2);
      return {
        prompt: `Machine A alone finishes a batch in ${tA} hours; machine B alone takes ${tB} hours. Working together (parallel), how long do they take? Round to 2 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: combined, unit: "h", tolerance: 0.05 },
        explanation: `Combined rate = 1/${tA} + 1/${tB} = ${(1 / tA + 1 / tB).toFixed(4)}. Time = 1 / (combined rate) = ${combined} h.`,
      };
    },
  },
];

const linearSystemsTemplates: QuestionTemplate[] = [
  {
    id: "system-substitution",
    conceptId: "linear-systems",
    difficulty: "core",
    generate: (rng) => {
      const x = rng.int(-5, 5);
      const y = rng.int(-5, 5);
      const a = rng.int(1, 4);
      const b = rng.int(1, 4);
      const c = rng.int(1, 4);
      const d = rng.int(1, 4);
      const e = a * x + b * y;
      const f = c * x + d * y;
      const determinant = a * d - b * c;
      if (determinant === 0) {
        return {
          prompt: `Solve the system: ${a}x + ${b}y = ${e}; ${a + 1}x + ${b}y = ${e + (a + 1) * 0 - a * 0}. Give x.`,
          kind: "numeric",
          answer: { kind: "numeric", value: x, tolerance: 0.001 },
          explanation: `Eliminating gives x = ${x}.`,
        };
      }
      return {
        prompt: `Solve the system for x: ${a}x + ${b}y = ${e}; ${c}x + ${d}y = ${f}.`,
        kind: "numeric",
        answer: { kind: "numeric", value: x, tolerance: 0.001 },
        explanation: `Using elimination: x = (${d}·${e} − ${b}·${f}) / (${a}·${d} − ${b}·${c}) = ${x}.`,
      };
    },
  },
  {
    id: "system-intersection",
    conceptId: "linear-systems",
    difficulty: "applied",
    generate: (rng) => {
      const m1 = rng.int(-3, 3) || 2;
      let m2 = rng.int(-3, 3) || -2;
      while (m2 === m1) m2 = rng.int(-3, 3) || -2;
      const xMeet = rng.int(-4, 4);
      const yMeet = m1 * xMeet + 0;
      const b1 = yMeet - m1 * xMeet;
      const b2 = yMeet - m2 * xMeet;
      return {
        prompt: `Two lines: y = ${m1}x ${b1 >= 0 ? "+ " + b1 : "− " + Math.abs(b1)} and y = ${m2}x ${b2 >= 0 ? "+ " + b2 : "− " + Math.abs(b2)}. At what x do they intersect?`,
        kind: "numeric",
        answer: { kind: "numeric", value: xMeet, tolerance: 0.01 },
        explanation: `Set equal: ${m1}x + ${b1} = ${m2}x + ${b2} → (${m1 - m2})x = ${b2 - b1} → x = ${xMeet}.`,
      };
    },
  },
  {
    id: "system-applied-resistors",
    conceptId: "linear-systems",
    difficulty: "challenge",
    generate: (rng) => {
      const cases = [
        {
          q: "Two cables: cable A loses 0.2 V per meter, cable B loses 0.3 V per meter. A 6 m run of A and a 4 m run of B together drop 2.4 V. Wait — what does the constraint 0.2·6 + 0.3·4 verify?",
          choices: [
            "Total voltage drop sums",
            "Total current adds",
            "Resistances multiply",
            "Power is constant",
          ],
          correctIndex: 0,
        },
        {
          q: "When solving a 2-equation linear system, the system has NO solution when:",
          choices: [
            "The lines have the same slope but different intercepts",
            "The lines have different slopes",
            "Both equations are identical",
            "The constants are zero",
          ],
          correctIndex: 0,
        },
        {
          q: "When solving a 2-equation linear system, the system has INFINITELY many solutions when:",
          choices: [
            "The lines have different slopes",
            "The two equations describe the same line",
            "The lines are perpendicular",
            "The lines never meet",
          ],
          correctIndex: 1,
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: `${c.choices[c.correctIndex]}.`,
      };
    },
  },
  {
    id: "system-applied-y",
    conceptId: "linear-systems",
    difficulty: "applied",
    generate: (rng) => {
      const x = rng.int(-4, 4);
      const y = rng.int(-4, 4);
      const a = rng.pick([1, 2, 3]);
      const b = rng.pick([1, 2, 3]);
      const c = rng.pick([1, 2, 3]);
      const d = rng.pick([1, 2, 3]);
      const det = a * d - b * c;
      if (det === 0) {
        return {
          prompt: `What does the determinant a·d − b·c equal for a 2×2 system [[a, b], [c, d]] with a = ${a}, b = ${b}, c = ${c}, d = ${d}?`,
          kind: "numeric",
          answer: { kind: "numeric", value: 0, tolerance: 0 },
          explanation: `a·d − b·c = ${a * d} − ${b * c} = 0. (A zero determinant means the system is singular: no unique solution.)`,
        };
      }
      const e = a * x + b * y;
      const f = c * x + d * y;
      return {
        prompt: `Solve the system for y: ${a}x + ${b}y = ${e}; ${c}x + ${d}y = ${f}.`,
        kind: "numeric",
        answer: { kind: "numeric", value: y, tolerance: 0.001 },
        explanation: `Elimination: y = (${a}·${f} − ${c}·${e}) / (${a * d - b * c}) = ${y}.`,
      };
    },
  },
];

const inequalitiesTemplates: QuestionTemplate[] = [
  {
    id: "ineq-one-step",
    conceptId: "inequalities-and-constraints",
    difficulty: "core",
    generate: (rng) => {
      const a = rng.int(2, 8);
      const b = rng.int(-20, 20);
      const x = rng.int(-5, 5);
      const c = a * x + b;
      const op = rng.pick(["≥", "≤"]);
      return {
        prompt: `Solve for x: ${a}x ${b >= 0 ? "+ " + b : "− " + Math.abs(b)} ${op} ${c}. Give the boundary value of x.`,
        kind: "numeric",
        answer: { kind: "numeric", value: x, tolerance: 0 },
        explanation: `Treat ${op} like = to find the boundary: ${a}x = ${c - b} → x = ${x}. The solution set is x ${op} ${x}.`,
      };
    },
  },
  {
    id: "ineq-sign-flip",
    conceptId: "inequalities-and-constraints",
    difficulty: "applied",
    generate: () => ({
      prompt: "When you multiply both sides of an inequality by a NEGATIVE number, what happens?",
      kind: "multiple-choice",
      answer: {
        kind: "multiple-choice",
        choices: [
          "Nothing — the inequality is unchanged",
          "The inequality symbol flips direction",
          "Both sides become negative; the symbol stays",
          "The solution becomes the empty set",
        ],
        correctIndex: 1,
      },
      explanation: "Negative multiplication reverses ordering: if a < b, then −a > −b. Always flip the symbol.",
    }),
  },
  {
    id: "ineq-power-budget",
    conceptId: "inequalities-and-constraints",
    difficulty: "applied",
    generate: (rng) => {
      const cap = rng.pick([1000, 1500, 2000, 5000]);
      const fixed = rng.int(100, 400);
      const perUnit = rng.pick([10, 20, 50, 100]);
      const maxUnits = Math.floor((cap - fixed) / perUnit);
      return {
        prompt: `A power budget allows up to ${cap} mW. A base system draws ${fixed} mW, and each added sensor draws ${perUnit} mW. What is the maximum number of sensors you can add?`,
        kind: "numeric",
        answer: { kind: "numeric", value: maxUnits, tolerance: 0 },
        explanation: `${fixed} + ${perUnit}n ≤ ${cap} → n ≤ ${(cap - fixed) / perUnit} → max n = ${maxUnits}.`,
      };
    },
  },
  {
    id: "ineq-temperature-range",
    conceptId: "inequalities-and-constraints",
    difficulty: "challenge",
    generate: (rng) => {
      const lo = rng.int(-10, 5);
      const hi = lo + rng.int(15, 40);
      const inside = rng.int(lo + 1, hi - 1);
      const below = lo - rng.int(2, 10);
      const above = hi + rng.int(2, 10);
      const choices = rng.shuffle([`${inside}°C`, `${below}°C`, `${above}°C`, `${lo - 1}°C`]);
      const correctIndex = choices.indexOf(`${inside}°C`);
      return {
        prompt: `A sensor operates correctly only between ${lo}°C and ${hi}°C inclusive. Which temperature is within range?`,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices, correctIndex },
        explanation: `Acceptable values satisfy ${lo} ≤ T ≤ ${hi}. The only choice inside this range is ${inside}°C.`,
      };
    },
  },
];

const concepts = [
  {
    id: "linear-equations",
    title: "Linear Equations",
    description: "Isolate variables, rearrange physics/engineering formulas, solve multi-step equations.",
  },
  {
    id: "dimensional-analysis",
    title: "Dimensional Analysis",
    description: "Use units as a debugging tool; convert compound units; verify formulas.",
  },
  {
    id: "functions-and-graphs",
    title: "Functions and Graphs",
    description: "Read slope and intercept from data, evaluate functions, interpret line equations as physical models.",
  },
  {
    id: "algebraic-modeling",
    title: "Algebraic Modeling",
    description: "Translate word problems into equations; identify starting values, rates, and constraints.",
  },
  {
    id: "linear-systems",
    title: "Linear Systems",
    description: "Solve 2×2 systems by substitution/elimination; understand singular vs unique solutions.",
  },
  {
    id: "inequalities-and-constraints",
    title: "Inequalities and Constraints",
    description: "Model physical bounds, budgets, and operating ranges with linear inequalities.",
  },
];

export const engineeringAlgebraGeometryExam: ModuleExamConfig = {
  moduleSlug: "equations-units-and-graphs",
  title: "Engineering Algebra and Geometry — Module Exam",
  description:
    "A 50-question exam covering linear equations, dimensional analysis, functions and graphs, algebraic modeling, 2×2 systems, and inequalities. Pass at 95% or higher to clear this module. Numbers are randomized each attempt.",
  totalQuestions: 50,
  passThreshold: 95,
  concepts,
  conceptWeights: {
    "linear-equations": 10,
    "dimensional-analysis": 8,
    "functions-and-graphs": 10,
    "algebraic-modeling": 8,
    "linear-systems": 8,
    "inequalities-and-constraints": 6,
  },
  templates: [
    ...linearEquationTemplates,
    ...dimensionalAnalysisTemplates,
    ...functionsAndGraphsTemplates,
    ...modelingTemplates,
    ...linearSystemsTemplates,
    ...inequalitiesTemplates,
  ],
};
