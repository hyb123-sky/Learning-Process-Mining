'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { upsertQuestion, type QuestionFormState } from '@/actions/admin/question';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Option = { key: string; text_ja: string; text_en: string };
type QType = 'mcq' | 'multi_select' | 'true_false';
type Difficulty = 'easy' | 'medium' | 'hard';

export type InitialQuestion = {
  id?: string;
  chapterId: string;
  order: number;
  type: QType;
  stem_ja: string;
  options: Option[];
  correctKeys: string[];
  explain_ja: string;
  explain_en: string;
  difficulty: Difficulty;
  tags: string[];
};

const TF_OPTIONS: Option[] = [
  { key: 'T', text_ja: '正しい', text_en: 'True' },
  { key: 'F', text_ja: '誤り', text_en: 'False' },
];
const DEFAULT_OPTIONS: Option[] = [
  { key: 'A', text_ja: '', text_en: '' },
  { key: 'B', text_ja: '', text_en: '' },
];
const OPTION_KEYS = ['A', 'B', 'C', 'D', 'E', 'F'];
const TYPE_LABELS: Record<QType, string> = {
  mcq: 'Multiple choice (1)',
  multi_select: 'Multiple select (≥1)',
  true_false: 'True / False',
};
const DIFF_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

const initialFormState: QuestionFormState = { ok: true };

export function QuestionForm({
  initial,
  chapters,
}: {
  initial: InitialQuestion;
  chapters: { id: string; label: string }[];
}) {
  const [state, formAction] = useFormState(upsertQuestion, initialFormState);

  const [type, setType] = useState<QType>(initial.type);
  const [options, setOptions] = useState<Option[]>(initial.options);
  const [correctKeys, setCorrectKeys] = useState<string[]>(initial.correctKeys);
  const [difficulty, setDifficulty] = useState<Difficulty>(initial.difficulty);
  const [tags, setTags] = useState<string[]>(initial.tags);
  const [tagInput, setTagInput] = useState('');

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (type === 'true_false') {
      setOptions(TF_OPTIONS);
    } else {
      setOptions([...DEFAULT_OPTIONS]);
    }
    setCorrectKeys([]);
  }, [type]);

  const isTF = type === 'true_false';

  function toggleCorrect(key: string) {
    if (type === 'mcq' || type === 'true_false') {
      setCorrectKeys([key]);
    } else {
      setCorrectKeys((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      );
    }
  }

  function addOption() {
    if (options.length >= OPTION_KEYS.length) return;
    const usedKeys = new Set(options.map((o) => o.key));
    const nextKey = OPTION_KEYS.find((k) => !usedKeys.has(k));
    if (!nextKey) return;
    setOptions((prev) => [...prev, { key: nextKey, text_ja: '', text_en: '' }]);
  }

  function removeOption(key: string) {
    setOptions((prev) => prev.filter((o) => o.key !== key));
    setCorrectKeys((prev) => prev.filter((k) => k !== key));
  }

  function updateOption(key: string, field: 'text_ja' | 'text_en', value: string) {
    setOptions((prev) => prev.map((o) => (o.key === key ? { ...o, [field]: value } : o)));
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const val = tagInput.trim();
    if (val && !tags.includes(val)) {
      setTags((prev) => [...prev, val]);
    }
    setTagInput('');
  }

  return (
    <form action={formAction} className="space-y-7">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <input type="hidden" name="options" value={JSON.stringify(options)} />
      <input type="hidden" name="correctKeys" value={JSON.stringify(correctKeys)} />
      <input type="hidden" name="tags" value={JSON.stringify(tags)} />
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="difficulty" value={difficulty} />

      {!state.ok && state.message && (
        <div className="bg-destructive/10 text-destructive border border-destructive/30 rounded-md px-4 py-3 text-sm">
          {state.message}
        </div>
      )}

      {/* Chapter + Order */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_100px] gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Chapter</label>
          <select
            name="chapterId"
            defaultValue={initial.chapterId}
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          {state.errors?.chapterId && (
            <p className="text-xs text-destructive mt-1">{state.errors.chapterId[0]}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Order</label>
          <input
            name="order"
            type="number"
            defaultValue={String(initial.order)}
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {state.errors?.order && (
            <p className="text-xs text-destructive mt-1">{state.errors.order[0]}</p>
          )}
        </div>
      </div>

      {/* Type selector pills */}
      <div>
        <label className="block text-sm font-medium mb-2">Question type</label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(TYPE_LABELS) as QType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm font-medium border transition-colors',
                type === t
                  ? 'bg-pf-navy text-white border-pf-navy'
                  : 'bg-white text-pf-text-secondary border-border hover:border-pf-navy'
              )}
            >
              {TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty pills */}
      <div>
        <label className="block text-sm font-medium mb-2">Difficulty</label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(DIFF_LABELS) as Difficulty[]).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDifficulty(d)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm font-medium border transition-colors',
                difficulty === d
                  ? 'bg-pf-navy text-white border-pf-navy'
                  : 'bg-white text-pf-text-secondary border-border hover:border-pf-navy'
              )}
            >
              {DIFF_LABELS[d]}
            </button>
          ))}
        </div>
      </div>

      {/* Stem */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Question stem (Japanese)</label>
        <textarea
          name="stem_ja"
          rows={3}
          defaultValue={initial.stem_ja}
          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
        />
        {state.errors?.stem_ja && (
          <p className="text-xs text-destructive mt-1">{state.errors.stem_ja[0]}</p>
        )}
      </div>

      {/* Options builder */}
      <div>
        <label className="block text-sm font-medium mb-3">
          Answer options
          {type === 'mcq' && (
            <span className="ml-2 text-xs text-pf-text-secondary font-normal">
              — click circle to mark correct
            </span>
          )}
          {type === 'multi_select' && (
            <span className="ml-2 text-xs text-pf-text-secondary font-normal">
              — click circle to toggle correct
            </span>
          )}
        </label>

        {state.errors?.options && (
          <p className="text-xs text-destructive mb-2">{state.errors.options[0]}</p>
        )}
        {state.errors?.correctKeys && (
          <p className="text-xs text-destructive mb-2">{state.errors.correctKeys[0]}</p>
        )}

        <div className="space-y-2">
          {options.map((opt) => {
            const isCorrect = correctKeys.includes(opt.key);
            return (
              <div key={opt.key} className="flex items-center gap-3">
                {/* Correct toggle */}
                <button
                  type="button"
                  onClick={() => toggleCorrect(opt.key)}
                  title={isCorrect ? 'Correct answer' : 'Mark as correct'}
                  className={cn(
                    'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
                    isCorrect
                      ? 'bg-pf-navy border-pf-navy text-white'
                      : 'border-border hover:border-pf-navy'
                  )}
                >
                  {isCorrect && (
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 12 12"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>

                {/* Key label */}
                <span className="flex-shrink-0 w-5 text-center font-mono text-xs text-pf-text-secondary">
                  {opt.key}
                </span>

                {/* text_ja */}
                <input
                  type="text"
                  value={opt.text_ja}
                  onChange={(e) => updateOption(opt.key, 'text_ja', e.target.value)}
                  placeholder="日本語テキスト"
                  disabled={isTF}
                  className="flex-1 px-3 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-muted disabled:text-muted-foreground"
                />

                {/* text_en */}
                <input
                  type="text"
                  value={opt.text_en}
                  onChange={(e) => updateOption(opt.key, 'text_en', e.target.value)}
                  placeholder="English text"
                  disabled={isTF}
                  className="flex-1 px-3 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-muted disabled:text-muted-foreground"
                />

                {/* Remove */}
                {!isTF && options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(opt.key)}
                    className="flex-shrink-0 p-1 text-pf-text-secondary hover:text-destructive rounded"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                {/* Spacer to keep alignment when remove button absent */}
                {!isTF && options.length <= 2 && <div className="w-6 flex-shrink-0" />}
              </div>
            );
          })}
        </div>

        {!isTF && options.length < OPTION_KEYS.length && (
          <button
            type="button"
            onClick={addOption}
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-pf-text-secondary hover:text-pf-navy"
          >
            <Plus className="h-3.5 w-3.5" />
            Add option
          </button>
        )}
      </div>

      {/* Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Explanation (Japanese)</label>
          <textarea
            name="explain_ja"
            rows={4}
            defaultValue={initial.explain_ja}
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
          />
          {state.errors?.explain_ja && (
            <p className="text-xs text-destructive mt-1">{state.errors.explain_ja[0]}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Explanation (English)</label>
          <textarea
            name="explain_en"
            rows={4}
            defaultValue={initial.explain_en}
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
          />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Tags</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-pf-navy/10 text-pf-navy rounded text-xs font-medium"
            >
              {tag}
              <button
                type="button"
                onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}
                className="hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="Type tag and press Enter"
          className="w-full max-w-sm px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-4 border-t">
        <SubmitButton isUpdate={!!initial.id} />
      </div>
    </form>
  );
}

function SubmitButton({ isUpdate }: { isUpdate: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : isUpdate ? 'Update question' : 'Create question'}
    </Button>
  );
}
