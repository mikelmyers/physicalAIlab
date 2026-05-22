"use client";

import Link from "next/link";
import { CheckCircle2, Flame, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { moduleExams } from "../../../content/exams";
import { modules, tracks } from "@/lib/data";
import { getPrerequisiteExams } from "@/lib/exam/gating";
import { bestResult, hasPassed, loadResults } from "@/lib/exam/storage";
import { todayDateKey } from "@/lib/practice/engine";
import { currentStreak, loadCompletedDays } from "@/lib/practice/storage";
import { cn } from "@/lib/utils";

type ModuleProgress = {
  moduleSlug: string;
  moduleTitle: string;
  trackTitle: string;
  status: "passed" | "ready" | "locked" | "no-exam";
  bestScore: number | null;
  attempts: number;
  passThreshold: number;
};

export function ProgressDashboard() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState<ModuleProgress[]>([]);
  const [streak, setStreak] = useState(0);
  const [practiceDays, setPracticeDays] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  useEffect(() => {
    queueMicrotask(() => {
      const examMap = new Map(moduleExams.map((e) => [e.moduleSlug, e]));
      const passedSet = new Set<string>();
      for (const exam of moduleExams) {
        if (hasPassed(exam.moduleSlug, exam.passThreshold)) {
          passedSet.add(exam.moduleSlug);
        }
      }

      const orderedTracks = tracks.slice().sort((a, b) => a.order - b.order);
      const items: ModuleProgress[] = [];

      let allCorrect = 0;
      let allAnswered = 0;

      for (const track of orderedTracks) {
        const trackModules = modules
          .filter((m) => m.trackSlug === track.slug)
          .sort((a, b) => a.order - b.order);
        for (const m of trackModules) {
          const exam = examMap.get(m.slug);
          if (!exam) {
            items.push({
              moduleSlug: m.slug,
              moduleTitle: m.title,
              trackTitle: track.title,
              status: "no-exam",
              bestScore: null,
              attempts: 0,
              passThreshold: 95,
            });
            continue;
          }
          const results = loadResults(m.slug);
          const best = bestResult(m.slug);
          const unmet = getPrerequisiteExams(m.slug).filter((p) => !passedSet.has(p.moduleSlug));
          const status: ModuleProgress["status"] = passedSet.has(m.slug)
            ? "passed"
            : unmet.length > 0
              ? "locked"
              : "ready";

          for (const r of results) {
            allCorrect += r.correctCount;
            allAnswered += r.totalQuestions;
          }

          items.push({
            moduleSlug: m.slug,
            moduleTitle: m.title,
            trackTitle: track.title,
            status,
            bestScore: best ? best.scorePercent : null,
            attempts: results.length,
            passThreshold: exam.passThreshold,
          });
        }
      }

      const today = todayDateKey();
      setStreak(currentStreak(today));
      setPracticeDays(loadCompletedDays().length);
      setTotalCorrect(allCorrect);
      setTotalAnswered(allAnswered);
      setProgress(items);
      setLoaded(true);
    });
  }, []);

  if (!loaded) {
    return <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-zinc-500">Loading progress…</div>;
  }

  const examItems = progress.filter((p) => p.status !== "no-exam");
  const passedCount = examItems.filter((p) => p.status === "passed").length;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 1000) / 10 : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<ShieldCheck size={18} className="text-cyan-700 dark:text-cyan-300" />}
          label="Modules passed"
          value={`${passedCount} / ${examItems.length}`}
          hint={`of ${examItems.length} available exam${examItems.length === 1 ? "" : "s"}`}
        />
        <StatCard
          icon={<Flame size={18} className="text-orange-600 dark:text-orange-300" />}
          label="Daily streak"
          value={`${streak} ${streak === 1 ? "day" : "days"}`}
          hint={`${practiceDays} total day${practiceDays === 1 ? "" : "s"} of practice`}
        />
        <StatCard
          icon={<CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-300" />}
          label="Overall accuracy"
          value={accuracy !== null ? `${accuracy}%` : "—"}
          hint={`${totalCorrect} / ${totalAnswered} across all exam attempts`}
        />
        <StatCard
          icon={<Sparkles size={18} className="text-cyan-700 dark:text-cyan-300" />}
          label="Exam attempts"
          value={`${examItems.reduce((s, p) => s + p.attempts, 0)}`}
          hint="all-time attempts"
        />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">Modules</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Locked modules require passing the previous module&apos;s exam at {">"} 95%.
        </p>

        <div className="mt-5 grid gap-3">
          {progress.map((p) => (
            <ModuleRow key={p.moduleSlug} item={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
      </div>
      <p className="mt-2 text-2xl font-semibold text-zinc-950 dark:text-white">{value}</p>
      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>
    </div>
  );
}

function ModuleRow({ item }: { item: ModuleProgress }) {
  const statusVisual = {
    passed: {
      label: "Passed",
      icon: <CheckCircle2 size={14} />,
      cls: "bg-emerald-600 text-white",
    },
    ready: {
      label: "Ready",
      icon: <Sparkles size={14} />,
      cls: "bg-cyan-500/15 text-cyan-800 dark:text-cyan-200",
    },
    locked: {
      label: "Locked",
      icon: <Lock size={14} />,
      cls: "bg-amber-500/15 text-amber-800 dark:text-amber-200",
    },
    "no-exam": {
      label: "No exam yet",
      icon: null,
      cls: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
    },
  }[item.status];

  const content = (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 transition hover:border-cyan-600 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-cyan-400">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {item.trackTitle}
        </p>
        <p className="mt-1 font-medium text-zinc-950 dark:text-white">{item.moduleTitle}</p>
      </div>
      <div className="flex items-center gap-3">
        {item.bestScore !== null ? (
          <span className="text-sm text-zinc-700 dark:text-zinc-300">
            Best: <span className="font-medium text-zinc-950 dark:text-white">{item.bestScore}%</span>
            <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">
              ({item.attempts} attempt{item.attempts === 1 ? "" : "s"})
            </span>
          </span>
        ) : item.status === "no-exam" ? (
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Bank not written yet</span>
        ) : (
          <span className="text-xs text-zinc-500 dark:text-zinc-400">No attempts</span>
        )}
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
            statusVisual.cls,
          )}
        >
          {statusVisual.icon}
          {statusVisual.label}
        </span>
      </div>
    </div>
  );

  if (item.status === "no-exam") return content;
  return (
    <Link href={`/exams/${item.moduleSlug}`} className="block">
      {content}
    </Link>
  );
}
