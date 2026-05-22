import type { ModuleExamConfig, QuestionTemplate } from "../../src/lib/exam/types.ts";

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

function simplifyFraction(num: number, den: number): [number, number] {
  const g = gcd(num, den);
  return [num / g, den / g];
}

function fmtFraction(num: number, den: number): string {
  const [n, d] = simplifyFraction(num, den);
  if (d === 1) return `${n}`;
  return `${n}/${d}`;
}

const arithmeticTemplates: QuestionTemplate[] = [
  {
    id: "arith-add-3-digit",
    conceptId: "arithmetic-and-estimation",
    difficulty: "core",
    generate: (rng) => {
      const a = rng.int(120, 980);
      const b = rng.int(120, 980);
      return {
        prompt: `Compute ${a} + ${b}.`,
        kind: "numeric",
        answer: { kind: "numeric", value: a + b, tolerance: 0 },
        explanation: `${a} + ${b} = ${a + b}.`,
      };
    },
  },
  {
    id: "arith-multiply",
    conceptId: "arithmetic-and-estimation",
    difficulty: "core",
    generate: (rng) => {
      const a = rng.int(12, 49);
      const b = rng.int(12, 49);
      return {
        prompt: `Compute ${a} × ${b}.`,
        kind: "numeric",
        answer: { kind: "numeric", value: a * b, tolerance: 0 },
        explanation: `${a} × ${b} = ${a * b}.`,
      };
    },
  },
  {
    id: "arith-divide-clean",
    conceptId: "arithmetic-and-estimation",
    difficulty: "core",
    generate: (rng) => {
      const b = rng.int(3, 12);
      const q = rng.int(7, 40);
      const a = b * q;
      return {
        prompt: `Compute ${a} ÷ ${b}.`,
        kind: "numeric",
        answer: { kind: "numeric", value: q, tolerance: 0 },
        explanation: `${a} ÷ ${b} = ${q} since ${b} × ${q} = ${a}.`,
      };
    },
  },
  {
    id: "arith-estimation-product",
    conceptId: "arithmetic-and-estimation",
    difficulty: "applied",
    generate: (rng) => {
      const a = rng.int(38, 49);
      const b = rng.int(38, 49);
      const exact = a * b;
      const buckets = [Math.round(exact / 100) * 100, exact, exact + 250, exact - 250];
      const shuffled = rng.shuffle(buckets);
      const correctIndex = shuffled.indexOf(Math.round(exact / 100) * 100);
      return {
        prompt: `Which value is the best round-number estimate of ${a} × ${b} for quick mental sanity-checking?`,
        kind: "multiple-choice",
        answer: {
          kind: "multiple-choice",
          choices: shuffled.map((n) => `${n}`),
          correctIndex,
        },
        explanation: `Round ${a} to 40 and ${b} to 40: 40 × 40 = 1600. The closest rounded estimate is ${Math.round(exact / 100) * 100}. Always check that your exact answer (${exact}) lands near the estimate.`,
      };
    },
  },
  {
    id: "arith-sci-notation-small",
    conceptId: "arithmetic-and-estimation",
    difficulty: "applied",
    generate: (rng) => {
      const mantissa = rng.int(12, 98) / 10;
      const exp = -rng.int(2, 6);
      const decimal = mantissa * Math.pow(10, exp);
      return {
        prompt: `Write ${decimal.toPrecision(3)} in scientific notation (form a × 10^n with 1 ≤ a < 10).`,
        kind: "text",
        answer: {
          kind: "text",
          acceptedAnswers: [
            `${mantissa} x 10^${exp}`,
            `${mantissa}x10^${exp}`,
            `${mantissa}*10^${exp}`,
            `${mantissa}e${exp}`,
          ],
        },
        explanation: `Move the decimal until exactly one nonzero digit sits before it. That gives ${mantissa} × 10^${exp}.`,
      };
    },
  },
  {
    id: "arith-reasonableness",
    conceptId: "arithmetic-and-estimation",
    difficulty: "challenge",
    generate: (rng) => {
      const correct = rng.pick([
        "A 6V battery in a 10Ω circuit producing 600 A.",
        "A drone covering 5 km in 0.5 s.",
        "A microcontroller drawing 50 A from a USB port.",
        "A motor spinning at 5,000,000 RPM in a hobby kit.",
      ]);
      const others = [
        "A 12V battery powering a 24Ω load.",
        "A drone flying 5 km in 6 minutes.",
        "A microcontroller drawing 80 mA over USB.",
        "A motor spinning at 6,000 RPM in a hobby kit.",
      ];
      const shuffled = rng.shuffle([correct, ...others.slice(0, 3)]);
      return {
        prompt: "Which statement fails a reasonableness check (numbers far outside physical norms)?",
        kind: "multiple-choice",
        answer: {
          kind: "multiple-choice",
          choices: shuffled,
          correctIndex: shuffled.indexOf(correct),
        },
        explanation: `Reasonableness checks compare a calculated value to what physics allows. ${correct} fails immediately.`,
      };
    },
  },
];

const unitTemplates: QuestionTemplate[] = [
  {
    id: "units-min-to-hr",
    conceptId: "units-and-conversion",
    difficulty: "core",
    generate: (rng) => {
      const min = rng.int(15, 300);
      return {
        prompt: `Convert ${min} minutes to hours.`,
        kind: "numeric",
        answer: { kind: "numeric", value: min / 60, unit: "h", tolerance: 0.0005 },
        explanation: `${min} min ÷ 60 min/h = ${(min / 60).toFixed(4)} h.`,
      };
    },
  },
  {
    id: "units-ma-to-a",
    conceptId: "units-and-conversion",
    difficulty: "core",
    generate: (rng) => {
      const ma = rng.int(15, 950);
      return {
        prompt: `Convert ${ma} mA to amps.`,
        kind: "numeric",
        answer: { kind: "numeric", value: ma / 1000, unit: "A", tolerance: 1e-6 },
        explanation: `1 mA = 10^-3 A, so ${ma} mA = ${ma / 1000} A.`,
      };
    },
  },
  {
    id: "units-km-to-m",
    conceptId: "units-and-conversion",
    difficulty: "core",
    generate: (rng) => {
      const km = rng.int(2, 18) / 10;
      return {
        prompt: `Convert ${km} km to meters.`,
        kind: "numeric",
        answer: { kind: "numeric", value: km * 1000, unit: "m", tolerance: 1e-6 },
        explanation: `1 km = 1000 m, so ${km} km = ${km * 1000} m.`,
      };
    },
  },
  {
    id: "units-speed-time-distance",
    conceptId: "units-and-conversion",
    difficulty: "applied",
    generate: (rng) => {
      const v = rng.int(3, 18) / 10;
      const t = rng.int(5, 60);
      return {
        prompt: `A rover travels at ${v} m/s for ${t} s. How far does it travel?`,
        kind: "numeric",
        answer: { kind: "numeric", value: v * t, unit: "m", tolerance: 0.001 },
        explanation: `Distance = speed × time = ${v} m/s × ${t} s = ${(v * t).toFixed(2)} m. Units multiply: (m/s) × s = m.`,
      };
    },
  },
  {
    id: "units-kmh-to-ms",
    conceptId: "units-and-conversion",
    difficulty: "applied",
    generate: (rng) => {
      const kmh = rng.int(10, 120);
      return {
        prompt: `Convert ${kmh} km/h to m/s. Round to 2 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: Math.round((kmh / 3.6) * 100) / 100, unit: "m/s", tolerance: 0.02 },
        explanation: `1 km/h = 1000 m / 3600 s = 1/3.6 m/s. So ${kmh} km/h ÷ 3.6 ≈ ${(kmh / 3.6).toFixed(2)} m/s.`,
      };
    },
  },
  {
    id: "units-dimension-check",
    conceptId: "units-and-conversion",
    difficulty: "challenge",
    generate: (rng) => {
      const choices = [
        "kg · m/s² (force)",
        "kg · m²/s² (energy)",
        "kg · m/s (momentum)",
        "kg / s (mass flow rate)",
      ];
      const idx = rng.int(0, choices.length - 1);
      const correct = idx;
      const equivalents = ["N", "J", "kg·m/s", "kg/s"];
      const targetName = ["force", "energy", "momentum", "mass flow rate"][idx];
      return {
        prompt: `Which combination of base SI units has dimensions of ${targetName}?`,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices, correctIndex: correct },
        explanation: `${targetName} has units ${choices[idx]}, equivalent to ${equivalents[idx]}.`,
      };
    },
  },
  {
    id: "units-power-formula",
    conceptId: "units-and-conversion",
    difficulty: "applied",
    generate: (rng) => {
      const v = rng.int(3, 24);
      const i = rng.int(1, 9) / 10;
      return {
        prompt: `A device runs at ${v} V and draws ${i} A. What is the power in watts?`,
        kind: "numeric",
        answer: { kind: "numeric", value: Math.round(v * i * 100) / 100, unit: "W", tolerance: 0.02 },
        explanation: `P = V × I = ${v} V × ${i} A = ${(v * i).toFixed(2)} W. Units: V × A = W.`,
      };
    },
  },
];

const fractionsTemplates: QuestionTemplate[] = [
  {
    id: "frac-simplify",
    conceptId: "fractions-and-ratios",
    difficulty: "core",
    generate: (rng) => {
      const factor = rng.int(2, 9);
      const a = rng.int(2, 7);
      const b = rng.int(a + 1, a + 9);
      const num = a * factor;
      const den = b * factor;
      const simplified = fmtFraction(num, den);
      return {
        prompt: `Simplify ${num}/${den} to lowest terms.`,
        kind: "text",
        answer: { kind: "text", acceptedAnswers: [simplified, simplified.replace("/", " / ")] },
        explanation: `Divide top and bottom by ${factor}: ${num}/${den} = ${simplified}.`,
      };
    },
  },
  {
    id: "frac-unit-rate",
    conceptId: "fractions-and-ratios",
    difficulty: "core",
    generate: (rng) => {
      const t = rng.int(2, 8);
      const v = rng.int(2, 12);
      const d = v * t;
      return {
        prompt: `A robot travels ${d} m in ${t} s. What is its unit rate?`,
        kind: "numeric",
        answer: { kind: "numeric", value: v, unit: "m/s", tolerance: 0.001 },
        explanation: `Unit rate = ${d} m ÷ ${t} s = ${v} m/s.`,
      };
    },
  },
  {
    id: "frac-gear-reduction",
    conceptId: "fractions-and-ratios",
    difficulty: "applied",
    generate: (rng) => {
      const ratio = rng.pick([4, 5, 6, 8, 10]);
      const rpmIn = rng.int(8, 30) * 100;
      return {
        prompt: `A motor spins at ${rpmIn} RPM through a ${ratio}:1 reduction. What is output RPM?`,
        kind: "numeric",
        answer: { kind: "numeric", value: rpmIn / ratio, unit: "RPM", tolerance: 0.001 },
        explanation: `Reduction divides input by the ratio: ${rpmIn} / ${ratio} = ${rpmIn / ratio} RPM.`,
      };
    },
  },
  {
    id: "frac-map-scale",
    conceptId: "fractions-and-ratios",
    difficulty: "applied",
    generate: (rng) => {
      const scale = rng.pick([2, 2.5, 5, 10, 25]);
      const cm = rng.int(4, 18);
      return {
        prompt: `A map scale is 1 cm = ${scale} m. A line on the map is ${cm} cm. What real distance does it represent?`,
        kind: "numeric",
        answer: { kind: "numeric", value: cm * scale, unit: "m", tolerance: 0.001 },
        explanation: `${cm} cm × ${scale} m/cm = ${cm * scale} m.`,
      };
    },
  },
  {
    id: "frac-part-of-whole",
    conceptId: "fractions-and-ratios",
    difficulty: "core",
    generate: (rng) => {
      const total = rng.pick([8, 10, 12, 16, 20]);
      const part = rng.int(1, total - 1);
      const [n, d] = simplifyFraction(part, total);
      return {
        prompt: `A kit has ${part} working sensors out of ${total}. What fraction of the kit's sensors work? Give lowest terms.`,
        kind: "text",
        answer: {
          kind: "text",
          acceptedAnswers: [
            `${n}/${d}`,
            `${n} / ${d}`,
            `${(part / total).toFixed(3).replace(/\.?0+$/, "")}`,
          ],
        },
        explanation: `${part}/${total} reduces to ${n}/${d} (divide top and bottom by gcd).`,
      };
    },
  },
  {
    id: "frac-percent-conversion",
    conceptId: "fractions-and-ratios",
    difficulty: "applied",
    generate: (rng) => {
      const num = rng.int(1, 9);
      const den = rng.pick([4, 5, 8, 10, 20, 25]);
      const pct = (num / den) * 100;
      return {
        prompt: `Express ${num}/${den} as a percent.`,
        kind: "numeric",
        answer: { kind: "numeric", value: pct, unit: "%", tolerance: 0.05 },
        explanation: `${num}/${den} = ${(num / den).toFixed(4)} = ${pct}%.`,
      };
    },
  },
  {
    id: "frac-proportional-scaling",
    conceptId: "fractions-and-ratios",
    difficulty: "challenge",
    generate: (rng) => {
      const a1 = rng.int(2, 9);
      const b1 = rng.int(3, 12);
      const k = rng.int(2, 6);
      const a2 = a1 * k;
      const b2 = b1 * k;
      const wrongB = b2 + rng.pick([-3, -2, 2, 3]);
      const choices = rng.shuffle([
        `${a2} : ${b2}`,
        `${a2} : ${wrongB}`,
        `${a2 + 1} : ${b2}`,
        `${a1} : ${b2}`,
      ]);
      const correctIndex = choices.indexOf(`${a2} : ${b2}`);
      return {
        prompt: `If the ratio ${a1}:${b1} is scaled so the first quantity becomes ${a2}, which is the matching ratio?`,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices, correctIndex },
        explanation: `Multiply both sides by ${k}: ${a1}:${b1} → ${a2}:${b2}. A ratio scales both sides by the same factor.`,
      };
    },
  },
];

const signedNumbersTemplates: QuestionTemplate[] = [
  {
    id: "signed-add",
    conceptId: "signed-numbers-and-order-of-operations",
    difficulty: "core",
    generate: (rng) => {
      const a = rng.int(-30, -3);
      const b = rng.int(2, 25);
      return {
        prompt: `Compute ${a} + ${b}.`,
        kind: "numeric",
        answer: { kind: "numeric", value: a + b, tolerance: 0 },
        explanation: `On the number line, start at ${a} and move right by ${b}: result ${a + b}.`,
      };
    },
  },
  {
    id: "signed-subtract-negative",
    conceptId: "signed-numbers-and-order-of-operations",
    difficulty: "core",
    generate: (rng) => {
      const a = rng.int(-15, 15);
      const b = rng.int(-15, -1);
      return {
        prompt: `Compute ${a} - (${b}).`,
        kind: "numeric",
        answer: { kind: "numeric", value: a - b, tolerance: 0 },
        explanation: `Subtracting a negative adds its opposite: ${a} - (${b}) = ${a} + ${-b} = ${a - b}.`,
      };
    },
  },
  {
    id: "signed-multiply",
    conceptId: "signed-numbers-and-order-of-operations",
    difficulty: "core",
    generate: (rng) => {
      const a = rng.int(-12, -2);
      const b = rng.int(-12, 12);
      return {
        prompt: `Compute ${a} × ${b}.`,
        kind: "numeric",
        answer: { kind: "numeric", value: a * b, tolerance: 0 },
        explanation: `Negative × ${b >= 0 ? "positive" : "negative"} = ${a * b >= 0 ? "positive" : "negative"}: ${a} × ${b} = ${a * b}.`,
      };
    },
  },
  {
    id: "signed-abs",
    conceptId: "signed-numbers-and-order-of-operations",
    difficulty: "core",
    generate: (rng) => {
      const x = rng.int(-50, -1);
      return {
        prompt: `What is |${x}|?`,
        kind: "numeric",
        answer: { kind: "numeric", value: Math.abs(x), tolerance: 0 },
        explanation: `Absolute value is distance from zero, which is never negative: |${x}| = ${Math.abs(x)}.`,
      };
    },
  },
  {
    id: "signed-neg-exponent-no-paren",
    conceptId: "signed-numbers-and-order-of-operations",
    difficulty: "challenge",
    generate: (rng) => {
      const n = rng.pick([3, 4, 5, 6]);
      return {
        prompt: `Evaluate -${n}^2 (note: no parentheses on the base).`,
        kind: "numeric",
        answer: { kind: "numeric", value: -(n * n), tolerance: 0 },
        explanation: `Without parentheses the exponent binds tighter than the negation: -${n}^2 = -(${n}^2) = ${-(n * n)}. Compare with (-${n})^2 = ${n * n}.`,
      };
    },
  },
  {
    id: "signed-pemdas",
    conceptId: "signed-numbers-and-order-of-operations",
    difficulty: "applied",
    generate: (rng) => {
      const a = rng.int(2, 9);
      const b = rng.int(2, 6);
      const c = rng.int(2, 5);
      const d = rng.int(2, 4);
      const expr = `${a} + ${b} × ${c}^${d}`;
      return {
        prompt: `Evaluate ${expr}.`,
        kind: "numeric",
        answer: { kind: "numeric", value: a + b * Math.pow(c, d), tolerance: 0 },
        explanation: `Exponents first: ${c}^${d} = ${Math.pow(c, d)}. Then multiplication: ${b} × ${Math.pow(c, d)} = ${b * Math.pow(c, d)}. Finally addition: ${a} + ${b * Math.pow(c, d)} = ${a + b * Math.pow(c, d)}.`,
      };
    },
  },
  {
    id: "signed-distance-vs-displacement",
    conceptId: "signed-numbers-and-order-of-operations",
    difficulty: "applied",
    generate: () => {
      return {
        prompt: "Which can be negative: distance or displacement?",
        kind: "multiple-choice",
        answer: {
          kind: "multiple-choice",
          choices: ["Distance", "Displacement", "Both", "Neither"],
          correctIndex: 1,
        },
        explanation:
          "Distance is total path length and is never negative. Displacement is change in position and carries a sign that says which way.",
      };
    },
  },
  {
    id: "signed-temperature-change",
    conceptId: "signed-numbers-and-order-of-operations",
    difficulty: "applied",
    generate: (rng) => {
      const t0 = rng.int(-15, 5);
      const t1 = rng.int(8, 25);
      return {
        prompt: `Temperature changes from ${t0}°C to ${t1}°C. What is the signed change ΔT?`,
        kind: "numeric",
        answer: { kind: "numeric", value: t1 - t0, tolerance: 0 },
        explanation: `Change = final − initial = ${t1} − (${t0}) = ${t1 - t0}°C. Sign tells you direction.`,
      };
    },
  },
];

const estimationTemplates: QuestionTemplate[] = [
  {
    id: "est-fermi-battery",
    conceptId: "engineering-estimation",
    difficulty: "challenge",
    generate: (rng) => {
      const capacity = rng.pick([1000, 1500, 2200, 3000, 5000]);
      const draw = rng.pick([100, 250, 500]);
      const hours = capacity / draw;
      const choices = rng.shuffle([
        `${hours} h`,
        `${hours * 2} h`,
        `${hours / 2} h`,
        `${hours + 3} h`,
      ]);
      const correctIndex = choices.indexOf(`${hours} h`);
      return {
        prompt: `A ${capacity} mAh battery powers a device drawing ${draw} mA. About how long does it last?`,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices, correctIndex },
        explanation: `Hours ≈ capacity / draw = ${capacity} mAh / ${draw} mA = ${hours} h. (Real-world drain is slightly worse due to efficiency losses.)`,
      };
    },
  },
  {
    id: "est-order-of-magnitude",
    conceptId: "engineering-estimation",
    difficulty: "challenge",
    generate: (rng) => {
      const cases = [
        { label: "Mass of a paperclip (kg)", correct: "10^-3" },
        { label: "Length of a city block (m)", correct: "10^2" },
        { label: "Speed of sound in air (m/s)", correct: "10^2" },
        { label: "Voltage of a USB port (V)", correct: "10^0" },
        { label: "Current to light an LED (A)", correct: "10^-2" },
      ];
      const c = rng.pick(cases);
      const choices = rng.shuffle(["10^-3", "10^-1", "10^0", "10^2"]);
      const correctIndex = choices.indexOf(c.correct);
      if (correctIndex < 0) {
        const fallback = rng.shuffle([c.correct, "10^1", "10^-2", "10^3"]);
        return {
          prompt: `Pick the order of magnitude that best estimates: ${c.label}.`,
          kind: "multiple-choice",
          answer: {
            kind: "multiple-choice",
            choices: fallback,
            correctIndex: fallback.indexOf(c.correct),
          },
          explanation: `Best order-of-magnitude estimate: ${c.correct}.`,
        };
      }
      return {
        prompt: `Pick the order of magnitude that best estimates: ${c.label}.`,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices, correctIndex },
        explanation: `Best order-of-magnitude estimate: ${c.correct}.`,
      };
    },
  },
  {
    id: "est-rounding-error",
    conceptId: "engineering-estimation",
    difficulty: "applied",
    generate: (rng) => {
      const exact = rng.int(187, 943);
      const rounded = Math.round(exact / 10) * 10;
      const err = Math.abs(exact - rounded);
      const pct = Math.round((err / exact) * 1000) / 10;
      return {
        prompt: `A measurement is ${exact}. Rounded to the nearest 10 it becomes ${rounded}. What is the rounding error as a percent of the original? Round to 1 decimal.`,
        kind: "numeric",
        answer: { kind: "numeric", value: pct, unit: "%", tolerance: 0.15 },
        explanation: `Error = |${exact} − ${rounded}| = ${err}. As a percent of ${exact}: ${err}/${exact} ≈ ${pct}%.`,
      };
    },
  },
];

const conceptsTemplates: QuestionTemplate[] = [
  {
    id: "concept-quantity-parts",
    conceptId: "measurement-literacy",
    difficulty: "core",
    generate: () => ({
      prompt: "A measured quantity always has two parts. What are they?",
      kind: "multiple-choice",
      answer: {
        kind: "multiple-choice",
        choices: [
          "A value and a guess",
          "A number and a unit",
          "A symbol and a sign",
          "An estimate and a tolerance",
        ],
        correctIndex: 1,
      },
      explanation: "Every real measurement is a number paired with a unit. Without the unit, the number is meaningless.",
    }),
  },
  {
    id: "concept-sigfigs",
    conceptId: "measurement-literacy",
    difficulty: "applied",
    generate: (rng) => {
      const candidates = [
        { val: "0.00420", sf: 3 },
        { val: "1500", sf: 4 },
        { val: "1.50 × 10^3", sf: 3 },
        { val: "0.030", sf: 2 },
        { val: "200.0", sf: 4 },
      ];
      const c = rng.pick(candidates);
      const choices = rng.shuffle(["1", "2", "3", "4"]);
      const correctIndex = choices.indexOf(`${c.sf}`);
      return {
        prompt: `How many significant figures does ${c.val} have?`,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices, correctIndex },
        explanation: `Trailing zeros after a decimal are significant; leading zeros are placeholders. ${c.val} has ${c.sf} sig figs.`,
      };
    },
  },
  {
    id: "concept-tolerance",
    conceptId: "measurement-literacy",
    difficulty: "applied",
    generate: (rng) => {
      const r = rng.pick([100, 220, 470, 1000, 2200, 4700, 10000]);
      const tolPct = rng.pick([1, 5, 10]);
      const tolVal = (r * tolPct) / 100;
      const min = r - tolVal;
      const max = r + tolVal;
      return {
        prompt: `A ${r} Ω resistor has ±${tolPct}% tolerance. What is its acceptable resistance range?`,
        kind: "multiple-choice",
        answer: {
          kind: "multiple-choice",
          choices: [
            `${min} Ω to ${max} Ω`,
            `${r - tolPct} Ω to ${r + tolPct} Ω`,
            `0 Ω to ${r + tolVal} Ω`,
            `${tolVal} Ω to ${r} Ω`,
          ],
          correctIndex: 0,
        },
        explanation: `Tolerance ±${tolPct}% means ±${tolVal} Ω around the nominal ${r} Ω, so the range is ${min}–${max} Ω.`,
      };
    },
  },
  {
    id: "concept-which-bigger-sci",
    conceptId: "measurement-literacy",
    difficulty: "applied",
    generate: (rng) => {
      const m1 = rng.int(11, 89) / 10;
      const e1 = rng.int(-4, 4);
      const m2 = rng.int(11, 89) / 10;
      let e2 = rng.int(-4, 4);
      while (e2 === e1) e2 = rng.int(-4, 4);
      const v1 = m1 * Math.pow(10, e1);
      const v2 = m2 * Math.pow(10, e2);
      const choices = [`${m1} × 10^${e1}`, `${m2} × 10^${e2}`, "They are equal"];
      const correctIndex = v1 > v2 ? 0 : 1;
      return {
        prompt: `Which number is larger?`,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices, correctIndex },
        explanation: `Compare exponents first; if equal, compare mantissas. Here ${m1} × 10^${e1} = ${v1} and ${m2} × 10^${e2} = ${v2}.`,
      };
    },
  },
];

const concepts = [
  {
    id: "arithmetic-and-estimation",
    title: "Arithmetic and Estimation",
    description: "Compute reliably with whole numbers; sanity-check results.",
  },
  {
    id: "units-and-conversion",
    title: "Units and Conversion",
    description: "Carry units through calculations; convert between SI prefixes and compound units.",
  },
  {
    id: "fractions-and-ratios",
    title: "Fractions, Ratios, and Proportions",
    description: "Use ratio reasoning for scaling, gear ratios, maps, and percent.",
  },
  {
    id: "signed-numbers-and-order-of-operations",
    title: "Signed Numbers and Order of Operations",
    description: "Handle negation, parentheses, exponents, and operation order.",
  },
  {
    id: "engineering-estimation",
    title: "Engineering Estimation",
    description: "Order-of-magnitude reasoning and reasonableness checks.",
  },
  {
    id: "measurement-literacy",
    title: "Measurement Literacy",
    description: "Significant figures, tolerance, and reading numerical specifications.",
  },
];

export const mathReentryExam: ModuleExamConfig = {
  moduleSlug: "math-reentry-toolkit",
  title: "Math Re-entry Toolkit — Module Exam",
  description:
    "A 50-question exam covering arithmetic, units, fractions, signed numbers, estimation, and measurement literacy. Pass at 95% or higher to clear this module. Numbers are randomized each attempt.",
  totalQuestions: 50,
  passThreshold: 95,
  concepts,
  conceptWeights: {
    "arithmetic-and-estimation": 8,
    "units-and-conversion": 12,
    "fractions-and-ratios": 10,
    "signed-numbers-and-order-of-operations": 10,
    "engineering-estimation": 4,
    "measurement-literacy": 6,
  },
  templates: [
    ...arithmeticTemplates,
    ...unitTemplates,
    ...fractionsTemplates,
    ...signedNumbersTemplates,
    ...estimationTemplates,
    ...conceptsTemplates,
  ],
};
