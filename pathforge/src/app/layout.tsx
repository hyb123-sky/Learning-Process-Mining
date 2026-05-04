import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { getContinueLearningHref } from "@/lib/queries/continue-learning";
import { TopbarSearch } from "@/components/layout/TopbarSearch";
import { NotificationBell } from "@/components/layout/NotificationBell";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PathForge",
  description: "Process mining learning platform",
};

function NavItem({
  href,
  active,
  icon,
  label,
}: {
  href: string;
  active?: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-[9px] px-3 py-2 rounded-[6px] text-sm transition-colors select-none ${
        active
          ? "bg-[#EFF3F8] text-[#1E3A5F] font-semibold"
          : "text-slate-600 font-medium hover:bg-slate-100 hover:text-slate-700"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const continueLearningHref = await getContinueLearningHref();

  return (
    <html lang="en" className={`h-full ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="h-full overflow-hidden flex antialiased" style={{ color: "#0F172A" }}>

        {/* ── Sidebar ── */}
        <aside
          className="w-60 shrink-0 h-full flex flex-col overflow-hidden"
          style={{ background: "#F8FAFC", borderRight: "1px solid #E2E8F0" }}
        >
          {/* Wordmark */}
          <div
            className="shrink-0 text-[17px] font-bold tracking-[-0.02em] text-slate-900"
            style={{ padding: "18px 16px 14px", borderBottom: "1px solid #E2E8F0" }}
          >
            PathForge
          </div>

          {/* Nav scroll area */}
          <nav className="flex-1 overflow-y-auto p-2">
            <div className="text-[11px] font-medium text-slate-500 px-2 pt-3 pb-1.5">Learn</div>

            <NavItem
              href="/"
              active
              label="Home"
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M2 8.5L9 2l7 6.5" /><path d="M4 8v8h10V8" /><path d="M7 16v-4h4v4" />
                </svg>
              }
            />
            <NavItem
              href="/my-learning"
              label="My learning"
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <circle cx="4" cy="4.5" r="2" /><circle cx="14" cy="13.5" r="2" />
                  <path d="M6 4.5h3a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 0 2.5 2.5" />
                </svg>
              }
            />
            <NavItem
              href="/catalog"
              label="Catalog"
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <rect x="1.5" y="1.5" width="6.5" height="6.5" rx="1.5" />
                  <rect x="10" y="1.5" width="6.5" height="6.5" rx="1.5" />
                  <rect x="1.5" y="10" width="6.5" height="6.5" rx="1.5" />
                  <rect x="10" y="10" width="6.5" height="6.5" rx="1.5" />
                </svg>
              }
            />
            <NavItem
              href="/practice"
              label="Practice"
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <circle cx="9" cy="9" r="7" /><circle cx="9" cy="9" r="3.5" />
                  <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
                </svg>
              }
            />
            <NavItem
              href="/library"
              label="Library"
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M9 3.5v11" />
                  <path d="M2.5 3.5c1.5-.8 3-.8 6.5 1 3.5-1.8 5-1.8 6.5-1v10c-1.5-.8-3-.8-6.5 1-3.5-1.8-5-1.8-6.5-1V3.5z" />
                </svg>
              }
            />

            <div className="h-px bg-slate-200 my-2" />
            <div className="text-[11px] font-medium text-slate-500 px-2 pt-1 pb-1.5">Workspace</div>

            <NavItem
              href="/bookmarks"
              label="Bookmarks"
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M4 2h10v15l-5-3-5 3V2z" />
                </svg>
              }
            />
            <NavItem
              href="/notes"
              label="Notes"
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M12.5 2H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5.5L12.5 2z" />
                  <line x1="6.5" y1="8" x2="11.5" y2="8" />
                  <line x1="6.5" y1="11" x2="10" y2="11" />
                </svg>
              }
            />
            <NavItem
              href="/history"
              label="History"
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <circle cx="9" cy="9" r="7" />
                  <path d="M9 5v4l2.5 2.5" />
                </svg>
              }
            />
          </nav>

          {/* User row */}
          <div className="shrink-0" style={{ borderTop: "1px solid #E2E8F0", padding: "12px 16px" }}>
            <div className="flex items-center gap-2.5 cursor-pointer rounded-[6px] px-2 py-1.5 hover:bg-slate-100 transition-colors">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-[11px] font-semibold tracking-[-0.01em]"
                style={{ background: "#1E3A5F" }}
              >
                HY
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-slate-700 truncate">黄煜博</div>
                <div className="text-[11px] text-slate-500 truncate">huang@pathforge.io</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 5l4 4 4-4" />
              </svg>
            </div>
          </div>
        </aside>

        {/* ── Right panel ── */}
        <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">

          {/* Topbar */}
          <div
            className="h-14 shrink-0 bg-white flex items-center gap-4 px-6"
            style={{ borderBottom: "1px solid #E2E8F0" }}
          >
            <div className="text-base font-semibold text-slate-900 whitespace-nowrap">Home</div>

            <TopbarSearch />

            <div className="ml-auto flex items-center gap-3">
              <NotificationBell />
              <Link
                href={continueLearningHref}
                className="inline-flex items-center gap-1.5 text-white text-[13px] font-medium px-3.5 py-2 rounded-[6px] whitespace-nowrap transition-opacity hover:opacity-90"
                style={{ background: "#1E3A5F" }}
              >
                Continue learning
              </Link>
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto bg-white">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}
