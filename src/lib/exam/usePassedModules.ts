"use client";

import { useEffect, useState } from "react";
import { moduleExams } from "../../../content/exams/index.ts";
import { hasPassed } from "./storage.ts";

export function usePassedModules(): { passed: Set<string>; loaded: boolean } {
  const [passed, setPassed] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const next = new Set<string>();
      for (const exam of moduleExams) {
        if (hasPassed(exam.moduleSlug, exam.passThreshold)) {
          next.add(exam.moduleSlug);
        }
      }
      setPassed(next);
      setLoaded(true);
    });
  }, []);

  return { passed, loaded };
}
