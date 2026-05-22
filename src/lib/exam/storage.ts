import { readStorage, removeStorage, writeStorage } from "../browserStorage.ts";
import type { ExamResult, ExamSession } from "./types.ts";

const ACTIVE_PREFIX = "physical-ai-lab:exam-active:";
const HISTORY_PREFIX = "physical-ai-lab:exam-history:";

export function saveActiveSession(session: ExamSession) {
  writeStorage(`${ACTIVE_PREFIX}${session.moduleSlug}`, JSON.stringify(session));
}

export function loadActiveSession(moduleSlug: string): ExamSession | null {
  const raw = readStorage(`${ACTIVE_PREFIX}${moduleSlug}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ExamSession;
  } catch {
    return null;
  }
}

export function clearActiveSession(moduleSlug: string) {
  removeStorage(`${ACTIVE_PREFIX}${moduleSlug}`);
}

export function appendResult(result: ExamResult) {
  const key = `${HISTORY_PREFIX}${result.moduleSlug}`;
  const existing = readStorage(key);
  const list: ExamResult[] = existing ? safeParseList(existing) : [];
  list.push(result);
  writeStorage(key, JSON.stringify(list));
}

export function loadResults(moduleSlug: string): ExamResult[] {
  const raw = readStorage(`${HISTORY_PREFIX}${moduleSlug}`);
  if (!raw) return [];
  return safeParseList(raw);
}

export function loadResult(moduleSlug: string, attemptId: string): ExamResult | null {
  return loadResults(moduleSlug).find((r) => r.attemptId === attemptId) ?? null;
}

export function bestResult(moduleSlug: string): ExamResult | null {
  const results = loadResults(moduleSlug);
  if (results.length === 0) return null;
  return results.reduce((best, r) => (r.scorePercent > best.scorePercent ? r : best));
}

export function hasPassed(moduleSlug: string, threshold: number): boolean {
  return loadResults(moduleSlug).some((r) => r.scorePercent >= threshold);
}

function safeParseList(raw: string): ExamResult[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ExamResult[]) : [];
  } catch {
    return [];
  }
}
