'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useToast, TOAST_MESSAGES } from './Toaster';

export function ToastFromUrl() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const key = searchParams.get('toast');
    if (!key) return;
    const entry = TOAST_MESSAGES[key];
    if (entry) toast(entry.message, entry.type);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
