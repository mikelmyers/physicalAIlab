"use client";

import { useEffect, useMemo, useState } from "react";
import { readStorage } from "@/lib/browserStorage";
import { ProgressBar } from "./ProgressBar";

const storageKey = "physical-ai-lab:completed-lessons";

type ProgressForLessonsProps = {
  lessonSlugs: string[];
  label?: string;
};

export function ProgressForLessons({ lessonSlugs, label }: ProgressForLessonsProps) {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    function readCompleted() {
      const saved = readStorage(storageKey);
      setCompleted(saved ? (JSON.parse(saved) as string[]) : []);
    }

    queueMicrotask(readCompleted);
    window.addEventListener("storage", readCompleted);
    window.addEventListener("physical-ai-lab-progress", readCompleted);

    return () => {
      window.removeEventListener("storage", readCompleted);
      window.removeEventListener("physical-ai-lab-progress", readCompleted);
    };
  }, []);

  const value = useMemo(() => {
    if (lessonSlugs.length === 0) {
      return 0;
    }

    const completedCount = lessonSlugs.filter((slug) => completed.includes(slug)).length;
    return (completedCount / lessonSlugs.length) * 100;
  }, [completed, lessonSlugs]);

  return <ProgressBar value={value} label={label} />;
}
