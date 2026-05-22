"use client";

import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { readStorage, removeStorage, writeStorage } from "@/lib/browserStorage";
import { checkAnswer, type CheckResult } from "@/lib/checkAnswer";
import { getLessonCheck } from "@/lib/lessonChecks";
import { cn } from "@/lib/utils";

type LessonCheckProps = {
  checkId: string;
};

export function LessonCheck({ checkId }: LessonCheckProps) {
  const check = getLessonCheck(checkId);
  const storageKey = `physical-ai-lab:lesson-check:${checkId}`;
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const saved = readStorage(storageKey);
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
    writeStorage(storageKey, JSON.stringify(next));
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
    removeStorage(storageKey);
  }

  return (
    <section className="not-prose my-8 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">{check.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-700 dark:text-zinc-300">{check.description}</p>
        </div>
        <div className="rounded-md bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
          {submitted ? `${correctCount}/${check.questions.length} - ${score}%` : "Not submitted"}
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
