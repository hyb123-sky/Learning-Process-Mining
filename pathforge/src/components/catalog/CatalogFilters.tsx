"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

type Trail = { slug: string; title_ja: string };

export function CatalogFilters({
  trails,
  activeSlug,
}: {
  trails: Trail[];
  activeSlug?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setTrail(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("trail", slug);
    } else {
      params.delete("trail");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const pillBase =
    "inline-flex items-center px-3 py-1.5 rounded-full text-[13px] font-medium cursor-pointer transition-colors whitespace-nowrap select-none";
  const active = "text-white";
  const inactive = "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={() => setTrail(null)}
        className={`${pillBase} ${!activeSlug ? active : inactive}`}
        style={!activeSlug ? { background: "#1E3A5F" } : undefined}
      >
        All
      </button>
      {trails.map((t) => {
        const isActive = activeSlug === t.slug;
        return (
          <button
            key={t.slug}
            onClick={() => setTrail(t.slug)}
            className={`${pillBase} ${isActive ? active : inactive}`}
            style={isActive ? { background: "#1E3A5F" } : undefined}
          >
            {t.title_ja}
          </button>
        );
      })}
    </div>
  );
}
