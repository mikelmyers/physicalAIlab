"use client";

import { CheckCircle2, ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { generateExam, gradeExam } from "@/lib/exam/engine";
import {
  appendResult,
  clearActiveSession,
  loadActiveSession,
  saveActiveSession,
} from "@/lib/exam/storage";
import type { ExamSession, ModuleExamConfig } from "@/lib/exam/types";
import { cn } from "@/lib/utils";

type ExamRunnerProps = {
  config: ModuleExamConfig;
  resumeExisting: boolean;
};

export function ExamRunner({ config, resumeExisting }: ExamRunnerProps) {
  const router = useRouter();
  const [session, setSession] = useState<ExamSession | null>(null);
  const [current, setCurrent] = useState(0);
  const [confirmingSubmit, setConfirmingSubmit] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const existing = resumeExisting ? loadActiveSession(config.moduleSlug) : null;
      const next = existing ?? generateExam(config);
      setSession(next);
      saveActiveSession(next);
    });
  }, [config, resumeExisting]);

  const answeredCount = useMemo(() => {
    if (!session) return 0;
    return session.responses.filter((r) => {
      if (r === null) return false;
      if (typeof r === "string") return r.trim().length > 0;
      return r.length > 0;
    }).length;
  }, [session]);

  if (!session) {
    return <div className="px-4 py-10 text-sm text-zinc-500">Preparing exam…</div>;
  }

  const q = session.questions[current];
  const response = session.responses[current];

  function updateResponse(value: string | number[]) {
    if (!session) return;
    const next = { ...session, responses: session.responses.slice() };
    next.responses[current] = value;
    setSession(next);
    saveActiveSession(next);
  }

  function go(delta: number) {
    setCurrent((c) => Math.max(0, Math.min(session!.questions.length - 1, c + delta)));
  }

  function submit() {
    if (!session) return;
    const result = gradeExam(config, session, session.responses);
    appendResult(result);
    clearActiveSession(config.moduleSlug);
    router.push(`/exams/${config.moduleSlug}/results/${result.attemptId}`);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <div className="sticky top-[64px] z-10 -mx-4 mb-6 border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 dark:border-zinc-800 dark:bg-zinc-950/95">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            Question {current + 1} / {session.totalQuestions}
          </span>
          <span className="text-zinc-500 dark:text-zinc-400">
            Answered {answeredCount}/{session.totalQuestions}
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full bg-cyan-600 transition-all dark:bg-cyan-400"
            style={{ width: `${((current + 1) / session.totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <article className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-xs font-medium uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
          {q.difficulty}
        </p>
        <h2 className="mt-2 text-lg font-medium leading-7 text-zinc-950 dark:text-zinc-50 sm:text-xl">
          {q.prompt}
        </h2>

        <div className="mt-5">
          <AnswerInput
            question={q}
            response={response}
            onChange={updateResponse}
          />
        </div>
      </article>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={current === 0}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 px-4 py-3 text-sm font-medium text-zinc-800 transition disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-100"
        >
          <ChevronLeft size={16} /> Previous
        </button>
        {current < session.questions.length - 1 ? (
          <button
            type="button"
            onClick={() => go(1)}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-3 text-sm font-medium text-white dark:bg-white dark:text-zinc-950"
          >
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmingSubmit(true)}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-3 text-sm font-medium text-white"
          >
            <Flag size={16} /> Submit exam
          </button>
        )}
      </div>

      <div className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Question map
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {session.questions.map((_, i) => {
            const a = session.responses[i];
            const answered = a !== null && (typeof a === "string" ? a.trim().length > 0 : a.length > 0);
            return (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={cn(
                  "h-8 w-8 rounded-md text-xs font-medium transition",
                  i === current
                    ? "bg-cyan-600 text-white"
                    : answered
                      ? "bg-emerald-500/15 text-emerald-700 ring-1 ring-emerald-500/40 dark:text-emerald-300"
                      : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
                )}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {confirmingSubmit ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">Submit exam?</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              You have answered {answeredCount} of {session.totalQuestions} questions. Unanswered
              questions are graded wrong. Pass threshold: {config.passThreshold}%.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConfirmingSubmit(false)}
                className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
              >
                Keep working
              </button>
              <button
                type="button"
                onClick={submit}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white"
              >
                <CheckCircle2 size={16} /> Submit
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AnswerInput({
  question,
  response,
  onChange,
}: {
  question: import("@/lib/exam/types").GeneratedQuestion;
  response: string | number[] | null;
  onChange: (value: string | number[]) => void;
}) {
  switch (question.answer.kind) {
    case "numeric":
    case "text": {
      const value = typeof response === "string" ? response : "";
      const isNumeric = question.answer.kind === "numeric";
      const unitHint = question.answer.kind === "numeric" ? question.answer.unit : undefined;
      return (
        <input
          type="text"
          inputMode={isNumeric ? "decimal" : "text"}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={isNumeric ? (unitHint ? `value in ${unitHint}` : "value") : "your answer"}
          className="w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-base outline-none focus:border-cyan-600 dark:border-zinc-700 dark:bg-zinc-950"
        />
      );
    }
    case "multiple-choice": {
      const selectedIdx = typeof response === "string" ? Number(response) : NaN;
      return (
        <div className="grid gap-2">
          {question.answer.choices.map((choice, i) => {
            const active = selectedIdx === i;
            return (
              <button
                type="button"
                key={i}
                onClick={() => onChange(`${i}`)}
                className={cn(
                  "rounded-md border px-4 py-3 text-left text-sm font-medium transition",
                  active
                    ? "border-cyan-600 bg-cyan-600/10 text-cyan-900 dark:text-cyan-100"
                    : "border-zinc-300 bg-white hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-zinc-500",
                )}
              >
                <span className="mr-2 text-zinc-500">{String.fromCharCode(65 + i)}.</span>
                {choice}
              </button>
            );
          })}
        </div>
      );
    }
    case "multi-select": {
      const selected = Array.isArray(response) ? response : [];
      return (
        <div className="grid gap-2">
          {question.answer.choices.map((choice, i) => {
            const active = selected.includes(i);
            return (
              <button
                type="button"
                key={i}
                onClick={() => {
                  const next = active ? selected.filter((x) => x !== i) : [...selected, i];
                  onChange(next);
                }}
                className={cn(
                  "rounded-md border px-4 py-3 text-left text-sm font-medium transition",
                  active
                    ? "border-cyan-600 bg-cyan-600/10 text-cyan-900 dark:text-cyan-100"
                    : "border-zinc-300 bg-white hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-zinc-500",
                )}
              >
                <span className="mr-2 text-zinc-500">{String.fromCharCode(65 + i)}.</span>
                {choice}
              </button>
            );
          })}
        </div>
      );
    }
  }
}
