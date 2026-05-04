import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth/role";
import { ChapterContent } from "@/components/quest/ChapterContent";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ChapterReader({
  params,
}: {
  params: { slug: string; chapter: string };
}) {
  const quest = await prisma.quest.findUnique({
    where: { slug: params.slug },
    include: { chapters: { orderBy: { order: "asc" } } },
  });
  if (!quest) return notFound();
  const chapter = quest.chapters.find((c) => c.slug === params.chapter);
  if (!chapter) return notFound();

  const userId = await getCurrentUserId();
  // Mark in_progress on read if currently available
  const prog = await prisma.chapterProgress.findUnique({
    where: { userId_chapterId: { userId, chapterId: chapter.id } },
  });
  if (!prog) {
    await prisma.chapterProgress.create({
      data: { userId, chapterId: chapter.id, status: "in_progress" },
    });
  } else if (prog.status === "available") {
    await prisma.chapterProgress.update({
      where: { id: prog.id },
      data: { status: "in_progress" },
    });
  }

  return (
    <div className="container max-w-3xl py-10 pb-28">
      <nav className="eyebrow mb-2">
        <Link href="/" className="hover:underline">Path</Link>
        <span className="mx-1.5 opacity-60">›</span>
        <Link href={`/quest/${quest.slug}`} className="hover:underline">{quest.title_ja}</Link>
        <span className="mx-1.5 opacity-60">›</span>
        <span className="text-pf-text-muted">Ch. {String(chapter.order + 1).padStart(2, "0")}</span>
      </nav>
      <h1 className="font-display text-[2.25rem] font-medium leading-tight text-pf-navy">
        {chapter.title_ja}
      </h1>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-pf-text-muted">
        {chapter.estimatedMinutes} min · {chapter.insightReward} Insight
      </p>

      <div className="my-6 h-px bg-border" />

      <ChapterContent contentMdx={chapter.contentMdx} />

      {/* Sticky footer CTA */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-pf-ivory/90 backdrop-blur">
        <div className="container flex max-w-3xl items-center justify-between py-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-pf-text-muted">
            読み終えたら、試練へ。
          </span>
          <Link href={`/quest/${quest.slug}/${chapter.slug}/trial`}>
            <Button variant="gold" className="gap-2">
              Trial を始める <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
