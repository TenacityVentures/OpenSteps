import type { JSX } from 'react';
interface LogoProps {
  /**
   * icon     — full dashed circle + checkmark (app icon / avatar use)
   * mark     — open-arc + checkmark (partial ring, standalone symbol)
   * wordmark — open-arc mark beside "OpenSteps" text (navbar default)
   * stacked  — full-circle mark above "OpenSteps" text (hero / splash)
   */
  variant?: 'icon' | 'mark' | 'wordmark' | 'stacked';
  size?: number;
  className?: string;
}

function IconMark({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="24" cy="24" r="20"
        stroke="#225e44" strokeWidth="3"
        strokeDasharray="5.5 3.5" strokeLinecap="round"
        color="#225e44"
      />
      <path
        d="M13 24.5 L20.5 32 L36 16"
        stroke="currentColor" strokeWidth="3.5"
        strokeLinecap="round" strokeLinejoin="round"
        color="#225e44"
      />
    </svg>
  );
}

function OpenMark({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
    >
      {/* 240° arc: clockwise from lower-left (θ=150°) through top to lower-right (θ=30°) */}
      <path
        d="M 6.68 34 A 20 20 0 1 1 41.32 34"
        stroke="#225e44" strokeWidth="3"
        strokeDasharray="5.5 3.5" strokeLinecap="round"
        fill="none"
        color="#225e44"
      />
      <path
        d="M 12 25 L 20 33 L 36 15"
        stroke="currentColor" strokeWidth="3.5"
        strokeLinecap="round" strokeLinejoin="round"
        color="#225e44"
      />
    </svg>
  );
}

export function Logo({ variant = 'wordmark', size = 32, className }: LogoProps): JSX.Element {
  if (variant === 'icon') {
    return (
      <span role="img" aria-label="OpenSteps" className={`text-[var(--color-green)] ${className ?? ''}`}>
        <IconMark size={size} />
      </span>
    );
  }

  if (variant === 'mark') {
    return (
      <span role="img" aria-label="OpenSteps" className={`text-[var(--color-green)] ${className ?? ''}`}>
        <OpenMark size={size} />
      </span>
    );
  }

  if (variant === 'stacked') {
    return (
      <span className={`inline-flex flex-col items-center gap-2 text-[var(--color-green)] ${className ?? ''}`}>
        <IconMark size={size} />
        <span className="font-semibold text-[var(--color-ink)] leading-none" style={{ fontSize: size * 0.5 }}>
          OpenSteps
        </span>
      </span>
    );
  }

  // wordmark (default)
  return (
    <span className={`inline-flex items-center gap-2 text-[var(--color-green)] ${className ?? ''}`}>
      <OpenMark size={size} />
      <span className="font-semibold text-[var(--color-ink)] leading-none" style={{ fontSize: size * 0.6 }}>
        OpenSteps
      </span>
    </span>
  );
}
