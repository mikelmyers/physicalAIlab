import type { LessonCheckQuestion } from "./lessonChecks";

export type CheckResult = {
  correct: boolean;
  message: string;
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/\u00d7/g, "x")
    .replace(/\*/g, "x")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeScientificText(value: string) {
  return normalizeText(value).replace(/\s+/g, "");
}

function parseNumericAnswer(value: string) {
  const normalized = value.trim().replace(/,/g, "");
  const match = normalized.match(/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)(?:\s*([a-zA-Z/%^0-9-]+))?$/i);

  if (!match) {
    return null;
  }

  return {
    value: Number(match[1]),
    unit: match[2] ?? "",
  };
}

function normalizeUnit(unit: string) {
  const normalized = unit.trim().toLowerCase();

  const aliases: Record<string, string> = {
    a: "A",
    amp: "A",
    amps: "A",
    ampere: "A",
    amperes: "A",
    h: "h",
    hr: "h",
    hrs: "h",
    hour: "h",
    hours: "h",
    m: "m",
    meter: "m",
    meters: "m",
    metre: "m",
    metres: "m",
    "m2": "m^2",
    "m^2": "m^2",
    "m²": "m^2",
    "m3": "m^3",
    "m^3": "m^3",
    "mÂ³": "m^3",
    cm: "cm",
    "cm2": "cm^2",
    "cm^2": "cm^2",
    "cm²": "cm^2",
    "cm3": "cm^3",
    "cm^3": "cm^3",
    "cmÂ³": "cm^3",
    mm: "mm",
    "mm2": "mm^2",
    "mm^2": "mm^2",
    "mm²": "mm^2",
    "mm3": "mm^3",
    "mm^3": "mm^3",
    "mmÂ³": "mm^3",
    "m/s": "m/s",
    "meter/s": "m/s",
    "meters/s": "m/s",
    "meters/second": "m/s",
    "meters/sec": "m/s",
    "metres/second": "m/s",
    rpm: "RPM",
    "rot/min": "RPM",
    "rotations/minute": "RPM",
    "rotations/min": "RPM",
    deg: "deg",
    degree: "deg",
    degrees: "deg",
    rad: "rad",
    radian: "rad",
    radians: "rad",
  };

  return aliases[normalized] ?? unit.trim();
}

export function checkAnswer(question: LessonCheckQuestion, answer: string): CheckResult {
  if (!answer.trim()) {
    return { correct: false, message: "Enter an answer first." };
  }

  if (question.kind === "text") {
    const normalizedAnswer = normalizeText(answer);
    const normalizedScientificAnswer = normalizeScientificText(answer);
    const correct = question.acceptedAnswers.some((accepted) => {
      return (
        normalizeText(accepted) === normalizedAnswer ||
        normalizeScientificText(accepted) === normalizedScientificAnswer
      );
    });

    return {
      correct,
      message: correct ? "Correct." : "Not quite. Check the explanation and try again.",
    };
  }

  const parsed = parseNumericAnswer(answer);

  if (!parsed || Number.isNaN(parsed.value)) {
    return { correct: false, message: "Enter a number, optionally followed by a unit." };
  }

  const tolerance = question.tolerance ?? 0;
  const valueCorrect = Math.abs(parsed.value - question.value) <= tolerance;
  const unitCorrect = question.unit ? normalizeUnit(parsed.unit) === normalizeUnit(question.unit) : true;

  return {
    correct: valueCorrect && unitCorrect,
    message:
      valueCorrect && unitCorrect
        ? "Correct."
        : question.unit
          ? `Not quite. Expected ${question.value} ${question.unit}.`
          : `Not quite. Expected ${question.value}.`,
  };
}
