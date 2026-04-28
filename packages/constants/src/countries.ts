import type { CountryCode } from '@opensteps/types';

export interface CountryMeta {
  code: CountryCode;
  name: string;
  currency: string;
  flag: string;
  active: boolean;
}

export const COUNTRIES: CountryMeta[] = [
  { code: 'sl', name: 'Sierra Leone', currency: 'Le',  flag: '🇸🇱', active: true  },
  { code: 'ng', name: 'Nigeria',      currency: '₦',   flag: '🇳🇬', active: false },
  { code: 'za', name: 'South Africa', currency: 'R',   flag: '🇿🇦', active: false },
  { code: 'gh', name: 'Ghana',        currency: 'GH₵', flag: '🇬🇭', active: false },
];

export const COUNTRY_MAP = Object.fromEntries(
  COUNTRIES.map((c) => [c.code, c]),
) as Record<CountryCode, CountryMeta>;

export const ACTIVE_COUNTRY_CODES: CountryCode[] = COUNTRIES
  .filter((c) => c.active)
  .map((c) => c.code);
