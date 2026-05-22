import type { ModuleExamConfig, QuestionTemplate } from "../../src/lib/exam/types.ts";

function round(n: number, places = 2): number {
  const f = Math.pow(10, places);
  return Math.round(n * f) / f;
}

// Parallel resistance of two resistors (product over sum).
function parallelTwo(r1: number, r2: number): number {
  return (r1 * r2) / (r1 + r2);
}

const ohmsLawTemplates: QuestionTemplate[] = [
  {
    id: "ohms-find-current-mA",
    conceptId: "ohms-law",
    difficulty: "core",
    generate: (rng) => {
      const v = rng.int(3, 24);
      const r = rng.pick([100, 220, 470, 1000, 2200, 4700]);
      const i_mA = round((v / r) * 1000, 2);
      return {
        prompt: `A resistor of ${r} ohm has ${v} V across it. What is the current in milliamps (mA)? Round to 2 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: i_mA, unit: "mA", tolerance: 0.05 },
        explanation: `I = V / R = ${v} / ${r} = ${(v / r).toFixed(5)} A = ${i_mA} mA.`,
      };
    },
  },
  {
    id: "ohms-find-voltage",
    conceptId: "ohms-law",
    difficulty: "core",
    generate: (rng) => {
      const r = rng.pick([10, 47, 100, 220, 330, 470]);
      const i_mA = rng.pick([5, 10, 15, 20, 25, 30, 50]);
      const v = round((i_mA / 1000) * r, 2);
      return {
        prompt: `A current of ${i_mA} mA flows through a ${r} ohm resistor. What is the voltage across it in volts? Round to 2 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: v, unit: "V", tolerance: 0.05 },
        explanation: `V = I·R = (${i_mA} mA)·(${r} ohm) = ${(i_mA / 1000).toFixed(4)} A × ${r} ohm = ${v} V.`,
      };
    },
  },
  {
    id: "ohms-find-resistance",
    conceptId: "ohms-law",
    difficulty: "core",
    generate: (rng) => {
      const i_mA = rng.pick([5, 10, 20, 25, 40, 50, 100]);
      const r_target = rng.pick([100, 200, 250, 400, 500, 1000]);
      const v = round((i_mA / 1000) * r_target, 2);
      // Recompute R from the rounded V so the answer is exact.
      const r = round(v / (i_mA / 1000), 1);
      return {
        prompt: `A resistor drops ${v} V when ${i_mA} mA flows through it. What is its resistance in ohms? Round to 1 decimal.`,
        kind: "numeric",
        answer: { kind: "numeric", value: r, unit: "ohm", tolerance: 0.5 },
        explanation: `R = V / I = ${v} V / ${(i_mA / 1000).toFixed(4)} A = ${r} ohm.`,
      };
    },
  },
  {
    id: "ohms-qualitative-double",
    conceptId: "ohms-law",
    difficulty: "applied",
    generate: (rng) => {
      const cases = [
        {
          q: "In a simple V = IR circuit, if you double the voltage but keep the resistance the same, the current:",
          choices: ["halves", "stays the same", "doubles", "quadruples"],
          correctIndex: 2,
          why: "I = V/R. Doubling V (with R fixed) doubles I.",
        },
        {
          q: "In a simple V = IR circuit, if you double the resistance but keep the voltage the same, the current:",
          choices: ["doubles", "stays the same", "halves", "quadruples"],
          correctIndex: 2,
          why: "I = V/R. Doubling R (with V fixed) halves I.",
        },
        {
          q: "In a simple V = IR circuit, if you triple the voltage and triple the resistance, the current:",
          choices: ["triples", "stays the same", "is 1/3 of before", "is 1/9 of before"],
          correctIndex: 1,
          why: "I = V/R. (3V)/(3R) = V/R — current is unchanged.",
        },
        {
          q: "Through a fixed resistor, you measure 5 mA at 5 V. At 15 V (same resistor), the current will be about:",
          choices: ["5 mA", "10 mA", "15 mA", "45 mA"],
          correctIndex: 2,
          why: "R is fixed: tripling V triples I, so 5 mA → 15 mA.",
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: c.why,
      };
    },
  },
  {
    id: "ohms-led-resistor-sizing",
    conceptId: "ohms-law",
    difficulty: "applied",
    generate: (rng) => {
      const vSupply = rng.pick([5, 9, 12]);
      const vLed = rng.pick([1.8, 2.0, 2.2]);
      const iTarget_mA = rng.pick([5, 10, 15, 20]);
      const r = round((vSupply - vLed) / (iTarget_mA / 1000), 1);
      return {
        prompt: `You drive an LED (forward voltage ${vLed} V) at ${iTarget_mA} mA from a ${vSupply} V supply using one series resistor. What resistor value (in ohms) gives that current? Round to 1 decimal.`,
        kind: "numeric",
        answer: { kind: "numeric", value: r, unit: "ohm", tolerance: 0.5 },
        explanation: `Voltage across the resistor = ${vSupply} − ${vLed} = ${(vSupply - vLed).toFixed(2)} V. R = V/I = ${(vSupply - vLed).toFixed(2)} / ${(iTarget_mA / 1000).toFixed(4)} A = ${r} ohm.`,
      };
    },
  },
  {
    id: "ohms-unit-conversion",
    conceptId: "ohms-law",
    difficulty: "applied",
    generate: (rng) => {
      // Mix of conversions phrased as a current calculation in A (not mA).
      const v = rng.pick([3.3, 5, 12]);
      const r = rng.pick([330, 470, 1000, 2200]);
      const i_A = round(v / r, 4);
      return {
        prompt: `A ${r} ohm resistor sits across ${v} V. What is the current in amps (A)? Round to 4 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: i_A, unit: "A", tolerance: 0.0005 },
        explanation: `I = V/R = ${v}/${r} = ${i_A} A. (That is ${round(i_A * 1000, 2)} mA.)`,
      };
    },
  },
];

const powerTemplates: QuestionTemplate[] = [
  {
    id: "power-formula-pick",
    conceptId: "electrical-power",
    difficulty: "core",
    generate: (rng) => {
      const cases = [
        {
          q: "You know the current through a resistor and its resistance. Which formula gives the power dissipated?",
          choices: ["P = V·I", "P = I²·R", "P = V²/R", "P = R/I"],
          correctIndex: 1,
        },
        {
          q: "You know the voltage across a resistor and its resistance. Which formula gives the power dissipated?",
          choices: ["P = V·I", "P = I²·R", "P = V²/R", "P = V·R"],
          correctIndex: 2,
        },
        {
          q: "You know the voltage across and current through a resistor. Which formula gives the power dissipated?",
          choices: ["P = V·I", "P = I²·R", "P = V²/R", "P = V + I"],
          correctIndex: 0,
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: `All three formulas are equivalent via Ohm's law. Pick the one that uses what you already know: ${c.choices[c.correctIndex]}.`,
      };
    },
  },
  {
    id: "power-from-vi",
    conceptId: "electrical-power",
    difficulty: "core",
    generate: (rng) => {
      const v = rng.pick([3.3, 5, 9, 12, 24]);
      const i_mA = rng.pick([50, 100, 150, 200, 250, 500]);
      const p = round(v * (i_mA / 1000), 3);
      return {
        prompt: `A device pulls ${i_mA} mA at ${v} V. How much power does it consume in watts (W)? Round to 3 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: p, unit: "W", tolerance: 0.005 },
        explanation: `P = V·I = ${v} V × ${(i_mA / 1000).toFixed(3)} A = ${p} W.`,
      };
    },
  },
  {
    id: "power-i2r",
    conceptId: "electrical-power",
    difficulty: "applied",
    generate: (rng) => {
      const r = rng.pick([10, 22, 47, 100, 220]);
      const i_mA = rng.pick([20, 50, 100, 150, 200]);
      const i = i_mA / 1000;
      const p_mW = round(i * i * r * 1000, 2);
      return {
        prompt: `A ${r} ohm resistor carries ${i_mA} mA. How much power does it dissipate in milliwatts (mW)? Round to 2 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: p_mW, unit: "mW", tolerance: 0.1 },
        explanation: `P = I²·R = (${i.toFixed(3)} A)² × ${r} ohm = ${(i * i * r).toFixed(5)} W = ${p_mW} mW.`,
      };
    },
  },
  {
    id: "power-v2-over-r",
    conceptId: "electrical-power",
    difficulty: "applied",
    generate: (rng) => {
      const v = rng.pick([3.3, 5, 9, 12]);
      const r = rng.pick([100, 220, 330, 470, 1000]);
      const p_mW = round((v * v) / r * 1000, 2);
      return {
        prompt: `A ${r} ohm resistor sits across ${v} V. How much power does it dissipate in milliwatts (mW)? Round to 2 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: p_mW, unit: "mW", tolerance: 0.1 },
        explanation: `P = V²/R = ${v}² / ${r} = ${((v * v) / r).toFixed(5)} W = ${p_mW} mW.`,
      };
    },
  },
  {
    id: "power-resistor-rating-check",
    conceptId: "electrical-power",
    difficulty: "challenge",
    generate: (rng) => {
      // Pick scenarios where the resistor must be 1/4 W or 1/2 W rated.
      const cases = [
        { v: 12, r: 100, rating: "1/4 W (0.25 W)" }, // 1.44 W -> too high
        { v: 5, r: 220, rating: "1/4 W (0.25 W)" }, // 0.114 W -> OK
        { v: 9, r: 330, rating: "1/4 W (0.25 W)" }, // 0.245 W -> OK (just barely)
        { v: 12, r: 470, rating: "1/4 W (0.25 W)" }, // 0.306 W -> too high
      ];
      const c = rng.pick(cases);
      const p = (c.v * c.v) / c.r;
      const okIndex = p <= 0.25 ? 0 : 1;
      const choices = ["Yes — power dissipation is within the rating", "No — it will exceed the rating and likely overheat"];
      return {
        prompt: `A ${c.r} ohm resistor with a ${c.rating} rating sits across ${c.v} V. Will it stay within its power rating?`,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices, correctIndex: okIndex },
        explanation: `P = V²/R = ${c.v}²/${c.r} = ${p.toFixed(3)} W. Rating is 0.25 W. ${p <= 0.25 ? "Within rating." : "Exceeds rating — pick a higher-wattage resistor or a larger R."}`,
      };
    },
  },
];

const seriesTemplates: QuestionTemplate[] = [
  {
    id: "series-total-resistance",
    conceptId: "series-resistance",
    difficulty: "core",
    generate: (rng) => {
      const n = rng.int(2, 4);
      const values: number[] = [];
      for (let k = 0; k < n; k++) {
        values.push(rng.pick([100, 220, 330, 470, 680, 1000]));
      }
      const total = values.reduce((s, v) => s + v, 0);
      return {
        prompt: `Resistors with values ${values.join(", ")} ohm are connected in series. What is the total resistance in ohms?`,
        kind: "numeric",
        answer: { kind: "numeric", value: total, unit: "ohm", tolerance: 0.1 },
        explanation: `In series, R_total = R1 + R2 + ... = ${values.join(" + ")} = ${total} ohm.`,
      };
    },
  },
  {
    id: "series-current",
    conceptId: "series-resistance",
    difficulty: "applied",
    generate: (rng) => {
      const v = rng.pick([5, 9, 12, 24]);
      const r1 = rng.pick([100, 220, 330, 470]);
      const r2 = rng.pick([100, 220, 330, 470]);
      const total = r1 + r2;
      const i_mA = round((v / total) * 1000, 3);
      return {
        prompt: `A ${v} V source drives two series resistors of ${r1} ohm and ${r2} ohm. What is the current through the circuit in milliamps (mA)? Round to 3 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: i_mA, unit: "mA", tolerance: 0.05 },
        explanation: `Series adds: R_total = ${r1} + ${r2} = ${total} ohm. I = V/R_total = ${v}/${total} = ${(v / total).toFixed(5)} A = ${i_mA} mA. (Same current flows through both resistors.)`,
      };
    },
  },
  {
    id: "series-voltage-drop",
    conceptId: "series-resistance",
    difficulty: "applied",
    generate: (rng) => {
      const v = rng.pick([6, 9, 12, 15]);
      const r1 = rng.pick([100, 220, 330]);
      const r2 = rng.pick([470, 680, 1000]);
      const total = r1 + r2;
      const which = rng.pick([1, 2]);
      const r = which === 1 ? r1 : r2;
      const vDrop = round((v * r) / total, 3);
      return {
        prompt: `In a series circuit with a ${v} V source, R1 = ${r1} ohm and R2 = ${r2} ohm, what is the voltage drop across R${which} in volts (V)? Round to 3 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: vDrop, unit: "V", tolerance: 0.01 },
        explanation: `Series current is the same everywhere: I = V/(R1+R2) = ${v}/${total} A. Voltage across R${which} = I·R${which} = V·R${which}/(R1+R2) = ${v}·${r}/${total} = ${vDrop} V.`,
      };
    },
  },
  {
    id: "series-same-current-concept",
    conceptId: "series-resistance",
    difficulty: "core",
    generate: () => ({
      prompt: "Two resistors of different values are in series with a battery. Which statement is TRUE?",
      kind: "multiple-choice",
      answer: {
        kind: "multiple-choice",
        choices: [
          "The voltage across each resistor is the same.",
          "The current through each resistor is the same.",
          "The larger resistor carries more current.",
          "The smaller resistor drops more voltage.",
        ],
        correctIndex: 1,
      },
      explanation:
        "In a series path there is only one path for current, so the same current flows through every series element. Voltage drops are proportional to resistance: bigger R → bigger V drop, but same I.",
    }),
  },
  {
    id: "series-find-missing-r",
    conceptId: "series-resistance",
    difficulty: "challenge",
    generate: (rng) => {
      const v = rng.pick([10, 12, 15, 20]);
      const known = rng.pick([220, 330, 470, 680]);
      const i_mA = rng.pick([10, 15, 20, 25]);
      const totalNeeded = (v / (i_mA / 1000));
      const missing = round(totalNeeded - known, 1);
      // Ensure positive and not absurd.
      if (missing <= 10) {
        // Fall back to a simple, guaranteed-positive case.
        const safeMissing = 100;
        const safeTotal = known + safeMissing;
        const safeI = round((v / safeTotal) * 1000, 3);
        return {
          prompt: `A ${v} V supply drives a series pair: a ${known} ohm resistor and an unknown resistor. The measured current is ${safeI} mA. What is the unknown resistance in ohms? Round to 1 decimal.`,
          kind: "numeric",
          answer: { kind: "numeric", value: round(safeMissing, 1), unit: "ohm", tolerance: 1 },
          explanation: `R_total = V/I = ${v}/${(safeI / 1000).toFixed(5)} = ${safeTotal} ohm. Unknown = R_total − known = ${safeTotal} − ${known} = ${safeMissing} ohm.`,
        };
      }
      return {
        prompt: `A ${v} V supply drives a series pair: a ${known} ohm resistor and an unknown resistor. The measured current is ${i_mA} mA. What is the unknown resistance in ohms? Round to 1 decimal.`,
        kind: "numeric",
        answer: { kind: "numeric", value: missing, unit: "ohm", tolerance: 1 },
        explanation: `R_total = V/I = ${v}/${(i_mA / 1000).toFixed(4)} = ${totalNeeded.toFixed(2)} ohm. Unknown = R_total − known = ${totalNeeded.toFixed(2)} − ${known} = ${missing} ohm.`,
      };
    },
  },
];

const parallelTemplates: QuestionTemplate[] = [
  {
    id: "parallel-two-equal",
    conceptId: "parallel-resistance",
    difficulty: "core",
    generate: (rng) => {
      const r = rng.pick([100, 220, 330, 470, 1000, 2200]);
      const total = round(r / 2, 2);
      return {
        prompt: `Two ${r} ohm resistors in parallel — what is the total resistance in ohms? Round to 2 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: total, unit: "ohm", tolerance: 0.5 },
        explanation: `Two equal resistors in parallel give R/2 = ${r}/2 = ${total} ohm.`,
      };
    },
  },
  {
    id: "parallel-two-unequal",
    conceptId: "parallel-resistance",
    difficulty: "core",
    generate: (rng) => {
      const r1 = rng.pick([100, 220, 330, 470]);
      const r2 = rng.pick([680, 1000, 1500, 2200]);
      const total = round(parallelTwo(r1, r2), 2);
      return {
        prompt: `A ${r1} ohm resistor is in parallel with a ${r2} ohm resistor. What is the equivalent resistance in ohms? Round to 2 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: total, unit: "ohm", tolerance: 1 },
        explanation: `For two resistors: R = R1·R2/(R1+R2) = ${r1}·${r2}/(${r1}+${r2}) = ${(r1 * r2)}/${r1 + r2} = ${total} ohm. (Always less than the smaller of the two.)`,
      };
    },
  },
  {
    id: "parallel-three",
    conceptId: "parallel-resistance",
    difficulty: "applied",
    generate: (rng) => {
      const r1 = rng.pick([100, 220, 330]);
      const r2 = rng.pick([470, 680]);
      const r3 = rng.pick([1000, 1500, 2200]);
      const inv = 1 / r1 + 1 / r2 + 1 / r3;
      const total = round(1 / inv, 2);
      return {
        prompt: `Three resistors are in parallel: ${r1} ohm, ${r2} ohm, ${r3} ohm. What is the equivalent resistance in ohms? Round to 2 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: total, unit: "ohm", tolerance: 1 },
        explanation: `1/R = 1/${r1} + 1/${r2} + 1/${r3} = ${inv.toFixed(6)}, so R = ${total} ohm.`,
      };
    },
  },
  {
    id: "parallel-same-voltage-concept",
    conceptId: "parallel-resistance",
    difficulty: "core",
    generate: () => ({
      prompt: "Two unequal resistors are in parallel across a battery. Which statement is TRUE?",
      kind: "multiple-choice",
      answer: {
        kind: "multiple-choice",
        choices: [
          "Each resistor sees the same voltage; the smaller R carries more current.",
          "Each resistor sees the same current; the larger R has a larger voltage drop.",
          "The equivalent resistance is the sum of the two values.",
          "The larger R carries more current because more 'flows through' it.",
        ],
        correctIndex: 0,
      },
      explanation:
        "Parallel elements share the same two nodes, so they have the same voltage across them. By I = V/R, a smaller R draws more current. The combined R is always less than the smaller of the two — never the sum (that would be series).",
    }),
  },
  {
    id: "parallel-current-from-source",
    conceptId: "parallel-resistance",
    difficulty: "applied",
    generate: (rng) => {
      const v = rng.pick([5, 9, 12]);
      const r1 = rng.pick([100, 220, 330]);
      const r2 = rng.pick([470, 680, 1000]);
      const req = parallelTwo(r1, r2);
      const i_mA = round((v / req) * 1000, 2);
      return {
        prompt: `A ${v} V source drives a parallel combination of ${r1} ohm and ${r2} ohm. What total current does the source provide in milliamps (mA)? Round to 2 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: i_mA, unit: "mA", tolerance: 0.2 },
        explanation: `R_eq = ${r1}·${r2}/(${r1}+${r2}) = ${req.toFixed(2)} ohm. I_total = V/R_eq = ${v}/${req.toFixed(2)} = ${(v / req).toFixed(5)} A = ${i_mA} mA. (Same as I1 + I2.)`,
      };
    },
  },
];

const dividerTemplates: QuestionTemplate[] = [
  {
    id: "vdiv-find-vout",
    conceptId: "voltage-and-current-dividers",
    difficulty: "core",
    generate: (rng) => {
      const vin = rng.pick([5, 9, 12]);
      const r1 = rng.pick([1000, 2200, 4700, 10000]);
      const r2 = rng.pick([1000, 2200, 4700, 10000]);
      const vout = round((vin * r2) / (r1 + r2), 3);
      return {
        prompt: `A voltage divider has Vin = ${vin} V, R1 (top) = ${r1} ohm, R2 (bottom, to ground) = ${r2} ohm. What is Vout in volts (V)? Round to 3 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: vout, unit: "V", tolerance: 0.01 },
        explanation: `Vout = Vin · R2/(R1+R2) = ${vin} · ${r2}/(${r1}+${r2}) = ${vout} V.`,
      };
    },
  },
  {
    id: "vdiv-pick-r2-for-target",
    conceptId: "voltage-and-current-dividers",
    difficulty: "applied",
    generate: (rng) => {
      // Choose a target ratio so R2 = R1 * (Vout / (Vin - Vout)) gives a clean number.
      const ratios = [
        { vin: 5, vout: 3.3, r1: 1700 }, // R2 = 1700 * 3.3/1.7 ≈ 3300
        { vin: 9, vout: 3, r1: 6000 }, // R2 = 6000 * 3/6 = 3000
        { vin: 12, vout: 4, r1: 8000 }, // R2 = 8000 * 4/8 = 4000
        { vin: 12, vout: 3, r1: 9000 }, // R2 = 9000 * 3/9 = 3000
        { vin: 5, vout: 2.5, r1: 1000 }, // R2 = 1000 * 2.5/2.5 = 1000
      ];
      const c = rng.pick(ratios);
      const r2 = round((c.r1 * c.vout) / (c.vin - c.vout), 1);
      return {
        prompt: `You need a voltage divider that turns ${c.vin} V into ${c.vout} V. R1 (top) is ${c.r1} ohm. What value of R2 (bottom, to ground) gives the target Vout? Round to 1 decimal.`,
        kind: "numeric",
        answer: { kind: "numeric", value: r2, unit: "ohm", tolerance: 5 },
        explanation: `From Vout = Vin·R2/(R1+R2), solve R2 = R1·Vout/(Vin−Vout) = ${c.r1}·${c.vout}/(${c.vin}−${c.vout}) = ${r2} ohm.`,
      };
    },
  },
  {
    id: "vdiv-effect-of-r-ratio",
    conceptId: "voltage-and-current-dividers",
    difficulty: "core",
    generate: () => ({
      prompt: "In a two-resistor voltage divider Vout = Vin·R2/(R1+R2), if R1 equals R2, what is Vout?",
      kind: "multiple-choice",
      answer: {
        kind: "multiple-choice",
        choices: ["0", "Vin/4", "Vin/2", "Vin"],
        correctIndex: 2,
      },
      explanation: "If R1 = R2 then R2/(R1+R2) = 1/2, so Vout = Vin/2. (Equal resistors split the voltage equally — same principle as two equal series drops.)",
    }),
  },
  {
    id: "current-divider-two-branches",
    conceptId: "voltage-and-current-dividers",
    difficulty: "applied",
    generate: (rng) => {
      const iTotal_mA = rng.pick([60, 100, 120, 200]);
      const r1 = rng.pick([100, 220, 330]);
      const r2 = rng.pick([470, 680, 1000]);
      // Current divider rule: I1 = I_total · R2 / (R1+R2). (Current prefers the smaller resistor.)
      const i1_mA = round((iTotal_mA * r2) / (r1 + r2), 3);
      return {
        prompt: `A total current of ${iTotal_mA} mA enters a node and splits between two parallel resistors R1 = ${r1} ohm and R2 = ${r2} ohm. How much current flows through R1, in milliamps (mA)? Round to 3 decimals.`,
        kind: "numeric",
        answer: { kind: "numeric", value: i1_mA, unit: "mA", tolerance: 0.1 },
        explanation: `Current divider rule: I1 = I_total · R2 / (R1+R2) = ${iTotal_mA} · ${r2}/(${r1}+${r2}) = ${i1_mA} mA. (More current goes through the smaller resistor — note R2 appears in the numerator for I1.)`,
      };
    },
  },
  {
    id: "vdiv-sensor-read-concept",
    conceptId: "voltage-and-current-dividers",
    difficulty: "challenge",
    generate: () => ({
      prompt:
        "You want to read a 9 V battery with a microcontroller ADC that maxes out at 3.3 V. You add a voltage divider before the ADC. What goes wrong if you make R1 and R2 too small (e.g., 100 ohm each)?",
      kind: "multiple-choice",
      answer: {
        kind: "multiple-choice",
        choices: [
          "Vout will be too high — the divider stops working.",
          "Current through the divider becomes large, wasting power and possibly damaging the battery or resistors.",
          "Vout will be 0 V regardless of input.",
          "Nothing — smaller resistors are always better for accuracy.",
        ],
        correctIndex: 1,
      },
      explanation:
        "The divider ratio is set by the resistor ratio, not their absolute values. But small resistors mean a large continuous current (I = V/(R1+R2)) flowing to ground — wasted power and heat. Pick resistors big enough that the divider current is small relative to what the source can supply.",
    }),
  },
];

const kirchhoffTemplates: QuestionTemplate[] = [
  {
    id: "kcl-node-current",
    conceptId: "kirchhoffs-laws",
    difficulty: "core",
    generate: (rng) => {
      // Two currents flow in, one flows out — find the missing in/out.
      const i1 = rng.int(5, 30);
      const i2 = rng.int(5, 30);
      const target = rng.pick(["out", "in"]);
      if (target === "out") {
        const iOut = i1 + i2;
        return {
          prompt: `At a circuit node, ${i1} mA flows in from one wire and ${i2} mA flows in from another. By Kirchhoff's Current Law, what current flows OUT through the third wire (in mA)?`,
          kind: "numeric",
          answer: { kind: "numeric", value: iOut, unit: "mA", tolerance: 0.001 },
          explanation: `KCL says current in = current out at every node: ${i1} + ${i2} = ${iOut} mA flows out.`,
        };
      }
      const iIn = i1 + i2;
      return {
        prompt: `At a circuit node, ${i1} mA flows out one wire and ${i2} mA flows out another. By KCL, what current must flow IN through the third wire (in mA)?`,
        kind: "numeric",
        answer: { kind: "numeric", value: iIn, unit: "mA", tolerance: 0.001 },
        explanation: `KCL: current in = current out. ${i1} + ${i2} = ${iIn} mA must enter the node.`,
      };
    },
  },
  {
    id: "kvl-loop-find-voltage",
    conceptId: "kirchhoffs-laws",
    difficulty: "core",
    generate: (rng) => {
      const vSource = rng.pick([9, 12, 15, 20, 24]);
      const v1 = rng.int(1, vSource - 2);
      const v2 = round(vSource - v1, 2);
      return {
        prompt: `In a single loop, a ${vSource} V battery drives two series resistors. The voltage across R1 measures ${v1} V. By Kirchhoff's Voltage Law, what is the voltage across R2 in volts (V)?`,
        kind: "numeric",
        answer: { kind: "numeric", value: v2, unit: "V", tolerance: 0.01 },
        explanation: `KVL: the sum of voltage drops around a closed loop equals zero (or equivalently, source = sum of drops): ${vSource} = ${v1} + V_R2 → V_R2 = ${v2} V.`,
      };
    },
  },
  {
    id: "kcl-three-branches",
    conceptId: "kirchhoffs-laws",
    difficulty: "applied",
    generate: (rng) => {
      // Three currents into a node; one is unknown (with a sign).
      const iA = rng.int(10, 50);
      const iB = rng.int(10, 50);
      const iOutKnown = rng.int(5, iA + iB - 5);
      const iOutUnknown = (iA + iB) - iOutKnown;
      return {
        prompt: `At a node, ${iA} mA and ${iB} mA flow IN. One outgoing branch carries ${iOutKnown} mA. How many mA flow out through the second outgoing branch?`,
        kind: "numeric",
        answer: { kind: "numeric", value: iOutUnknown, unit: "mA", tolerance: 0.001 },
        explanation: `KCL: total in = total out. In: ${iA} + ${iB} = ${iA + iB} mA. Out: ${iOutKnown} + x = ${iA + iB} → x = ${iOutUnknown} mA.`,
      };
    },
  },
  {
    id: "kvl-three-drops",
    conceptId: "kirchhoffs-laws",
    difficulty: "applied",
    generate: (rng) => {
      const vSource = rng.pick([15, 20, 24, 30]);
      const v1 = rng.int(2, 8);
      const v2 = rng.int(2, 8);
      const v3 = vSource - v1 - v2;
      return {
        prompt: `A single-loop circuit has a ${vSource} V source and three series resistors R1, R2, R3. V across R1 = ${v1} V, V across R2 = ${v2} V. What is V across R3 in volts (V)?`,
        kind: "numeric",
        answer: { kind: "numeric", value: v3, unit: "V", tolerance: 0.01 },
        explanation: `KVL: source = sum of drops in a single loop. ${vSource} = ${v1} + ${v2} + V_R3 → V_R3 = ${v3} V.`,
      };
    },
  },
  {
    id: "kirchhoff-which-law",
    conceptId: "kirchhoffs-laws",
    difficulty: "core",
    generate: (rng) => {
      const cases = [
        {
          q: "Two wires meet a third at a junction. To find the unknown current in one wire given the other two, which law do you use?",
          choices: ["KCL (current law)", "KVL (voltage law)", "Ohm's law alone", "Neither — you need a measurement"],
          correctIndex: 0,
        },
        {
          q: "You want to find the voltage drop across an unknown component in a single loop, given the source voltage and all other drops. Which law applies most directly?",
          choices: ["KCL (current law)", "KVL (voltage law)", "Power law P = VI", "Parallel resistance formula"],
          correctIndex: 1,
        },
        {
          q: "Which statement best captures Kirchhoff's Voltage Law?",
          choices: [
            "Sum of currents into a node is zero.",
            "Sum of voltages around any closed loop is zero.",
            "Voltage across parallel branches is the same.",
            "Voltage equals current times resistance.",
          ],
          correctIndex: 1,
        },
        {
          q: "Which statement best captures Kirchhoff's Current Law?",
          choices: [
            "Sum of currents into a node is zero.",
            "Sum of voltages around any closed loop is zero.",
            "Current is the same through series components.",
            "Current is conserved only in DC circuits.",
          ],
          correctIndex: 0,
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation:
          "KCL = currents into a node sum to zero (charge conservation). KVL = voltages around a closed loop sum to zero (energy conservation). Both are the workhorses of any circuit analysis problem.",
      };
    },
  },
];

const concepts = [
  {
    id: "ohms-law",
    title: "Ohm's Law",
    description: "V = IR with any variable as the unknown, qualitative reasoning, and unit conversions between V, A, mA, and ohms.",
  },
  {
    id: "electrical-power",
    title: "Electrical Power",
    description: "P = V·I, P = I²·R, P = V²/R, picking the right formula, and checking resistor power ratings.",
  },
  {
    id: "series-resistance",
    title: "Series Resistance",
    description: "Total resistance adds; same current through every element; voltage drops scale with R.",
  },
  {
    id: "parallel-resistance",
    title: "Parallel Resistance",
    description: "1/R_total = sum of 1/R; product-over-sum shortcut for two; same voltage across all parallel elements.",
  },
  {
    id: "voltage-and-current-dividers",
    title: "Voltage and Current Dividers",
    description: "Vout = Vin·R2/(R1+R2); current divider rule for two branches; sizing dividers for sensors and level shifting.",
  },
  {
    id: "kirchhoffs-laws",
    title: "Kirchhoff's Laws",
    description: "KCL (currents into a node sum to zero) and KVL (voltages around a closed loop sum to zero), applied to simple node and loop problems.",
  },
];

export const circuitLawsExam: ModuleExamConfig = {
  moduleSlug: "circuit-laws",
  title: "Circuit Laws — Module Exam",
  description:
    "A 50-question exam covering Ohm's law, electrical power, series and parallel resistance, voltage and current dividers, and Kirchhoff's laws. Pass at 95% or higher. Numbers randomize each attempt.",
  totalQuestions: 50,
  passThreshold: 95,
  concepts,
  conceptWeights: {
    "ohms-law": 12,
    "electrical-power": 8,
    "series-resistance": 8,
    "parallel-resistance": 8,
    "voltage-and-current-dividers": 8,
    "kirchhoffs-laws": 6,
  },
  templates: [
    ...ohmsLawTemplates,
    ...powerTemplates,
    ...seriesTemplates,
    ...parallelTemplates,
    ...dividerTemplates,
    ...kirchhoffTemplates,
  ],
};
