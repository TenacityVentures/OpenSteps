'use client';

import type { JSX, ReactNode } from 'react';
import { createContext, useContext, createElement } from 'react';
import type { CountryMeta } from '@opensteps/constants';

const CountryContext = createContext<CountryMeta | null>(null);

export function CountryProvider({
  country,
  children,
}: {
  country: CountryMeta;
  children: ReactNode;
}): JSX.Element {
  return createElement(CountryContext.Provider, { value: country }, children);
}

export function useCountry(): CountryMeta {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error('useCountry must be used within CountryProvider');
  return ctx;
}
