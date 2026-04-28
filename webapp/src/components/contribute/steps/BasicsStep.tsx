import type { JSX } from 'react';
import type { CategoryKey } from '@opensteps/types';
import { CATEGORIES, COUNTRIES } from '@opensteps/constants';
import type { GuideDraft } from '../types';

const lbl = 'block text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)] mb-1.5';
const inp =
  'w-full px-3 py-2.5 bg-white border border-[var(--color-surface3)] rounded-[var(--radius)] text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] focus:border-[var(--color-green)] transition-colors';

// Short display label for category chips
const SHORT: Record<CategoryKey, string> = {
  business: 'Business',
  id: 'ID & docs',
  transport: 'Transport',
  health: 'Health',
  education: 'Education',
  tax: 'Tax',
  property: 'Property',
  travel: 'Travel',
};

interface Props {
  draft: GuideDraft;
  updateDraft: (updates: Partial<GuideDraft>) => void;
}

export function BasicsStep({ draft, updateDraft }: Props): JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
      {/* Title — full width */}
      <div className="sm:col-span-2">
        <label className={lbl}>Title</label>
        <input
          className={inp}
          value={draft.title}
          onChange={(e) => updateDraft({ title: e.target.value })}
          placeholder="e.g. Register a small business"
          autoFocus
        />
      </div>

      {/* Category — pill chips, full width */}
      <div className="sm:col-span-2">
        <label className={lbl}>Category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => updateDraft({ category: c.key })}
              className={[
                'px-3 py-1.5 rounded-full text-sm border transition-colors',
                draft.category === c.key
                  ? 'bg-[var(--color-green)] text-white border-[var(--color-green)] font-medium'
                  : 'bg-white text-[var(--color-ink-2)] border-[var(--color-surface3)] hover:border-[var(--color-green)] hover:text-[var(--color-green)]',
              ].join(' ')}
            >
              {SHORT[c.key]}
            </button>
          ))}
        </div>
      </div>

      {/* Country + City on same row (desktop), stacked (mobile) */}
      <div>
        <label className={lbl}>Country</label>
        <select
          className={inp}
          value={draft.country}
          onChange={(e) => updateDraft({ country: e.target.value as import('@opensteps/types').CountryCode })}
        >
          {COUNTRIES.filter((c) => c.active).map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={lbl}>City / Region</label>
        <input
          className={inp}
          value={draft.city}
          onChange={(e) => updateDraft({ city: e.target.value })}
          placeholder="Freetown"
        />
      </div>

      {/* Time + Cost side by side always */}
      <div>
        <label className={lbl}>Estimated Time</label>
        <input
          className={inp}
          value={draft.estimated_time}
          onChange={(e) => updateDraft({ estimated_time: e.target.value })}
          placeholder="2–3 days"
        />
      </div>

      <div>
        <label className={lbl}>Estimated Cost</label>
        <input
          className={inp}
          value={draft.estimated_cost}
          onChange={(e) => updateDraft({ estimated_cost: e.target.value })}
          placeholder="Le 150,000"
        />
      </div>

      {/* Description — full width */}
      <div className="sm:col-span-2">
        <label className={lbl}>Short Description</label>
        <textarea
          className={`${inp} resize-none`}
          rows={3}
          value={draft.description}
          onChange={(e) => updateDraft({ description: e.target.value })}
          placeholder="Briefly describe what this guide covers and who it's for…"
        />
      </div>
    </div>
  );
}
