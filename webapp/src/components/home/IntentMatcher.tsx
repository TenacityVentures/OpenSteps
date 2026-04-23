import Link from 'next/link';
import { INTENTS } from '@opensteps/constants';

export default function IntentMatcher() {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {INTENTS.map((intent) => (
        <div
          key={intent.question}
          className="p-4 rounded-xl bg-white border border-[--color-surface3] hover:border-[--color-green] hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="text-2xl mb-2">{intent.icon}</div>
          <div className="font-medium text-sm text-[--color-ink] group-hover:text-[--color-green] mb-3 transition-colors">
            {intent.question}
          </div>
          <ul className="space-y-1">
            {intent.suggestions.map((s, i) => (
              <li key={s}>
                <Link
                  href={`/sl/${intent.slugs[i]}`}
                  className="text-xs text-[--color-green] hover:underline flex items-center gap-1"
                >
                  <span className="opacity-40">→</span>
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
