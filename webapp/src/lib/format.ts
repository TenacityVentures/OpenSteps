import { format, formatDistanceToNow } from 'date-fns';

/** 150000 → "Le 150,000" */
export function formatLeone(amount: number): string {
  return `Le ${amount.toLocaleString('en-SL')}`;
}

/** [2, 3] → "2–3 days", [1, 1] → "1 day" */
export function formatDuration(duration: [number, number] | null): string {
  if (!duration) return '—';
  const [min, max] = duration;
  if (min === max) return `${min} day${min === 1 ? '' : 's'}`;
  return `${min}–${max} days`;
}

/** ISO date → "14 Apr 2026" */
export function formatDate(iso: string): string {
  return format(new Date(iso), 'dd MMM yyyy');
}

/** ISO date → "3 hours ago" */
export function formatRelative(iso: string): string {
  return formatDistanceToNow(new Date(iso), { addSuffix: true });
}

/** 8.7 → "8.7 / 10" */
export function formatTrustScore(score: number): string {
  return `${score.toFixed(1)} / 10`;
}
