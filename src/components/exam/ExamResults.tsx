"use client";

import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle2, RefreshCcw, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { loadResult } from "@/lib/exam/storage";
import type { ExamResult } from "@/lib/exam/types";
import { cn } from "@/lib/utils";

type ExamResultsProps = {
  moduleSlug: string;
  attemptId: string;
  moduleTitle: string;
  passThreshold: number;
};

export function ExamResults({ moduleSlug, attemptId, moduleTitle, passThreshold }: ExamResultsProps) {
  const [result, setResult] = useState<ExamResult | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setResult(loadResult(moduleSlug, attemptId));
    });
  }, [moduleSlug, attemptId]);

  if (!result) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-sm text-zinc-500">Loading result…</p>
      </div>
    );
  }

  const wrong = result.perQuestion.filter((q) => !q.correct);
  const shown = showAll ? result.perQuestion : wrong;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <div
        className={cn(
          "rounded-lg border p-6",
          result.passed
            ? "border-emerald-500/40 bg-emerald-500/10"
            : "border-amber-500/40 bg-amber-500/10",
        )}
      >
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
          {moduleTitle}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
          {result.scorePercent}%
        </h1>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
          {result.correctCount} / {result.totalQuestions} correct · pass threshold {passThreshold}% ·
          time {formatDuration(result.durationSeconds)}
        </p>
        <p
          className={cn(
            "mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
            result.passed
              ? "bg-emerald-600 text-white"
              : "bg-amber-600 text-white",
          )}
        >
          {result.passed ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
          {result.passed ? "Module passed" : "Not yet — keep practicing"}
        </p>
      </div>

      <section className="mt-6 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">By concept</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Where the time should go before retaking.
        </p>
        <div className="mt-4 grid gap-3">
          {result.conceptBreakdown.map((c) => {
            const pct = Math.round((c.correct / c.total) * 100);
            return (
              <div key={c.conceptId}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{c.title}</span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {c.correct}/{c.total} · {pct}%
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <div
                    className={cn(
                      "h-full",
                      pct >= 95 ? "bg-emerald-500" : pct >= 70 ? "bg-amber-500" : "bg-rose-500",
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
            {showAll ? "All questions" : "Missed questions"} ({shown.length})
          </h2>
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="text-sm font-medium text-cyan-700 hover:underline dark:text-cyan-300"
          >
            {showAll ? "Show only missed" : "Show all"}
          </button>
        </div>

        <div className="mt-4 grid gap-4">
          {shown.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No missed questions. Clean run.
            </p>
          ) : (
            shown.map((q) => (
              <article
                key={q.index}
                className={cn(
                  "rounded-md border p-4 text-sm",
                  q.correct
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-rose-500/30 bg-rose-500/5",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    Q{q.index + 1}. {q.question.prompt}
                  </p>
                  {q.correct ? (
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                  ) : (
                    <XCircle size={16} className="mt-0.5 shrink-0 text-rose-600" />
                  )}
                </div>
                <p className="mt-2 text-zinc-700 dark:text-zinc-300">
                  <span className="font-medium">Your answer:</span>{" "}
                  {formatResponse(q.question, q.response)}
                </p>
                <p className="mt-1 text-zinc-700 dark:text-zinc-300">
                  <span className="font-medium">Correct answer:</span>{" "}
                  {formatCorrectAnswer(q.question)}
                </p>
                <p className="mt-2 leading-6 text-zinc-600 dark:text-zinc-400">
                  {q.question.explanation}
                </p>
              </article>
            ))
          )}
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href={`/exams/${moduleSlug}?retake=1`}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-3 text-sm font-medium text-white dark:bg-white dark:text-zinc-950"
        >
          <RefreshCcw size={16} /> Retake exam
        </Link>
        <Link
          href="/curriculum"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 px-4 py-3 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
        >
          Back to curriculum <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

function formatResponse(
  question: import("@/lib/exam/types").GeneratedQuestion,
  response: string | number[] | null,
): string {
  if (response === null || response === undefined) return "(no answer)";
  if (typeof response === "string") {
    if (!response.trim()) return "(blank)";
    if (question.answer.kind === "multiple-choice") {
      const idx = Number(response);
      if (Number.isInteger(idx) && idx >= 0 && idx < question.answer.choices.length) {
        return `${String.fromCharCode(65 + idx)}. ${question.answer.choices[idx]}`;
      }
      return response;
    }
    return response;
  }
  if (question.answer.kind === "multi-select") {
    return response
      .slice()
      .sort((a, b) => a - b)
      .map((i) => `${String.fromCharCode(65 + i)}. ${question.answer.kind === "multi-select" ? question.answer.choices[i] : ""}`)
      .join(", ");
  }
  return JSON.stringify(response);
}

function formatCorrectAnswer(question: import("@/lib/exam/types").GeneratedQuestion): string {
  switch (question.answer.kind) {
    case "numeric":
      return question.answer.unit
        ? `${question.answer.value} ${question.answer.unit}`
        : `${question.answer.value}`;
    case "text":
      return question.answer.acceptedAnswers[0];
    case "multiple-choice":
      return `${String.fromCharCode(65 + question.answer.correctIndex)}. ${question.answer.choices[question.answer.correctIndex]}`;
    case "multi-select":
      return question.answer.correctIndices
        .map((i) => `${String.fromCharCode(65 + i)}. ${question.answer.kind === "multi-select" ? question.answer.choices[i] : ""}`)
        .join(", ");
  }
}
