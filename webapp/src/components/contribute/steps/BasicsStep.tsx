import type { CategoryKey } from '@opensteps/types';
import { CATEGORIES } from '@opensteps/constants';
import type { GuideDraft } from '../types';

const label = 'block text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)] mb-1.5';
const input =
  'w-full px-3 py-2 bg-white border border-[var(--color-surface3)] rounded-[var(  --radius)] text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)/20] focus:border-[var(--color-green)] transition-colors';

interface Props {
  draft: GuideDraft;
  updateDraft: (updates: Partial<GuideDraft>) => void;
}

export function BasicsStep({ draft, updateDraft }: Props) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5">
      {/* Title — full width */}
      <div className="col-span-2">
        <label className={label}>Title</label>
        <input
          className={input}
          value={draft.title}
          onChange={(e) => updateDraft({ title: e.target.value })}
          placeholder="Register a business"
          autoFocus
        />
      </div>

      {/* Category */}
      <div>
        <label className={label}>Category</label>
        <select
          className={input}
          value={draft.category}
          onChange={(e) => updateDraft({ category: e.target.value as CategoryKey | '' })}
        >
          <option value="">Select category</option>
          {CATEGORIES.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Country */}
      <div>
        <label className={label}>Country</label>
        <input
          className={input}
          value={draft.country}
          onChange={(e) => updateDraft({ country: e.target.value })}
          placeholder="Sierra Leone"
        />
      </div>

      {/* City / Region */}
      <div>
        <label className={label}>City / Region</label>
        <input
          className={input}
          value={draft.city}
          onChange={(e) => updateDraft({ city: e.target.value })}
          placeholder="Freetown"
        />
      </div>

      {/* Estimated time */}
      <div>
        <label className={label}>Estimated Time</label>
        <input
          className={input}
          value={draft.estimated_time}
          onChange={(e) => updateDraft({ estimated_time: e.target.value })}
          placeholder="2–3 business days"
        />
      </div>

      {/* Estimated cost */}
      <div>
        <label className={label}>Estimated Cost</label>
        <input
          className={input}
          value={draft.estimated_cost}
          onChange={(e) => updateDraft({ estimated_cost: e.target.value })}
          placeholder="Le 150,000"
        />
      </div>

      {/* Description — full width */}
      <div className="col-span-2">
        <label className={label}>Short Description</label>
        <textarea
          className={`${input} resize-none`}
          rows={3}
          value={draft.description}
          onChange={(e) => updateDraft({ description: e.target.value })}
          placeholder="Briefly describe what this guide covers and who it's for…"
        />
      </div>
    </div>
  );
}
