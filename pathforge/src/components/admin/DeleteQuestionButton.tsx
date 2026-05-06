'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteQuestion } from '@/actions/admin/question';
import { Trash2 } from 'lucide-react';

export function DeleteQuestionButton({ id, large = false }: { id: string; large?: boolean }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm('この問題を削除しますか？')) return;
        startTransition(async () => {
          await deleteQuestion(id);
          if (large) {
            router.push('/admin/questions');
          }
          router.refresh();
        });
      }}
      className={`inline-flex items-center gap-1.5 text-destructive hover:bg-destructive/10 rounded-md disabled:opacity-50 ${
        large ? 'px-3 py-1.5 text-sm' : 'px-2 py-1 text-xs'
      }`}
    >
      <Trash2 className={large ? 'h-4 w-4' : 'h-3 w-3'} />
      {pending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
