import type { CategoryKey } from '@opensteps/types';

export interface CategoryMeta {
  key: CategoryKey;
  label: string;
  subtitle: string;
  /** SVG viewBox path data for the category icon (24x24 grid) */
  iconPaths: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    key: 'business',
    label: 'Start a business',
    subtitle: 'Register · TIN · NASSIT',
    iconPaths:
      'M4 8h16v12H4V8zm5 0V5h6v3M12 12v4',
  },
  {
    key: 'id',
    label: 'ID & documents',
    subtitle: 'NIN · passport · birth cert',
    iconPaths:
      'M3 6h18v12H3V6zm6 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm5-3h5m-5 3h4',
  },
  {
    key: 'transport',
    label: 'Driving & vehicles',
    subtitle: "Learner's · road test · reg.",
    iconPaths:
      'M4 13l2-6h12l2 6v5H4v-5zm4 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm8 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  },
  {
    key: 'health',
    label: 'Health & NASSIT',
    subtitle: 'Enrolment · dependants',
    iconPaths:
      'M12 4c-6 6-6 10 0 14 6-4 6-8 0-14zm-2 7h4m-2-2v4',
  },
  {
    key: 'education',
    label: 'Education',
    subtitle: 'Scholarships · enrolment',
    iconPaths:
      'M3 9l9-4 9 4-9 4-9-4zm4 2v5c0 1 2 2 5 2s5-1 5-2v-5',
  },
  {
    key: 'tax',
    label: 'Tax & compliance',
    subtitle: 'TIN · filing · returns',
    iconPaths:
      'M6 4h12v16H6V4zm3 5h6m-6 4h6m-6 4h4',
  },
  {
    key: 'property',
    label: 'Property & land',
    subtitle: 'Survey · title · transfer',
    iconPaths:
      'M4 11l8-6 8 6v9H4v-9zm6 9v-5h4v5',
  },
  {
    key: 'travel',
    label: 'Travel & passport',
    subtitle: 'Passport · visa · clearance',
    iconPaths:
      'M2 16l10-1 7-8 2 1-5 9-3 1-3-1-8-1z',
  },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c]),
) as Record<CategoryKey, CategoryMeta>;
