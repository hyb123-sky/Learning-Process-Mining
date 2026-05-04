"use client";

import { useRouter } from "next/navigation";

export function TopbarSearch() {
  const router = useRouter();
  return (
    <div className="relative shrink-0 w-[480px]">
      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 flex pointer-events-none">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7" cy="7" r="5" />
          <line x1="11" y1="11" x2="14.5" y2="14.5" />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search modules, papers, or terms..."
        className="w-full h-9 bg-slate-100 border border-transparent rounded-[6px] text-sm text-slate-900 pl-9 pr-3 outline-none focus:border-slate-300 focus:bg-white placeholder:text-slate-400 transition-colors"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value) {
            router.push(`/catalog?q=${encodeURIComponent(e.currentTarget.value)}`);
          }
        }}
      />
    </div>
  );
}
