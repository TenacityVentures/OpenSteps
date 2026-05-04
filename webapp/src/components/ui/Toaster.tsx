'use client';

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import type { ReactNode, ReactElement } from 'react';

export type ToastType = 'info' | 'success' | 'error';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

// Short keys passed via URL search params → human-readable messages
export const TOAST_MESSAGES: Record<string, { message: string; type: ToastType }> = {
  verify:     { message: 'Sign in to verify guides',                    type: 'info'    },
  contribute: { message: 'Sign in to contribute a guide',               type: 'info'    },
  expired:    { message: 'Session expired — please sign in',            type: 'info'    },
  welcome:    { message: 'Welcome to OpenSteps — account confirmed',    type: 'success' },
};

const DOT_COLOR: Record<ToastType, string> = {
  success: 'var(--color-green)',
  error:   'var(--color-red)',
  info:    'rgba(255,255,255,0.4)',
};

export function Toaster({ children }: { children: ReactNode }): ReactElement {
  const [current, setCurrent] = useState<ToastItem | null>(null);
  const [visible, setVisible]   = useState(false);
  const queueRef      = useRef<ToastItem[]>([]);
  const idRef         = useRef(0);
  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const busyRef       = useRef(false);

  const advance = useCallback(() => {
    const item = queueRef.current.shift();
    if (!item) { busyRef.current = false; return; }
    busyRef.current = true;
    setCurrent(item);
    // Two rAFs: first lets React render the element, second starts the transition
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(() => { setCurrent(null); advance(); }, 300);
    }, 3500);
  }, []);

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    queueRef.current.push({ id: ++idRef.current, message, type });
    if (!busyRef.current) advance();
  }, [advance]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {current && (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: 'fixed',
            top: '1.25rem',
            left: '50%',
            transform: `translate(-50%, ${visible ? '0px' : '-10px'})`,
            opacity: visible ? 1 : 0,
            transition: 'opacity 280ms ease-out, transform 280ms ease-out',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[var(--color-ink)] text-white text-xs font-mono whitespace-nowrap shadow-[0_4px_24px_rgba(0,0,0,0.18)]"
        >
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: DOT_COLOR[current.type] }}
          />
          {current.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}
