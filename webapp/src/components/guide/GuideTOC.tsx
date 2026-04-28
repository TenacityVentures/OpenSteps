import type { JSX } from 'react';
import type { Step } from '@opensteps/types';

export default function GuideTOC({ steps }: { steps: Step[] }): JSX.Element {
  return (
    <nav aria-label="Steps">
      <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-ink-3)] mb-3">
        Steps
      </div>
      <ol className="space-y-1">
        {steps.map((step) => (
          <li key={step.id}>
            <a
              href={`#step-${step.n}`}
              className="flex items-center gap-2 text-sm text-[var(--color-ink-2)] hover:text-[var(--color-green)] transition-colors py-0.5"
            >
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono font-bold shrink-0 opacity-50">
                {step.n}
              </span>
              <span className="truncate">{step.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
