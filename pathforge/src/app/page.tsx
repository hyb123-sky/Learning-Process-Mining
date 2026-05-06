import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth/role";
import { ensureUserStats } from "@/actions/progress";
import { getContinueLearningHref } from "@/lib/queries/continue-learning";

export const dynamic = "force-dynamic";

// ── Helpers ───────────────────────────────────────────────────────

const THUMB_VARIANTS = [
  { bg: "#EFF3F8", stroke: "#1E3A5F" },
  { bg: "#EFF6FF", stroke: "#1E40AF" },
  { bg: "#ECFDF5", stroke: "#047857" },
  { bg: "#FFFBEB", stroke: "#B45309" },
];

const TAG_STYLES = {
  brand:   "bg-[#EFF3F8] text-[#1E3A5F]",
  success: "bg-emerald-50 text-emerald-700",
  info:    "bg-blue-50 text-blue-800",
  amber:   "bg-amber-50 text-amber-700",
};

type TagVariant = keyof typeof TAG_STYLES;

function TagPill({ label, variant }: { label: string; variant: TagVariant }) {
  return (
    <span className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-[4px] mb-2 whitespace-nowrap ${TAG_STYLES[variant]}`}>
      {label}
    </span>
  );
}

function ProgBar({ pct }: { pct: number }) {
  return (
    <div className="h-1 bg-slate-200 rounded-full overflow-hidden mb-2">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "#1E3A5F" }} />
    </div>
  );
}

function ThumbIcon({ stroke }: { stroke: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="24" height="20" rx="2" /><line x1="4" y1="11" x2="28" y2="11" />
      <line x1="9" y1="6" x2="9" y2="11" />
      <line x1="13" y1="17" x2="22" y2="17" /><line x1="10" y1="21" x2="22" y2="21" />
    </svg>
  );
}

interface ModuleCardProps {
  href: string;
  thumbIdx: number;
  tagLabel: string;
  tagVariant: TagVariant;
  title: string;
  description: string;
  pct: number;
  meta: string;
  isNew?: boolean;
}

function ModuleCard({
  href,
  thumbIdx,
  tagLabel,
  tagVariant,
  title,
  description,
  pct,
  meta,
  isNew,
}: ModuleCardProps) {
  const { bg, stroke } = THUMB_VARIANTS[thumbIdx % THUMB_VARIANTS.length];
  return (
    <Link
      href={href}
      className="bg-white rounded-lg overflow-hidden cursor-pointer border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all block"
    >
      {/* Thumbnail */}
      <div className="h-[100px] flex items-center justify-center" style={{ background: bg }}>
        <ThumbIcon stroke={stroke} />
      </div>
      {/* Body */}
      <div className="p-4">
        <TagPill label={tagLabel} variant={tagVariant} />
        <div className="text-[15px] font-semibold text-slate-900 leading-[1.4] mb-1 line-clamp-2">
          {title}
        </div>
        <div className="text-[13px] text-slate-500 leading-[1.5] truncate mb-3">{description}</div>
        <ProgBar pct={pct} />
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-500">{meta}</span>
          {isNew ? (
            <span className="text-[11px] font-semibold text-emerald-700">New</span>
          ) : (
            <span className="text-[11px] font-semibold" style={{ color: "#1E3A5F" }}>{pct}%</span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────

export default async function Dashboard() {
  await ensureUserStats();
  const userId = await getCurrentUserId();

  const [stats, quests, progressRows, continueLearningHref, featuredQuest] = await Promise.all([
    prisma.userStats.findUnique({ where: { userId } }),
    prisma.quest.findMany({
      orderBy: { order: "asc" },
      include: { chapters: { orderBy: { order: "asc" } } },
    }),
    prisma.chapterProgress.findMany({ where: { userId } }),
    getContinueLearningHref(),
    prisma.quest.findFirst({
      orderBy: [{ trail: { order: "asc" } }, { order: "asc" }],
      select: { slug: true },
    }),
  ]);
  const featuredQuestHref = featuredQuest ? `/quest/${featuredQuest.slug}` : "/catalog";

  const progMap = new Map(progressRows.map((p) => [p.chapterId, p]));

  const questsWithPct = quests.map((q, idx) => {
    const total = q.chapters.length || 1;
    const done = q.chapters.filter((c) => progMap.get(c.id)?.status === "completed").length;
    const pct = Math.round((done / total) * 100);
    return { ...q, total, done, pct, idx };
  });

  const continueCards = questsWithPct.filter((q) => q.pct > 0 && q.pct < 100).slice(0, 3);
  const recommendedCards = questsWithPct.filter((q) => q.pct === 0).slice(0, 3);

  const totalChapters = quests.reduce((s, q) => s + q.chapters.length, 0);
  const doneChapters = quests.reduce(
    (s, q) => s + q.chapters.filter((c) => progMap.get(c.id)?.status === "completed").length,
    0
  );

  const streak = stats?.currentStreak ?? 0;
  const points = stats?.totalInsight ?? 0;
  const rank = stats?.rank ?? "Apprentice";

  const isChapterHref = continueLearningHref !== "/catalog";
  const completePct = totalChapters > 0 ? Math.round((doneChapters / totalChapters) * 100) : 0;

  // KPI delta arrows
  function DeltaUp({ text }: { text: string }) {
    return (
      <div className="flex items-center gap-1 text-[12px] font-medium text-emerald-700">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9V3M3 6l3-3 3 3" />
        </svg>
        {text}
      </div>
    );
  }

  // Recent activity rows (in_progress + completed only)
  const allChapters = quests.flatMap((q) => q.chapters.map((c) => ({ ...c, questSlug: q.slug })));
  const activityRows = progressRows
    .filter((p) => p.status === "completed" || p.status === "in_progress")
    .slice(0, 5);

  return (
    <div className="p-8">

      {/* ── Welcome banner ── */}
      <div
        className="rounded-xl p-8 flex items-center justify-between gap-8 mb-8 relative overflow-hidden"
        style={{ background: "#1E3A5F" }}
      >
        <div className="relative z-10">
          <div className="text-[22px] font-semibold text-white leading-tight tracking-[-0.01em] mb-2">
            Welcome back, 黄煜博
          </div>
          <div className="text-sm text-white/85 leading-[1.55] mb-5">
            {continueCards.length > 0
              ? `You're ${continueCards[0].pct}% through ${continueCards[0].title_en}. Pick up where you left off.`
              : "Start your process mining journey today."}
          </div>
          <Link
            href={continueLearningHref}
            className="inline-flex items-center gap-2 bg-white text-[14px] font-semibold px-[18px] py-2.5 rounded-[6px] hover:opacity-92 transition-opacity"
            style={{ color: "#1E3A5F" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#1E3A5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="8" r="6.5" /><path d="M6.5 5.5l5 2.5-5 2.5V5.5z" fill="#1E3A5F" stroke="none" />
            </svg>
            {isChapterHref ? "Continue learning" : "Browse catalog"}
          </Link>
        </div>

        {/* Decorative process-flow geometry */}
        <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none z-0 opacity-[0.08]" aria-hidden>
          <svg width="320" height="160" viewBox="0 0 320 160" fill="none">
            <rect x="20" y="40" width="60" height="36" rx="6" fill="white" />
            <rect x="100" y="20" width="60" height="36" rx="6" fill="white" />
            <rect x="100" y="68" width="60" height="36" rx="6" fill="white" />
            <rect x="180" y="44" width="60" height="36" rx="6" fill="white" />
            <rect x="260" y="24" width="60" height="36" rx="6" fill="white" />
            <rect x="260" y="72" width="60" height="36" rx="6" fill="white" />
            <line x1="80" y1="58" x2="100" y2="38" stroke="white" strokeWidth="1.5" />
            <line x1="80" y1="58" x2="100" y2="86" stroke="white" strokeWidth="1.5" />
            <line x1="160" y1="38" x2="180" y2="62" stroke="white" strokeWidth="1.5" />
            <line x1="160" y1="86" x2="180" y2="62" stroke="white" strokeWidth="1.5" />
            <line x1="240" y1="62" x2="260" y2="42" stroke="white" strokeWidth="1.5" />
            <line x1="240" y1="62" x2="260" y2="90" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* ── KPI grid ── */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="text-[12px] font-medium text-slate-500 mb-2">Learning streak</div>
          <div className="text-[24px] font-bold text-slate-900 leading-none tracking-[-0.02em] mb-2">
            {streak} {streak === 1 ? "day" : "days"}
          </div>
          <Link href="/catalog" className="no-underline">
            <DeltaUp text={streak > 0 ? `${streak} day streak` : "Start today"} />
          </Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="text-[12px] font-medium text-slate-500 mb-2">Total points</div>
          <div className="text-[24px] font-bold text-slate-900 leading-none tracking-[-0.02em] mb-2">
            {points.toLocaleString()}
          </div>
          <Link href={continueLearningHref} className="no-underline">
            <DeltaUp text="Keep earning" />
          </Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="text-[12px] font-medium text-slate-500 mb-2">Chapters completed</div>
          <div className="text-[24px] font-bold text-slate-900 leading-none tracking-[-0.02em] mb-2">
            {doneChapters} / {totalChapters}
          </div>
          <Link
            href={featuredQuestHref}
            className="text-[12px] font-medium text-slate-500 hover:text-slate-700 hover:underline"
          >
            {completePct}% complete
          </Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="text-[12px] font-medium text-slate-500 mb-2">Current rank</div>
          <div className="text-[20px] font-bold text-slate-900 leading-none tracking-[-0.01em] mb-2 mt-[3px]">
            {rank}
          </div>
          <Link href={continueLearningHref} className="no-underline">
            <DeltaUp text="Keep learning" />
          </Link>
        </div>
      </div>

      {/* ── Continue your learning ── */}
      {continueCards.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[18px] font-semibold text-slate-900">Continue your learning</div>
            <Link href="/my-learning" className="text-[13px] font-medium hover:underline" style={{ color: "#1E3A5F" }}>
              View all
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {continueCards.map((q, i) => (
              <ModuleCard
                key={q.id}
                href={`/quest/${q.slug}`}
                thumbIdx={i}
                tagLabel={q.crestName}
                tagVariant="brand"
                title={q.title_en}
                description={q.description_en}
                pct={q.pct}
                meta={`${q.estimatedMinutes} min`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Recommended for you ── */}
      {recommendedCards.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[18px] font-semibold text-slate-900">Recommended for you</div>
            <Link href="/catalog" className="text-[13px] font-medium hover:underline" style={{ color: "#1E3A5F" }}>
              View all
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {recommendedCards.map((q, i) => {
              const tagVariants: TagVariant[] = ["success", "info", "amber"];
              return (
                <ModuleCard
                  key={q.id}
                  href={`/quest/${q.slug}`}
                  thumbIdx={i + 1}
                  tagLabel="New"
                  tagVariant={tagVariants[i % tagVariants.length]}
                  title={q.title_en}
                  description={q.description_en}
                  pct={0}
                  meta={`${q.estimatedMinutes} min`}
                  isNew
                />
              );
            })}
          </div>
        </div>
      )}

      {/* ── All quests (fallback when no progress yet) ── */}
      {continueCards.length === 0 && recommendedCards.length === 0 && questsWithPct.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[18px] font-semibold text-slate-900">Start learning</div>
            <Link href="/catalog" className="text-[13px] font-medium hover:underline" style={{ color: "#1E3A5F" }}>
              View all
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {questsWithPct.slice(0, 3).map((q, i) => (
              <ModuleCard
                key={q.id}
                href={`/quest/${q.slug}`}
                thumbIdx={i}
                tagLabel={q.crestName}
                tagVariant="brand"
                title={q.title_en}
                description={q.description_en}
                pct={q.pct}
                meta={`${q.estimatedMinutes} min`}
                isNew
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Recent activity ── */}
      {activityRows.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[18px] font-semibold text-slate-900">Recent activity</div>
          </div>
          <div className="flex flex-col">
            {activityRows.map((p, i) => {
              const chapter = allChapters.find((c) => c.id === p.chapterId);
              if (!chapter) return null;
              return (
                <Link
                  key={p.id}
                  href={`/quest/${chapter.questSlug}/${chapter.slug}`}
                  className="flex items-center gap-3 py-3 hover:bg-slate-50 -mx-2 px-2 rounded transition-colors"
                  style={{ borderBottom: i < activityRows.length - 1 ? "1px solid #F1F5F9" : "none" }}
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: p.status === "completed" ? "#047857" : "#B45309" }}
                  />
                  <div className="flex-1 text-sm text-slate-900 leading-[1.45]">
                    {p.status === "completed" ? "Completed: " : "In progress: "}
                    <strong>{chapter.title_en}</strong>
                  </div>
                  <div className="text-[12px] text-slate-500 whitespace-nowrap">
                    {p.completedAt
                      ? new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
                          Math.round((p.completedAt.getTime() - Date.now()) / 3600000),
                          "hour"
                        )
                      : "Recently"}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
