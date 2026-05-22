"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { useEffect, useState } from "react";
import { readStorage, writeStorage } from "@/lib/browserStorage";

const storageKey = "physical-ai-lab:completed-lessons";

type LessonProgressToggleProps = {
  lessonSlug: string;
};

export function LessonProgressToggle({ lessonSlug }: LessonProgressToggleProps) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const saved = readStorage(storageKey);
      const completedLessons = saved ? (JSON.parse(saved) as string[]) : [];
      setCompleted(completedLessons.includes(lessonSlug));
    });
  }, [lessonSlug]);

  function toggle() {
    const saved = readStorage(storageKey);
    const completedLessons = saved ? (JSON.parse(saved) as string[]) : [];
    const next = completed
      ? completedLessons.filter((slug) => slug !== lessonSlug)
      : Array.from(new Set([...completedLessons, lessonSlug]));

    writeStorage(storageKey, JSON.stringify(next));
    setCompleted(!completed);
    window.dispatchEvent(new Event("physical-ai-lab-progress"));
  }

  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
      type="button"
      onClick={toggle}
    >
      {completed ? <CheckCircle2 size={17} /> : <Circle size={17} />}
      {completed ? "Marked complete" : "Mark complete"}
    </button>
  );
}
