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
        acceptedAnswers: ["6.8 x 10^-3", "6.8*10^-3", "6.8 × 10^-3", "6.8e-3", "6.8 x 10-3"],
        explanation: "Move the decimal 3 places right to get 6.8, so the power of ten is -3.",
      },
    ],
  },
];

export function getLessonCheck(id: string) {
  return lessonChecks.find((check) => check.id === id);
}
