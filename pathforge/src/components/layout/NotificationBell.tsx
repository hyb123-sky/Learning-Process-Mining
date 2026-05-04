"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function NotificationBell() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="w-9 h-9 rounded-[6px] flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          aria-label="Notifications"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 2a6 6 0 0 1 6 6c0 3.5 1.5 5 1.5 5h-15S4 11.5 4 8a6 6 0 0 1 6-6z" />
            <path d="M8.5 17a1.5 1.5 0 0 0 3 0" />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="text-sm text-slate-500 p-4 text-center">
          通知はありません
        </div>
      </PopoverContent>
    </Popover>
  );
}
