type Variant = 'default' | 'ok' | 'warn' | 'err' | 'info';

const STYLES: Record<Variant, string> = {
  default: 'bg-[var(--color-surface2)] text-[var(--color-ink-2)] border-[var(--color-surface3)]',
  ok: 'bg-[var(--color-green-soft)] text-[var(--color-green-deep)] border-[var(--color-green-soft)]',
  warn: 'bg-[var(--color-amber-soft)] text-amber-900 border-[var(--color-amber-soft)]',
  err: 'bg-[--color-red-soft] text-[var(--color-red)] border-[--color-red-soft]',
  info: 'bg-[var(--color-blue-soft)] text-[var(--color-blue)] border-[var(--color-blue-soft)]',
};

export default function Badge({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: Variant;
}) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border ${STYLES[variant]}`}
    >
      {children}
    </span>
  );
}
