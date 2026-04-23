"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { upsertChapter } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { MdxLivePreview } from "./MdxLivePreview";

type Initial = {
  id?: string;
  slug: string;
  title_ja: string;
  title_en: string;
  questId: string;
  order: number;
  contentMdx: string;
  estimatedMinutes: number;
  insightReward: number;
};

export function ChapterEditor({
  initial,
  quests,
}: {
  initial: Initial;
  quests: { id: string; title: string }[];
}) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [debouncedMdx, setDebouncedMdx] = useState(initial.contentMdx);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState<string | null>(null);

  // debounce 500ms
  useMemo(() => {
    const t = setTimeout(() => setDebouncedMdx(form.contentMdx), 500);
    return () => clearTimeout(t);
  }, [form.contentMdx]);

  const save = () => {
    startTransition(async () => {
      await upsertChapter(form);
      setSaved(new Date().toLocaleTimeString());
      router.refresh();
    });
  };

  const field = <K extends keyof Initial>(k: K, v: Initial[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div>
      <p className="eyebrow">Edit Chapter</p>
      <h1 className="font-display text-3xl text-pf-navy">{form.title_ja || "(無題)"}</h1>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <Label>Quest</Label>
          <select
            className="mt-1 flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm"
            value={form.questId}
            onChange={(e) => field("questId", e.target.value)}
          >
            {quests.map((q) => (
              <option key={q.id} value={q.id}>{q.title}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Slug</Label>
          <Input value={form.slug} onChange={(e) => field("slug", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Order</Label>
          <Input
            type="number"
            value={form.order}
            onChange={(e) => field("order", Number(e.target.value))}
            className="mt-1"
          />
        </div>
        <div>
          <Label>Title (JA)</Label>
          <Input
            value={form.title_ja}
            onChange={(e) => field("title_ja", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label>Title (EN)</Label>
          <Input
            value={form.title_en}
            onChange={(e) => field("title_en", e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Minutes</Label>
            <Input
              type="number"
              value={form.estimatedMinutes}
              onChange={(e) => field("estimatedMinutes", Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Insight</Label>
            <Input
              type="number"
              value={form.insightReward}
              onChange={(e) => field("insightReward", Number(e.target.value))}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <Label>MDX Content</Label>
            <span className="font-mono text-[10px] uppercase tracking-widest text-pf-text-muted">
              {form.contentMdx.length.toLocaleString()} chars
            </span>
          </div>
          <Textarea
            value={form.contentMdx}
            onChange={(e) => field("contentMdx", e.target.value)}
            spellCheck={false}
            className="font-mono min-h-[620px] text-[12.5px] leading-relaxed"
          />
        </div>
        <div>
          <Label>Preview</Label>
          <div className="mt-1 rounded-md border border-border bg-card p-5">
            <MdxLivePreview source={debouncedMdx} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button variant="gold" disabled={pending} onClick={save}>
          {pending ? "保存中…" : "保存"}
        </Button>
        {saved && (
          <span className="font-mono text-[11px] uppercase tracking-widest text-pf-success">
            保存済み · {saved}
          </span>
        )}
      </div>
    </div>
  );
}
