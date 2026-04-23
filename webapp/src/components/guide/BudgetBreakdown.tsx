import type { BudgetLine } from '@opensteps/types';
import { formatLeone } from '@/lib/format';

const PAYMENT_LABEL: Record<string, string> = {
  bank: 'Bank',
  cash: 'Cash',
  mobile_money: 'Mobile money',
  unofficial: 'Unofficial',
};

export default function BudgetBreakdown({ lines }: { lines: BudgetLine[] }) {
  const total = lines.reduce((s, l) => s + l.amount, 0);
  const official = lines
    .filter((l) => l.payment_type !== 'unofficial')
    .reduce((s, l) => s + l.amount, 0);

  return (
    <section>
      <h2 className="text-sm font-mono uppercase tracking-widest text-[--color-ink-3] mb-4">
        Cost breakdown
      </h2>
      <div className="rounded-xl border border-[--color-surface3] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[--color-surface2]">
            <tr>
              <th className="text-left px-4 py-2 font-mono text-xs text-[--color-ink-3] uppercase tracking-wider">
                Item
              </th>
              <th className="text-left px-4 py-2 font-mono text-xs text-[--color-ink-3] uppercase tracking-wider hidden sm:table-cell">
                Where
              </th>
              <th className="text-right px-4 py-2 font-mono text-xs text-[--color-ink-3] uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[--color-surface3]">
            {lines.map((line) => (
              <tr key={line.id} className={line.payment_type === 'unofficial' ? 'opacity-50' : ''}>
                <td className="px-4 py-3 text-[--color-ink-2]">
                  {line.label}
                  {line.payment_type && (
                    <span className="ml-2 text-[10px] font-mono text-[--color-ink-3]">
                      {PAYMENT_LABEL[line.payment_type] ?? line.payment_type}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-[--color-ink-3] hidden sm:table-cell">
                  {line.office ?? '—'}
                </td>
                <td className="px-4 py-3 text-right font-mono text-[--color-ink-2]">
                  {formatLeone(line.amount)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-[--color-surface2]">
            <tr>
              <td className="px-4 py-3 font-semibold text-[--color-ink]" colSpan={2}>
                Official total
              </td>
              <td className="px-4 py-3 text-right font-mono font-bold text-[--color-green]">
                {formatLeone(official)}
              </td>
            </tr>
            {total !== official && (
              <tr className="opacity-50">
                <td className="px-4 py-2 text-xs text-[--color-ink-3]" colSpan={2}>
                  With unofficial costs
                </td>
                <td className="px-4 py-2 text-right font-mono text-xs text-[--color-ink-3]">
                  {formatLeone(total)}
                </td>
              </tr>
            )}
          </tfoot>
        </table>
      </div>
    </section>
  );
}
