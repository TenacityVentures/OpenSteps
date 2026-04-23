import { format, formatDistanceToNow } from 'date-fns';

export function formatLeone(amount: number): string {
  return `Le ${amount.toLocaleString('en-SL')}`;
}

export function formatDuration(duration: [number, number] | null): string {
  if (!duration) return '—';
  const [min, max] = duration;
  if (min === max) return `${min} day${min === 1 ? '' : 's'}`;
  return `${min}–${max} days`;
}

export function formatDate(iso: string): string {
  return format(new Date(iso), 'dd MMM yyyy');
}

export function formatRelative(iso: string): string {
  return formatDistanceToNow(new Date(iso), { addSuffix: true });
}
