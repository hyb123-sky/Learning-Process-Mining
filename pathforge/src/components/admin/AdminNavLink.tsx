'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';

export function AdminNavLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
        isActive
          ? 'bg-accent font-medium text-foreground'
          : 'hover:bg-accent text-muted-foreground hover:text-foreground'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
