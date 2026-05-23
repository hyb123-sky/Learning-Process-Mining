import { computeStreakUpdate } from './streak';

// Manual smoke check — run this with `npx tsx src/lib/streak.test.ts`
function assertEqual(actual: unknown, expected: unknown, label: string) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? '✓' : '✗'} ${label}`);
  if (!ok) {
    console.log('  expected:', expected);
    console.log('  actual:  ', actual);
  }
}

const today = new Date('2026-05-24T10:00:00Z');
const yesterday = new Date('2026-05-23T22:00:00Z');
const twoDaysAgo = new Date('2026-05-22T10:00:00Z');
const sameDay = new Date('2026-05-24T03:00:00Z');

assertEqual(
  computeStreakUpdate(null, 0, 0, today),
  { currentStreak: 1, longestStreak: 1 },
  'First-ever Trial → streak starts at 1'
);

assertEqual(
  computeStreakUpdate(yesterday, 3, 5, today),
  { currentStreak: 4, longestStreak: 5 },
  'Studied yesterday → +1, longest unchanged'
);

assertEqual(
  computeStreakUpdate(yesterday, 7, 7, today),
  { currentStreak: 8, longestStreak: 8 },
  'New personal best → longestStreak grows'
);

assertEqual(
  computeStreakUpdate(twoDaysAgo, 10, 10, today),
  { currentStreak: 1, longestStreak: 10 },
  'Gap of 2 days → reset to 1, longest preserved'
);

assertEqual(
  computeStreakUpdate(sameDay, 5, 5, today),
  null,
  'Same day repeat → no update'
);

console.log('\nAll streak tests complete.');
