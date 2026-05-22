"use client";

import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { getLessonCheck, type LessonCheckQuestion } from "@/lib/lessonChecks";
import { cn } from "@/lib/utils";

type LessonCheckProps = {
  checkId: string;
};

type CheckResult = {
  correct: boolean;
  message: string;
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[×*]/g, "x")
    .trim();
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
  return unit
    .replace(/hrs?/i, "h")
    .replace(/hours?/i, "h")
    .replace(/meters?/i, "m")
    .replace(/amps?/i, "A")
    .trim();
}

function checkAnswer(question: LessonCheckQuestion, answer: string): CheckResult {
  if (!answer.trim()) {
    return { correct: false, message: "Enter an answer first." };
  }

  if (question.kind === "text") {
    const normalizedAnswer = normalizeText(answer);
    const correct = question.acceptedAnswers.some((accepted) => normalizeText(accepted) === normalizedAnswer);

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

export function LessonCheck({ checkId }: LessonCheckProps) {
  const check = getLessonCheck(checkId);
  const storageKey = `physical-ai-lab:lesson-check:${checkId}`;
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") {
      return {};
    }

    const saved = window.localStorage.getItem(storageKey);
    return saved ? (JSON.parse(saved) as Record<string, string>) : {};
  });
  const [submitted, setSubmitted] = useState(false);

  const results = useMemo(() => {
    if (!check) {
      return {};
    }

    return Object.fromEntries(
      check.questions.map((question) => [question.id, checkAnswer(question, answers[question.id] ?? "")]),
    ) as Record<string, CheckResult>;
  }, [answers, check]);

  if (!check) {
    return (
      <div className="not-prose rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-200">
        Lesson check not found: {checkId}
      </div>
    );
  }

  const correctCount = check.questions.filter((question) => results[question.id]?.correct).length;
  const score = Math.round((correctCount / check.questions.length) * 100);

  function updateAnswer(questionId: string, value: string) {
    const next = { ...answers, [questionId]: value };
    setAnswers(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
    window.localStorage.removeItem(storageKey);
  }

  return (
    <section className="not-prose my-8 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">{check.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-700 dark:text-zinc-300">{check.description}</p>
        </div>
        <div className="rounded-md bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
          {submitted ? `${correctCount}/${check.questions.length} · ${score}%` : "Not submitted"}
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {check.questions.map((question, index) => {
          const result = results[question.id];
          const showResult = submitted && result;

          return (
            <article className="rounded-md border border-zinc-200 p-4 dark:border-zinc-800" key={question.id}>
              <label className="block text-sm font-medium text-zinc-950 dark:text-white" htmlFor={question.id}>
                {index + 1}. {question.prompt}
              </label>
              <input
                className="mt-3 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-600 dark:border-zinc-700 dark:bg-zinc-950"
                id={question.id}
                value={answers[question.id] ?? ""}
                onChange={(event) => updateAnswer(question.id, event.target.value)}
              />
              {showResult ? (
                <div
                  className={cn(
                    "mt-3 rounded-md border p-3 text-sm",
                    result.correct
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
                      : "border-rose-500/30 bg-rose-500/10 text-rose-800 dark:text-rose-200",
                  )}
                >
                  <p className="flex items-center gap-2 font-medium">
                    {result.correct ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    {result.message}
                  </p>
                  <p className="mt-2 leading-6">{question.explanation}</p>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-zinc-950"
          type="button"
          onClick={() => setSubmitted(true)}
        >
          <CheckCircle2 size={16} />
          Check answers
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
          type="button"
          onClick={reset}
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </section>
  );
}
