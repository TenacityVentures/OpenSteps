import type { CategoryKey, CountryCode, PaymentType } from '@opensteps/types';

export type StepDraft = {
  id: string;
  title: string;
  description: string;
  cost: string;
  office: string;
  day: string;
};

export type DocumentDraft = {
  id: string;
  label: string;
  required: boolean;
};

export type BudgetLineDraft = {
  id: string;
  label: string;
  amount: string;
  office: string;
  payment_type: PaymentType;
};

export type OfficeDraft = {
  id: string;
  name: string;
  address: string;
  hours: string;
};

export type GuideDraft = {
  title: string;
  category: CategoryKey | '';
  country: CountryCode;
  city: string;
  estimated_time: string;
  estimated_cost: string;
  description: string;
  documents: DocumentDraft[];
  steps: StepDraft[];
  budget_lines: BudgetLineDraft[];
  offices: OfficeDraft[];
  evidence_notes: string;
};

export const EMPTY_DRAFT: GuideDraft = {
  title: '',
  category: '',
  country: 'sl',
  city: '',
  estimated_time: '',
  estimated_cost: '',
  description: '',
  documents: [],
  steps: [],
  budget_lines: [],
  offices: [],
  evidence_notes: '',
};

export const WIZARD_STEPS = [
  {
    id: 'basics' as const,
    label: 'Basics',
    subtitle: 'Tell us what this process is, where it happens, and how long it takes.',
  },
  {
    id: 'requirements' as const,
    label: 'Requirements',
    subtitle: 'What documents or items does someone need to bring?',
  },
  {
    id: 'steps' as const,
    label: 'Steps',
    subtitle: 'Break the process into clear, numbered steps.',
  },
  {
    id: 'fees' as const,
    label: 'Fees',
    subtitle: 'List all costs — official fees and any unofficial ones.',
  },
  {
    id: 'offices' as const,
    label: 'Offices',
    subtitle: 'Where does someone go to complete this process?',
  },
  {
    id: 'evidence' as const,
    label: 'Evidence',
    subtitle: 'Describe any receipts, forms, or photos you can provide.',
  },
  {
    id: 'review' as const,
    label: 'Review',
    subtitle: 'Check everything before submitting for editorial review.',
  },
] as const;

export type WizardStepId = (typeof WIZARD_STEPS)[number]['id'];
