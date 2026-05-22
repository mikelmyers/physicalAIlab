"use client";

import { Plus } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { readStorage, writeStorage } from "@/lib/browserStorage";
import type { BuildLog } from "@/lib/types";
import { BuildLogCard } from "./BuildLogCard";

const storageKey = "physical-ai-lab:build-logs";

export function LocalBuildLogForm() {
  const [entries, setEntries] = useState<BuildLog[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      const saved = readStorage(storageKey);
      setEntries(saved ? (JSON.parse(saved) as BuildLog[]) : []);
    });
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const summary = String(form.get("summary") ?? "").trim();

    if (!title || !summary) {
      return;
    }

    const entry: BuildLog = {
      slug: `${Date.now()}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      title,
      summary,
      date: new Date().toISOString().slice(0, 10),
      tags: String(form.get("tags") ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      visibility: "private",
    };
    const next = [entry, ...entries];
    setEntries(next);
    writeStorage(storageKey, JSON.stringify(next));
    event.currentTarget.reset();
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
      <form className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">Local build-log draft</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Drafts stay in this browser until a database or file-backed workflow is added.
        </p>
        <label className="mt-5 block text-sm font-medium" htmlFor="title">
          Title
        </label>
        <input
          className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-600 dark:border-zinc-700 dark:bg-zinc-950"
          id="title"
          name="title"
          required
        />
        <label className="mt-4 block text-sm font-medium" htmlFor="summary">
          Summary
        </label>
        <textarea
          className="mt-2 min-h-28 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-600 dark:border-zinc-700 dark:bg-zinc-950"
          id="summary"
          name="summary"
          required
        />
        <label className="mt-4 block text-sm font-medium" htmlFor="tags">
          Tags
        </label>
        <input
          className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-600 dark:border-zinc-700 dark:bg-zinc-950"
          id="tags"
          name="tags"
          placeholder="circuits, python, notes"
        />
        <button
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-zinc-950"
          type="submit"
        >
          <Plus size={16} />
          Add draft
        </button>
      </form>
      <div className="grid gap-4">
        {entries.length > 0 ? (
          entries.map((entry) => <BuildLogCard entry={entry} key={entry.slug} />)
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            No local drafts yet.
          </div>
        )}
      </div>
    </section>
  );
}
