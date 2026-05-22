"use client";

import Link from "next/link";
import { CheckCircle2, ChevronRight, Flame, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { moduleExams } from "../../../content/exams";
import { isResponseCorrect } from "@/lib/exam/engine";
import { loadResults } from "@/lib/exam/storage";
import { isModuleUnlocked } from "@/lib/exam/gating";
import { usePassedModules } from "@/lib/exam/usePassedModules";
import { selectDailySet, todayDateKey, type PracticeQuestion } from "@/lib/practice/engine";
import {
  currentStreak,
  getDayCompletion,
  isDayComplete,
  loadCompletedDays,
  markDayComplete,
} from "@/lib/practice/storage";
import { cn } from "@/lib/utils";

const DAILY_COUNT = 10;

type Phase = "loading" | "answer" | "feedback" | "complete";

export function PracticeRunner() {
  const { passed, loaded: passedLoaded } = usePassedModules();
  const [phase, setPhase] = useState<Phase>("loading");
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState<string | number[]>("");
  const [results, setResults] = useState<boolean[]>([]);
  const [streak, setStreak] = useState(0);
  const [dateKey, setDateKey] = useState("");
  const [alreadyDoneToday, setAlreadyDoneToday] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      if (!passedLoaded) return;

      const today = todayDateKey();
      setDateKey(today);

      const accessible = moduleExams.filter((exam) => isModuleUnlocked(exam.moduleSlug, passed));

      const examResults: Record<string, import("@/lib/exam/types").ExamResult[]> = {};
      for (const exam of accessible) {
        examResults[exam.moduleSlug] = loadResults(exam.moduleSlug);
      }

      const set = selectDailySet({
        dateKey: today,
        accessibleExams: accessible.length > 0 ? accessible : moduleExams.slice(0, 1),
        results: examResults,
        count: DAILY_COUNT,
      });

      setQuestions(set);
      setStreak(currentStreak(today));
      setAlreadyDoneToday(isDayComplete(today));
      setPhase(set.length === 0 ? "complete" : "answer");
    });
  }, [passed, passedLoaded]);

  const question = questions[index];

  function submit() {
    if (!question) return;
    const ok = isResponseCorrect(question.answer, response);
    setResults((prev) => [...prev, ok]);
    setPhase("feedback");
  }

  function next() {
    if (index + 1 >= questions.length) {
      const correct = results.filter(Boolean).length;
      const completion = {
        dateKey,
        correct,
        total: questions.length,
        completedAt: new Date().toISOString(),
      };
      markDayComplete(completion);
      setStreak(currentStreak(dateKey));
      setAlreadyDoneToday(true);
      setPhase("complete");
      return;
    }
    setIndex((i) => i + 1);
    setResponse("");
    setPhase("answer");
  }

  const progressPct = useMemo(() => {
    if (questions.length === 0) return 0;
    return ((index + (phase === "feedback" ? 1 : 0)) / questions.length) * 100;
  }, [index, phase, questions.length]);

  if (phase === "loading") {
    return <div className="mx-auto max-w-2xl px-4 py-10 text-sm text-zinc-500">Preparing today&apos;s set…</div>;
  }

  if (alreadyDoneToday && phase === "complete") {
    const completion = getDayCompletion(dateKey);
    const days = loadCompletedDays().sort((a, b) => b.dateKey.localeCompare(a.dateKey)).slice(0, 7);
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-6">
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-800 dark:text-emerald-200">
            Today
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-emerald-900 dark:text-emerald-100">
            Done for today
          </h1>
          {completion ? (
            <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-100/80">
              {completion.correct} / {completion.total} correct
            </p>
          ) : null}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1 text-sm font-medium text-white">
            <Flame size={14} /> {streak}-day streak
          </div>
        </div>

        <section className="mt-6 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Recent days</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {days.map((d) => (
              <li
                key={d.dateKey}
                className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2 dark:border-zinc-800"
              >
                <span className="text-zinc-700 dark:text-zinc-300">{d.dateKey}</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  {d.correct} / {d.total}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/exams"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-3 text-sm font-medium text-white dark:bg-white dark:text-zinc-950"
          >
            Open module exams
          </Link>
          <Link
            href="/curriculum"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 px-4 py-3 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
          >
            Back to curriculum
          </Link>
        </div>
      </div>
    );
  }

  if (phase === "complete") {
    const correct = results.filter(Boolean).length;
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-6">
          <h1 className="text-3xl font-semibold text-emerald-900 dark:text-emerald-100">
            {correct} / {questions.length} today
          </h1>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1 text-sm font-medium text-white">
            <Flame size={14} /> {streak}-day streak
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/exams"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-3 text-sm font-medium text-white dark:bg-white dark:text-zinc-950"
          >
            Open module exams
          </Link>
          <Link
            href="/curriculum"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 px-4 py-3 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
          >
            Back to curriculum
          </Link>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 text-sm text-zinc-500">
        No questions are available yet. Take a module exam to start building your practice rotation.
      </div>
    );
  }

  const lastCorrect = phase === "feedback" ? results[results.length - 1] : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <div className="mb-6 flex items-center justify-between text-sm">
        <span className="font-medium text-zinc-900 dark:text-zinc-100">
          Daily practice · {index + 1} / {questions.length}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 px-2.5 py-1 text-xs font-medium text-orange-700 dark:text-orange-300">
          <Flame size={12} /> {streak}-day streak
        </span>
      </div>
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div className="h-full bg-cyan-600 transition-all dark:bg-cyan-400" style={{ width: `${progressPct}%` }} />
      </div>

      <article className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-xs font-medium uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
          {question.difficulty} · {question.conceptId.replace(/-/g, " ")}
        </p>
        <h2 className="mt-2 text-lg font-medium leading-7 text-zinc-950 dark:text-zinc-50 sm:text-xl">
          {question.prompt}
        </h2>

        <div className="mt-5">
          <PracticeAnswerInput
            question={question}
            response={response}
            onChange={setResponse}
            disabled={phase === "feedback"}
          />
        </div>

        {phase === "feedback" ? (
          <div
            className={cn(
              "mt-5 rounded-md border p-4 text-sm",
              lastCorrect
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100"
                : "border-rose-500/40 bg-rose-500/10 text-rose-900 dark:text-rose-100",
            )}
          >
            <p className="flex items-center gap-2 font-medium">
              {lastCorrect ? (
                <>
                  <CheckCircle2 size={16} /> Correct
                </>
              ) : (
                <>
                  <XCircle size={16} /> Not quite
                </>
              )}
            </p>
            <p className="mt-2 leading-6">{question.explanation}</p>
          </div>
        ) : null}
      </article>

      <div className="mt-6 grid grid-cols-1 gap-3">
        {phase === "answer" ? (
          <button
            type="button"
            onClick={submit}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-3 text-sm font-medium text-white dark:bg-white dark:text-zinc-950"
          >
            Check answer
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-3 text-sm font-medium text-white"
          >
            {index + 1 >= questions.length ? "Finish day" : "Next question"} <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

function PracticeAnswerInput({
  question,
  response,
  onChange,
  disabled,
}: {
  question: PracticeQuestion;
  response: string | number[];
  onChange: (value: string | number[]) => void;
  disabled: boolean;
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
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder={isNumeric ? (unitHint ? `value in ${unitHint}` : "value") : "your answer"}
          className="w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-base outline-none focus:border-cyan-600 disabled:opacity-70 dark:border-zinc-700 dark:bg-zinc-950"
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
                disabled={disabled}
                onClick={() => onChange(`${i}`)}
                className={cn(
                  "rounded-md border px-4 py-3 text-left text-sm font-medium transition disabled:opacity-70",
                  active
                    ? "border-cyan-600 bg-cyan-600/10 text-cyan-900 dark:text-cyan-100"
                    : "border-zinc-300 bg-white hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950",
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
                disabled={disabled}
                onClick={() => {
                  const next = active ? selected.filter((x) => x !== i) : [...selected, i];
                  onChange(next);
                }}
                className={cn(
                  "rounded-md border px-4 py-3 text-left text-sm font-medium transition disabled:opacity-70",
                  active
                    ? "border-cyan-600 bg-cyan-600/10 text-cyan-900 dark:text-cyan-100"
                    : "border-zinc-300 bg-white hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950",
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
