"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const saved = window.localStorage.getItem("physical-ai-lab:theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const nextIsDark = saved ? saved === "dark" : prefersDark;
      setIsDark(nextIsDark);
      document.documentElement.classList.toggle("dark", nextIsDark);
    });
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("physical-ai-lab:theme", next ? "dark" : "light");
  }

  return (
    <button
      aria-label="Toggle color theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-300 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
      type="button"
      onClick={toggleTheme}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
