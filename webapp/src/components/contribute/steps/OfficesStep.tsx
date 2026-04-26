'use client';

import type { GuideDraft, OfficeDraft } from '../types';

const label = 'block text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)] mb-1';
const input =
  'w-full px-2.5 py-1.5 bg-white border border-[var(--color-surface3)] rounded-[var(--radius)] text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)/20] focus:border-[var(--color-green)] transition-colors';

interface Props {
  draft: GuideDraft;
  updateDraft: (updates: Partial<GuideDraft>) => void;
}

function newOffice(): OfficeDraft {
  return { id: crypto.randomUUID(), name: '', address: '', hours: '' };
}

export function OfficesStep({ draft, updateDraft }: Props) {
  const offices = draft.offices;

  function add() {
    updateDraft({ offices: [...offices, newOffice()] });
  }

  function patch(id: string, updates: Partial<OfficeDraft>) {
    updateDraft({ offices: offices.map((o) => (o.id === id ? { ...o, ...updates } : o)) });
  }

  function remove(id: string) {
    updateDraft({ offices: offices.filter((o) => o.id !== id) });
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--color-ink-3)]">
        Which offices or locations does someone visit? Add name, address, and opening hours where you know them.
      </p>

      {offices.map((office, i) => (
        <div
          key={office.id}
          className="p-4 border border-[var(--color-surface3)] rounded-lg bg-[var(--color-surface2)] space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[var(--color-ink-3)]">Office {i + 1}</span>
            <button
              type="button"
              onClick={() => remove(office.id)}
              className="text-[var(--color-ink-4)] hover:text-[var(--color-red)] text-lg leading-none transition-colors"
              aria-label="Remove office"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className={label}>Office name</label>
              <input
                className={input}
                value={office.name}
                onChange={(e) => patch(office.id, { name: e.target.value })}
                placeholder="e.g. Corporate Affairs Commission (CAC)"
              />
            </div>
            <div>
              <label className={label}>Address</label>
              <input
                className={input}
                value={office.address}
                onChange={(e) => patch(office.id, { address: e.target.value })}
                placeholder="e.g. Siaka Stevens St, Freetown"
              />
            </div>
            <div>
              <label className={label}>Opening hours</label>
              <input
                className={input}
                value={office.hours}
                onChange={(e) => patch(office.id, { hours: e.target.value })}
                placeholder="e.g. Mon–Fri 8am–5pm"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="w-full py-3 border-2 border-dashed border-[var(--color-surface3)] rounded-lg text-sm text-[var(--color-ink-3)] hover:border-[var(--color-green)] hover:text-[var(--color-green)] transition-colors flex items-center justify-center gap-2"
      >
        <span className="text-lg leading-none">+</span> Add office
      </button>

      {offices.length === 0 && (
        <p className="text-xs text-[var(--color-ink-4)] italic">
          Optional — add offices if you know where to go. Leave blank if not applicable.
        </p>
      )}
    </div>
  );
}
