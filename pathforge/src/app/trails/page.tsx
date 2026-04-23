import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CrestBadge } from "@/components/shared/CrestBadge";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function TrailsPage() {
  const trails = await prisma.trail.findMany({
    orderBy: { order: "asc" },
    include: { quests: { orderBy: { order: "asc" } } },
  });
  return (
    <div className="container max-w-4xl py-10">
      <p className="eyebrow">Learning Trails</p>
      <h1 className="font-display text-4xl font-medium text-pf-navy">すべての旅路</h1>
      <div className="mt-8 space-y-6">
        {trails.map((t) => (
          <div key={t.id}>
            <div className="mb-3 flex items-center gap-3">
              <CrestBadge variant="shield" size={28} stroke={1.4} />
              <h2 className="font-display text-2xl text-pf-navy">{t.title_ja}</h2>
            </div>
            <p className="mb-3 text-sm text-pf-text-secondary">{t.description_ja}</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {t.quests.map((q) => (
                <Link key={q.id} href={`/quest/${q.slug}`}>
                  <Card className="pf-card-hover h-full">
                    <div className="eyebrow">{q.crestName}</div>
                    <h3 className="mt-1 font-display text-lg text-pf-navy">{q.title_ja}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-pf-text-secondary">{q.description_ja}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
