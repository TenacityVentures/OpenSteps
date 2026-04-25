import type { Step, Evidence } from '@opensteps/types';
import { formatLeone } from '@/lib/format';
import Badge from '@/components/ui/Badge';

export default function StepList({
  steps,
  evidence,
}: {
  steps: Step[];
  evidence: Evidence[];
}) {
  return (
    <section>
      <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--color-ink-3)] mb-6">
        Steps
      </h2>
      <ol className="space-y-6">
        {steps.map((step) => {
          const stepEvidence = evidence.filter((e) => e.step_id === step.id);
          return (
            <li
              key={step.id}
              id={`step-${step.n}`}
              className="grid grid-cols-[36px_1fr] gap-4"
            >
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full border-2 border-[var(--color-green)] bg-white flex items-center justify-center text-sm font-mono font-bold text-[var(--color-green)] shrink-0">
                  {step.n}
                </div>
                {/* Connector line */}
                <div className="w-px flex-1 mt-2 bg-[var(--color-surface3)]" />
              </div>

              {/* Step content */}
              <div className="pb-6 min-w-0">
                <h3 className="font-semibold text-[var(--color-ink)] text-lg leading-snug mb-2">
                  {step.title}
                </h3>
                {step.description && (
                  <p className="text-[var(--color-ink-2)] leading-relaxed mb-3 text-sm">
                    {step.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {step.cost > 0 && (
                    <Badge variant="warn">{formatLeone(step.cost)}</Badge>
                  )}
                  {step.office && (
                    <Badge variant="default">📍 {step.office}</Badge>
                  )}
                  {step.day && (
                    <Badge variant="default">Day {step.day}</Badge>
                  )}
                  {stepEvidence.length > 0 && (
                    <Badge variant="ok">
                      {stepEvidence.length} receipt{stepEvidence.length > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
