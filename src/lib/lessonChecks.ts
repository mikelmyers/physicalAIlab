export type LessonCheckQuestion =
  | {
      id: string;
      kind: "text";
      prompt: string;
      acceptedAnswers: string[];
      explanation: string;
    }
  | {
      id: string;
      kind: "numeric";
      prompt: string;
      value: number;
      unit?: string;
      tolerance?: number;
      explanation: string;
    };

export type LessonCheck = {
  id: string;
  title: string;
  description: string;
  questions: LessonCheckQuestion[];
};

export const lessonChecks: LessonCheck[] = [
  {
    id: "arithmetic-units-core-check",
    title: "Arithmetic, Units, and Estimation Check",
    description:
      "Enter the result with units when units are requested. These checks are intentionally small so you can verify the core habits before moving on.",
    questions: [
      {
        id: "quantity-parts",
        kind: "text",
        prompt: "What two parts does a measured quantity have?",
        acceptedAnswers: ["number and unit", "a number and a unit", "number plus unit", "value and unit"],
        explanation: "A measured quantity combines a numerical value with a unit, such as 12 V or 3.5 A.",
      },
      {
        id: "minutes-to-hours",
        kind: "numeric",
        prompt: "Convert 30 minutes to hours.",
        value: 0.5,
        unit: "h",
        tolerance: 0.0001,
        explanation: "30 minutes is 30 / 60 hours, which is 0.5 h.",
      },
      {
        id: "speed-time-distance",
        kind: "numeric",
        prompt: "A rover moves at 0.6 m/s for 20 s. How far does it travel?",
        value: 12,
        unit: "m",
        tolerance: 0.0001,
        explanation: "Distance = speed x time = 0.6 m/s x 20 s = 12 m.",
      },
      {
        id: "ma-to-a",
        kind: "numeric",
        prompt: "Convert 75 mA to amps.",
        value: 0.075,
        unit: "A",
        tolerance: 0.000001,
        explanation: "1 mA = 0.001 A, so 75 mA = 75 x 0.001 A = 0.075 A.",
      },
      {
        id: "scientific-notation",
        kind: "text",
        prompt: "Write 0.0068 in scientific notation.",
        acceptedAnswers: ["6.8 x 10^-3", "6.8*10^-3", "6.8x10^-3", "6.8e-3", "6.8 x 10-3"],
        explanation: "Move the decimal 3 places right to get 6.8, so the power of ten is -3.",
      },
    ],
  },
  {
    id: "fractions-ratios-core-check",
    title: "Fractions, Ratios, and Proportions Check",
    description:
      "Use labels and units where requested. The goal is to verify whether you know what is being compared.",
    questions: [
      {
        id: "simplify-fraction",
        kind: "text",
        prompt: "Simplify 6/9.",
        acceptedAnswers: ["2/3", "two thirds", "2 thirds"],
        explanation: "Divide numerator and denominator by 3: 6/9 = 2/3.",
      },
      {
        id: "unit-rate",
        kind: "numeric",
        prompt: "A robot travels 15 m in 3 s. What is its unit rate?",
        value: 5,
        unit: "m/s",
        tolerance: 0.0001,
        explanation: "Unit rate = 15 m / 3 s = 5 m/s.",
      },
      {
        id: "map-scale",
        kind: "numeric",
        prompt: "A map scale is 1 cm = 2.5 m. A line is 12 cm. What real distance does it represent?",
        value: 30,
        unit: "m",
        tolerance: 0.0001,
        explanation: "12 cm is 12 times the map unit, so 12 x 2.5 m = 30 m.",
      },
      {
        id: "gear-ratio",
        kind: "numeric",
        prompt: "A motor spins at 1800 RPM through a 6:1 reduction. What is output RPM?",
        value: 300,
        unit: "RPM",
        tolerance: 0.0001,
        explanation: "For a 6:1 reduction, output RPM = 1800 / 6 = 300 RPM.",
      },
      {
        id: "part-whole",
        kind: "text",
        prompt: "A kit has 2 motors and 6 propellers. What fraction of the 8 total parts are motors?",
        acceptedAnswers: ["1/4", "2/8", "one fourth", "one quarter", "0.25"],
        explanation: "There are 2 motors out of 8 total parts, so 2/8 = 1/4.",
      },
    ],
  },
  {
    id: "signed-numbers-core-check",
    title: "Signed Numbers and Order of Operations Check",
    description:
      "Check signs, parentheses, and physical meaning carefully. Most mistakes in this lesson are small marks with large consequences.",
    questions: [
      {
        id: "opposite",
        kind: "numeric",
        prompt: "What is the opposite of -8?",
        value: 8,
        tolerance: 0,
        explanation: "The opposite is the same distance from zero on the other side, so the opposite of -8 is 8.",
      },
      {
        id: "absolute-value",
        kind: "numeric",
        prompt: "What is |-12|?",
        value: 12,
        tolerance: 0,
        explanation: "Absolute value is distance from zero. Distance is never negative.",
      },
      {
        id: "subtract-negative",
        kind: "numeric",
        prompt: "Calculate 5 - (-4).",
        value: 9,
        tolerance: 0,
        explanation: "Subtracting a negative is adding the opposite: 5 - (-4) = 5 + 4 = 9.",
      },
      {
        id: "negative-square-no-parentheses",
        kind: "numeric",
        prompt: "Calculate -3^2.",
        value: -9,
        tolerance: 0,
        explanation: "Without parentheses, the exponent applies to 3 first, then the negative sign is applied: -3^2 = -(9) = -9.",
      },
      {
        id: "distance-vs-displacement",
        kind: "text",
        prompt: "Which can be negative: distance or displacement?",
        acceptedAnswers: ["displacement", "displacement can be negative", "displacement can"],
        explanation: "Distance is total path length and is never negative. Displacement is change in position and can be positive, negative, or zero.",
      },
    ],
  },
];

export function getLessonCheck(id: string) {
  return lessonChecks.find((check) => check.id === id);
}
