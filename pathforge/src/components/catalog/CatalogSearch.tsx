"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export function CatalogSearch({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  function navigate(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }
    router.push(`/catalog?${params.toString()}`);
  }

  return (
    <div className="relative w-full max-w-xl">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 flex pointer-events-none">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7" cy="7" r="5" />
          <line x1="11" y1="11" x2="14.5" y2="14.5" />
        </svg>
      </span>
      <input
        ref={inputRef}
        type="text"
        defaultValue={defaultValue}
        placeholder="Search modules, papers, or terms..."
        className="w-full h-10 bg-white border border-slate-200 rounded-[6px] text-sm text-slate-900 pl-10 pr-3 outline-none focus:border-slate-400 focus:ring-0 placeholder:text-slate-400 transition-colors"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(e.currentTarget.value);
          }
        }}
      />
    </div>
  );
}
