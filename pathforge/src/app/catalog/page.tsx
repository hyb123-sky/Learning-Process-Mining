import Link from "next/link";
import { getCatalog, getCatalogStats } from "@/lib/queries/catalog";
import { prisma } from "@/lib/prisma";
import { CatalogSearch } from "@/components/catalog/CatalogSearch";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { QuestCard } from "@/components/catalog/QuestCard";

export const dynamic = "force-dynamic";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: { q?: string; trail?: string };
}) {
  const q = searchParams.q?.trim() || undefined;
  const trailSlug = searchParams.trail || undefined;

  const [trails, stats, allTrails] = await Promise.all([
    getCatalog({ q, trailSlug }),
    getCatalogStats(),
    prisma.trail.findMany({ orderBy: { order: "asc" }, select: { slug: true, title_ja: true } }),
  ]);

  const hasResults = trails.some((t) => t.quests.length > 0);

  return (
    <div className="p-8">

      {/* ── Page header ── */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-[22px] font-semibold text-slate-900 tracking-[-0.01em]">Catalog</h1>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-500">
            {stats.trails} {stats.trails === 1 ? "trail" : "trails"} · {stats.quests} {stats.quests === 1 ? "quest" : "quests"} · {stats.chapters} {stats.chapters === 1 ? "chapter" : "chapters"}
          </span>
        </div>
        <p className="text-sm text-slate-500">Browse all learning paths</p>
      </div>

      {/* ── Search bar ── */}
      <div className="mb-5">
        <CatalogSearch defaultValue={q} />
      </div>

      {/* ── Trail filter pills ── */}
      <div className="mb-8">
        <CatalogFilters trails={allTrails} activeSlug={trailSlug} />
      </div>

      {/* ── Empty state ── */}
      {!hasResults && q && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-slate-400 mb-2">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div className="text-[16px] font-medium text-slate-700 mb-1">
            No results for &ldquo;{q}&rdquo;
          </div>
          <div className="text-sm text-slate-400 mb-5">
            Try a different keyword or clear your search.
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center px-4 py-2 rounded-[6px] text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "#1E3A5F" }}
          >
            Clear search
          </Link>
        </div>
      )}

      {/* ── Trail sections ── */}
      {hasResults && (
        <div className="space-y-12">
          {trails.map((trail) => (
            <section key={trail.id}>
              {/* Trail header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h2 className="text-[18px] font-semibold text-slate-900">{trail.title_ja}</h2>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-500">
                      {trail.quests.length} {trail.quests.length === 1 ? "quest" : "quests"}
                    </span>
                  </div>
                  {trail.description_ja && (
                    <p className="text-sm text-slate-500">{trail.description_ja}</p>
                  )}
                </div>
              </div>

              {/* Quest grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trail.quests.map((quest) => (
                  <QuestCard key={quest.id} quest={quest} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

    </div>
  );
}
