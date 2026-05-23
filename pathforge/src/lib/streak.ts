/**
 * Computes the next streak values based on the previous lastStudyDate.
 * Returns null when no DB update is needed (same-day repeat).
 */
export function computeStreakUpdate(
  lastStudyDate: Date | null,
  currentStreak: number,
  longestStreak: number,
  today: Date
): { currentStreak: number; longestStreak: number } | null {
  // Normalize all dates to YYYY-MM-DD in UTC for comparison
  const toDateString = (d: Date) =>
    new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
      .toISOString()
      .slice(0, 10);

  const todayStr = toDateString(today);

  if (!lastStudyDate) {
    return { currentStreak: 1, longestStreak: Math.max(1, longestStreak) };
  }

  const lastStr = toDateString(lastStudyDate);

  if (lastStr === todayStr) {
    return null; // same day, no change
  }

  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayStr = toDateString(yesterday);

  if (lastStr === yesterdayStr) {
    const newCurrent = currentStreak + 1;
    return {
      currentStreak: newCurrent,
      longestStreak: Math.max(longestStreak, newCurrent),
    };
  }

  // Gap of 2+ days — reset
  return { currentStreak: 1, longestStreak };
}
