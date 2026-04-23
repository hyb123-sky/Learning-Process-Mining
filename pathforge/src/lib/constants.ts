// Phase 1 single-user. Replace with session.user.id in Phase 3.
export const CURRENT_USER_ID = "user_local_1";

export const RANKS = [
  { name: "Apprentice",   title_ja: "見習い",   minInsight: 0,     icon: "sprout" },
  { name: "Squire",       title_ja: "従騎士",   minInsight: 500,   icon: "swords" },
  { name: "Knight",       title_ja: "騎士",     minInsight: 2000,  icon: "shield" },
  { name: "Paladin",      title_ja: "聖騎士",   minInsight: 5000,  icon: "sparkles" },
  { name: "Grand Master", title_ja: "大師",     minInsight: 12000, icon: "crown" },
] as const;

export type Rank = (typeof RANKS)[number];
