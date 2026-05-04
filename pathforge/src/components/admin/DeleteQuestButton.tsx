'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteQuest } from '@/actions/admin/quest';
import { Trash2 } from 'lucide-react';

export function DeleteQuestButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm('このクエストを削除しますか？関連する Chapter と Question もすべて削除されます。')) return;
        startTransition(async () => {
          await deleteQuest(id);
          router.push('/admin/quests');
        });
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10 rounded-md disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" />
      {pending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
