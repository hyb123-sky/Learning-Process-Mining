'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { upsertQuest, type QuestFormState } from '@/actions/admin/quest';
import type { Quest, Trail } from '@prisma/client';
import { Button } from '@/components/ui/button';

const initialState: QuestFormState = { ok: true };

export function QuestForm({ quest, trails }: { quest?: Quest; trails: Trail[] }) {
  const [state, formAction] = useFormState(upsertQuest, initialState);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      {quest?.id && <input type="hidden" name="id" value={quest.id} />}

      {state.message && !state.ok && (
        <div className="bg-destructive/10 text-destructive border border-destructive/30 rounded-md px-4 py-3 text-sm">
          {state.message}
        </div>
      )}

      <Field
        name="slug"
        label="Slug"
        defaultValue={quest?.slug ?? ''}
        hint="URL-safe identifier. Lowercase, numbers, hyphens only."
        errors={state.errors?.slug}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          name="title_ja"
          label="Title (Japanese)"
          defaultValue={quest?.title_ja ?? ''}
          errors={state.errors?.title_ja}
        />
        <Field
          name="title_en"
          label="Title (English)"
          defaultValue={quest?.title_en ?? ''}
          errors={state.errors?.title_en}
        />
      </div>

      <TextareaField
        name="description_ja"
        label="Description (Japanese)"
        defaultValue={quest?.description_ja ?? ''}
        errors={state.errors?.description_ja}
        rows={3}
      />

      <TextareaField
        name="description_en"
        label="Description (English)"
        defaultValue={quest?.description_en ?? ''}
        errors={state.errors?.description_en}
        rows={3}
      />

      <SelectField
        name="trailId"
        label="Trail"
        defaultValue={quest?.trailId ?? trails[0]?.id ?? ''}
        options={trails.map((t) => ({ value: t.id, label: t.title_ja }))}
        errors={state.errors?.trailId}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          name="order"
          label="Order"
          type="number"
          defaultValue={String(quest?.order ?? 0)}
          errors={state.errors?.order}
        />
        <Field
          name="estimatedMinutes"
          label="Estimated minutes"
          type="number"
          defaultValue={String(quest?.estimatedMinutes ?? 120)}
          errors={state.errors?.estimatedMinutes}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          name="crestName"
          label="Crest name"
          defaultValue={quest?.crestName ?? 'Shield of Insight'}
          errors={state.errors?.crestName}
        />
        <Field
          name="crestIcon"
          label="Crest icon (Lucide name)"
          defaultValue={quest?.crestIcon ?? 'shield'}
          errors={state.errors?.crestIcon}
        />
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <SubmitButton isUpdate={!!quest?.id} />
      </div>
    </form>
  );
}

function Field({ name, label, defaultValue, hint, errors, type = 'text' }: any) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
      {errors?.length > 0 && <p className="text-xs text-destructive mt-1">{errors[0]}</p>}
    </div>
  );
}

function TextareaField({ name, label, defaultValue, errors, rows = 3 }: any) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1.5">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
      />
      {errors?.length > 0 && <p className="text-xs text-destructive mt-1">{errors[0]}</p>}
    </div>
  );
}

function SelectField({ name, label, defaultValue, options, errors }: any) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1.5">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        {options.map((o: any) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {errors?.length > 0 && <p className="text-xs text-destructive mt-1">{errors[0]}</p>}
    </div>
  );
}

function SubmitButton({ isUpdate }: { isUpdate: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : isUpdate ? 'Update quest' : 'Create quest'}
    </Button>
  );
}
