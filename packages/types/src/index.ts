// ── Core OpenSteps domain types ───────────────────────────────────────────
// Single source of truth shared between webapp/ and mobile/.
// All monetary values are integers in Sierra Leone Leone (SLL/NLe).

export type CategoryKey =
  | 'business'
  | 'id'
  | 'transport'
  | 'health'
  | 'education'
  | 'tax'
  | 'property'
  | 'travel';

export type VerifierRole = 'verifier' | 'editor';

export type EvidenceType = 'receipt' | 'form' | 'photo';

export type PaymentType = 'bank' | 'cash' | 'mobile_money' | 'unofficial';

export type FeedEventType = 'edit' | 'verify' | 'contribute' | 'flag';

// ── Category ──────────────────────────────────────────────────────────────
export interface Category {
  id: string;
  key: CategoryKey;
  label: string;
  subtitle: string | null;
  count: number;
}

// ── Office ────────────────────────────────────────────────────────────────
export interface Office {
  id: string;
  name: string;
  address: string | null;
  hours: string | null;
  lat: number | null;
  lng: number | null;
}

// ── Guide ─────────────────────────────────────────────────────────────────
export interface Guide {
  id: string;
  title: string;
  slug: string;
  category: CategoryKey;
  description: string | null;
  /** Denormalized step count from steps table */
  steps_count: number;
  /** Total cost in Leone (integer) */
  total_cost: number;
  /** Duration as [min, max] days, e.g. [2, 3] */
  duration_days: [number, number] | null;
  /** Trust score 0.0–10.0 */
  trust_score: number;
  /** ISO language codes, e.g. ['en', 'kri'] */
  language: string[];
  follower_count: number;
  last_verified_at: string | null; // ISO 8601
  published: boolean;
  created_at: string;
  updated_at: string;
}

// ── Step ──────────────────────────────────────────────────────────────────
export interface Step {
  id: string;
  guide_id: string;
  /** Display order (1-based) */
  n: number;
  title: string;
  description: string | null;
  /** Cost in Leone for this step */
  cost: number;
  /** Short office name, e.g. "CAC · Freetown" */
  office: string | null;
  office_id: string | null;
  /** Which day of the process (1-based) */
  day: number | null;
  /** Denormalized count of published evidence */
  evidence_count: number;
}

// ── Document needed ───────────────────────────────────────────────────────
export interface DocumentNeeded {
  id: string;
  guide_id: string;
  step_id: string | null;
  label: string;
  required: boolean;
}

// ── Budget line ───────────────────────────────────────────────────────────
export interface BudgetLine {
  id: string;
  guide_id: string;
  step_id: string | null;
  label: string;
  /** Amount in Leone */
  amount: number;
  office: string | null;
  payment_type: PaymentType | null;
}

// ── Verifier ──────────────────────────────────────────────────────────────
export interface Verifier {
  id: string;
  display_name: string;
  /** Accuracy percentage 0–100 */
  accuracy_pct: number;
  verification_count: number;
  domains: CategoryKey[];
  role: VerifierRole;
  streak_weeks: number;
  location: string | null;
  created_at: string;
}

// ── Tip ───────────────────────────────────────────────────────────────────
export interface Tip {
  id: string;
  guide_id: string;
  step_id: string | null;
  author_id: string | null;
  text: string;
  upvotes: number;
  created_at: string;
}

// ── Evidence ──────────────────────────────────────────────────────────────
export interface Evidence {
  id: string;
  guide_id: string;
  step_id: string | null;
  uploaded_by: string | null;
  type: EvidenceType;
  /** Supabase Storage path (private bucket) */
  storage_path: string;
  /** Supabase Storage path (public CDN after redaction) */
  redacted_path: string | null;
  matched_step_id: string | null;
  /** Auto-match confidence 0.0–1.0 */
  confidence: number | null;
  published: boolean;
  created_at: string;
}

// ── Community feed item ───────────────────────────────────────────────────
export interface FeedItem {
  id: string;
  type: FeedEventType;
  guide_id: string | null;
  actor_id: string | null;
  description: string;
  created_at: string;
}

// ── Composed types (joined queries) ──────────────────────────────────────

/** Guide with category info, for list views */
export interface GuideListItem extends Guide {
  category_label: string;
}

/** Full guide detail with all nested data */
export interface GuideDetail extends Guide {
  steps: Step[];
  documents_needed: DocumentNeeded[];
  budget_lines: BudgetLine[];
  tips: Tip[];
  verifiers: Verifier[];
  evidence: Evidence[];
  related_guides: Pick<Guide, 'id' | 'title' | 'slug' | 'category' | 'trust_score'>[];
}

/** Feed item with actor display info */
export interface FeedItemWithActor extends FeedItem {
  actor_name: string | null;
  guide_title: string | null;
  guide_slug: string | null;
}

// ── Display helpers ───────────────────────────────────────────────────────

/** Format Leone amount: 150000 → "Le 150,000" */
export function formatLeone(amount: number): string {
  return `Le ${amount.toLocaleString('en-SL')}`;
}

/** Format duration: [2, 3] → "2–3 days", [1, 1] → "1 day" */
export function formatDuration(duration: [number, number] | null): string {
  if (!duration) return '—';
  const [min, max] = duration;
  if (min === max) return `${min} day${min === 1 ? '' : 's'}`;
  return `${min}–${max} days`;
}
