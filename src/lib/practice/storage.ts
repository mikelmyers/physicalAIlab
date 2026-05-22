import { readStorage, writeStorage } from "../browserStorage.ts";

const COMPLETED_KEY = "physical-ai-lab:practice-days";

export type DailyCompletion = {
  dateKey: string;
  correct: number;
  total: number;
  completedAt: string;
};

function safeParse(raw: string | null): DailyCompletion[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as DailyCompletion[]) : [];
  } catch {
    return [];
  }
}

export function loadCompletedDays(): DailyCompletion[] {
  return safeParse(readStorage(COMPLETED_KEY));
}

export function isDayComplete(dateKey: string): boolean {
  return loadCompletedDays().some((d) => d.dateKey === dateKey);
}

export function getDayCompletion(dateKey: string): DailyCompletion | undefined {
  return loadCompletedDays().find((d) => d.dateKey === dateKey);
}

export function markDayComplete(record: DailyCompletion) {
  const existing = loadCompletedDays().filter((d) => d.dateKey !== record.dateKey);
  existing.push(record);
  writeStorage(COMPLETED_KEY, JSON.stringify(existing));
}

export function currentStreak(today: string): number {
  const days = new Set(loadCompletedDays().map((d) => d.dateKey));
  let cursor = new Date(`${today}T12:00:00`);
  if (!days.has(formatKey(cursor))) return 0;

  let streak = 0;
  while (days.has(formatKey(cursor))) {
    streak += 1;
    cursor = new Date(cursor.getTime() - 24 * 60 * 60 * 1000);
  }
  return streak;
}

function formatKey(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
