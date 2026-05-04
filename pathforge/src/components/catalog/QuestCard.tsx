import Link from "next/link";
import type { CatalogQuest } from "@/lib/queries/catalog";

const STATUS_STYLES = {
  not_started: { label: "Not started", bg: "bg-slate-100", text: "text-slate-500" },
  in_progress:  { label: "In progress", bg: "bg-amber-50",  text: "text-amber-700" },
  completed:    { label: "Completed",   bg: "bg-emerald-50", text: "text-emerald-700" },
};

export function QuestCard({ quest }: { quest: CatalogQuest }) {
  const pct =
    quest.chapterCount > 0
      ? Math.round((quest.completedChapters / quest.chapterCount) * 100)
      : 0;
  const { label, bg, text } = STATUS_STYLES[quest.status];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col gap-3 hover:shadow-md hover:border-slate-300 transition-all">
      {/* Crest icon */}
      <div style={{ color: "#1E3A5F" }}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>

      {/* Title */}
      <div className="font-semibold text-slate-900 leading-snug line-clamp-2">
        {quest.title_ja}
      </div>

      {/* Description */}
      <div className="text-sm text-slate-500 leading-[1.55] line-clamp-3">
        {quest.description_ja}
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-2 text-[12px] text-slate-400">
        <span>{quest.chapterCount} chapters</span>
        <span>·</span>
        <span>{quest.estimatedMinutes} min</span>
        <span>·</span>
        <span>{quest.questionCount} questions</span>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] text-slate-400">
            {quest.completedChapters}/{quest.chapterCount} chapters
          </span>
          <span className="text-[11px] text-slate-400">{pct}%</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-[width]"
            style={{ width: `${pct}%`, background: "#1E3A5F" }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${bg} ${text}`}>
          {label}
        </span>
        <Link
          href={`/quest/${quest.slug}`}
          className="inline-flex items-center gap-1 text-[13px] font-semibold text-white px-3 py-1.5 rounded-[6px] transition-opacity hover:opacity-90"
          style={{ background: "#1E3A5F" }}
        >
          Open quest →
        </Link>
      </div>
    </div>
  );
}
