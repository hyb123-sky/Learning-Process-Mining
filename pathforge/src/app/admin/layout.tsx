import { redirect } from 'next/navigation';
import { getCurrentUserRole } from '@/lib/auth/role';
import Link from 'next/link';
import { LayoutDashboard, BookOpen, FileQuestion, Map } from 'lucide-react';
import { AdminNavLink } from '@/components/admin/AdminNavLink';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const role = await getCurrentUserRole();
  if (role !== 'admin' && role !== 'author') {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 border-r bg-muted/30 p-4">
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Author Mode
          </p>
          <p className="text-sm text-muted-foreground">
            {role === 'admin' ? 'Administrator' : 'Author'}
          </p>
        </div>
        <nav className="space-y-1">
          <AdminNavLink href="/admin" icon={LayoutDashboard} label="Dashboard" />
          <AdminNavLink href="/admin/trails" icon={Map} label="Trails" />
          <AdminNavLink href="/admin/quests" icon={BookOpen} label="Quests" />
          <AdminNavLink href="/admin/chapters" icon={FileQuestion} label="Chapters" />
        </nav>
        <div className="mt-8 border-t pt-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to learner view
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
