import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { BookOpen, FileQuestion, Map, Users, type LucideIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [trails, quests, chapters, questions] = await Promise.all([
    prisma.trail.count(),
    prisma.quest.count(),
    prisma.chapter.count(),
    prisma.question.count(),
  ]);

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Author dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage learning content across the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Trails" value={trails} icon={Map} href="/admin/trails" />
        <StatCard label="Quests" value={quests} icon={BookOpen} href="/admin/quests" />
        <StatCard label="Chapters" value={chapters} icon={FileQuestion} href="/admin/chapters" />
        <StatCard label="Questions" value={questions} icon={Users} href="/admin/chapters" />
      </div>

      <div className="bg-muted/30 rounded-lg p-6 border">
        <h2 className="text-lg font-medium mb-2">Quick start</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Create a new <Link href="/admin/quests/new" className="text-primary underline-offset-4 hover:underline">Quest</Link> to group related chapters</li>
          <li>• Add <Link href="/admin/chapters" className="text-primary underline-offset-4 hover:underline">Chapters</Link> with rich MDX content (coming in next session)</li>
          <li>• Define exam questions per chapter (coming in next session)</li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, href }: { label: string; value: number; icon: LucideIcon; href: string }) {
  return (
    <Link
      href={href}
      className="block bg-background border rounded-lg p-4 hover:border-primary/50 transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="text-2xl font-semibold">{value}</p>
    </Link>
  );
}
