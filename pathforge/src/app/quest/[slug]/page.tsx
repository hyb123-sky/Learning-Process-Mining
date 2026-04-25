import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CURRENT_USER_ID } from "@/lib/constants";
import { CrestBadge } from "@/components/shared/CrestBadge";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Check, Play } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function QuestDetail({ params }: { params: { slug: string } }) {
  const quest = await prisma.quest.findUnique({
    where: { slug: params.slug },
    include: {
      trail: true,
      chapters: { orderBy: { order: "asc" }, include: { questions: true } },
    },
  });
  if (!quest) return notFound();

  const progress = await prisma.chapterProgress.findMany({
    where: { userId: CURRENT_USER_ID, chapterId: { in: quest.chapters.map((c) => c.id) } },
  });
  const progMap = new Map(progress.map((p) => [p.chapterId, p]));

  // Unlock rule: Ch(N) available iff Ch(N-1).status === 'completed'; Ch01 always available
  const statusFor = (i: number, id: string) => {
    const stored = progMap.get(id)?.status;
    if (stored === "completed") return "completed" as const;
    if (i === 0) return stored ?? "available";
    const prev = quest.chapters[i - 1];
    const prevStatus = progMap.get(prev.id)?.status;
    if (prevStatus !== "completed") return "locked" as const;
    return stored === "in_progress" ? "in_progress" : "available";
  };

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-6 flex items-start gap-5">
        <CrestBadge variant="shield" size={88} stroke={1.3} />
        <div className="flex-1">
          <Link href="/" className="eyebrow mb-1 inline-flex items-center text-pf-gold-muted hover:underline">
            ← {quest.trail.title_ja}
          </Link>
          <h1 className="mt-1 font-display text-4xl font-medium text-pf-navy">{quest.title_ja}</h1>
          <p className="mt-2 text-sm text-pf-text-secondary">{quest.description_ja}</p>
          <div className="mt-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-pf-text-muted">
            <span>{quest.chapters.length} Chapters</span>
            <span>·</span>
            <span>~{quest.estimatedMinutes} min</span>
            <span>·</span>
            <span>{quest.crestName}</span>
          </div>
        </div>
      </div>

      <div className="my-6 h-px bg-border" />

      <div className="space-y-2">
        {quest.chapters.map((c, i) => {
          const st = statusFor(i, c.id);
          const prog = progMap.get(c.id);
          const locked = st === "locked";
          const href = `/quest/${quest.slug}/${c.slug}`;
          const cardClass = `flex items-center gap-4 pf-card-hover ${locked ? "opacity-50" : ""}`;
          const inner = (
            <Card className={cardClass}>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-pf-navy/80 font-mono text-sm font-bold text-pf-navy">
                  {st === "completed" ? <Check className="h-4 w-4" /> :
                   locked ? <Lock className="h-4 w-4" /> :
                   String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <div className="eyebrow">Ch. {String(i + 1).padStart(2, "0")} · {c.estimatedMinutes} min · {c.questions.length} 問</div>
                  <h3 className="font-display text-lg font-medium text-pf-navy">{c.title_ja}</h3>
                </div>
                <div className="flex items-center gap-2">
                  {st === "completed" && <Badge variant="success">合格 · {prog?.bestScore}%</Badge>}
                  {st === "in_progress" && <Badge variant="warning">Retry 推奨 · {prog?.bestScore}%</Badge>}
                  {st === "available" && (
                    <Badge variant="gold">
                      <Play className="h-3 w-3" /> 挑戦可
                    </Badge>
                  )}
                  {locked && <Badge variant="muted">ロック中</Badge>}
                </div>
            </Card>
          );
          return locked ? (
            <div key={c.id}>{inner}</div>
          ) : (
            <Link key={c.id} href={href}>{inner}</Link>
          );
        })}
      </div>
    </div>
  );
}
