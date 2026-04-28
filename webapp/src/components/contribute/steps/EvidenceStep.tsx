import type { JSX } from 'react';
import type { GuideDraft } from '../types';

const label = 'block text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)] mb-1.5';
const input =
  'w-full px-3 py-2 bg-white border border-[var(--color-surface3)] rounded-[var(--radius)] text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] focus:border-[var(--color-green)] transition-colors resize-none';

interface Props {
  draft: GuideDraft;
  updateDraft: (updates: Partial<GuideDraft>) => void;
}

export function EvidenceStep({ draft, updateDraft }: Props): JSX.Element {
  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--color-ink-3)]">
        Evidence — receipts, forms, or photos — makes guides trustworthy. Describe what you have.
        After submission, an editor will contact you to collect the files.
      </p>

      {/* Evidence notes */}
      <div>
        <label className={label}>Describe your evidence</label>
        <textarea
          className={input}
          rows={5}
          value={draft.evidence_notes}
          onChange={(e) => updateDraft({ evidence_notes: e.target.value })}
          placeholder={`e.g.\n— Yellow payment receipt from Rokel Bank (Le 50,000)\n— Printed Form A from CAC website\n— Photo of completed application form`}
        />
      </div>

      {/* Tips */}
      <div className="bg-[var(--color-green-tint)] border border-[var(--color-green-soft)] rounded-lg p-4 space-y-2">
        <p className="text-xs font-semibold text-[var(--color-green)]">What counts as good evidence?</p>
        <ul className="text-xs text-[var(--color-ink-2)] space-y-1 list-disc list-inside">
          <li>Receipts showing amounts paid, office name, and date</li>
          <li>Printed or filled government forms</li>
          <li>Photos of queues, offices, or signage</li>
          <li>Screenshots of online portals or e-receipts</li>
        </ul>
        <p className="text-xs text-[var(--color-ink-3)] mt-2">
          Sensitive info (full names, ID numbers) will be redacted before publishing.
        </p>
      </div>
    </div>
  );
}
