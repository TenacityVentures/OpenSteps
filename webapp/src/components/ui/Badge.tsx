type Variant = 'default' | 'ok' | 'warn' | 'err' | 'info';

const STYLES: Record<Variant, string> = {
  default: 'bg-[--color-surface2] text-[--color-ink-2] border-[--color-surface3]',
  ok:      'bg-[--color-green-soft] text-[--color-green-deep] border-[--color-green-soft]',
  warn:    'bg-[--color-amber-soft] text-amber-900 border-[--color-amber-soft]',
  err:     'bg-[--color-red-soft] text-[--color-red] border-[--color-red-soft]',
  info:    'bg-[--color-blue-soft] text-[--color-blue] border-[--color-blue-soft]',
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
