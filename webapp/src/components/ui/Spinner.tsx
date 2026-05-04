import type { JSX } from 'react';

interface SpinnerProps {
  size?: number;
  className?: string;
}

export function Spinner({ size = 20, className = '' }: SpinnerProps): JSX.Element {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={`animate-spin ${className}`}
      style={{ animationDuration: '1.4s' }}
    >
      {/* 240° open arc — the OpenSteps mark */}
      <path
        d="M 6.68 34 A 20 20 0 1 1 41.32 34"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="5.5 3.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
