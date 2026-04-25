import { redirect } from 'next/navigation';

async function handleSearch(formData: FormData) {
  'use server';
  const q = formData.get('q')?.toString().trim() ?? '';
  if (q) redirect(`/search?q=${encodeURIComponent(q)}`);
}

export default function SearchHero() {
  return (
    <div className="text-center py-8 space-y-6">
      <h1 className="font-serif text-4xl sm:text-5xl text-[var(--color-ink)] leading-tight max-w-2xl mx-auto">
        Find your way through any government process
      </h1>
      <p className="text-[var(--color-ink-3)] max-w-lg mx-auto">
        Community-verified, step-by-step. Real receipts. Real Sierra Leone.
      </p>
      <form action={handleSearch} className="max-w-lg mx-auto flex gap-2">
        <input
          name="q"
          type="search"
          placeholder="e.g. register a business, get a passport…"
          className="flex-1 px-4 py-3 rounded-xl border border-[var(--color-surface3)] bg-white text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] focus:border-[var(--color-green)] transition-all shadow-sm"
          autoComplete="off"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-[var(--color-green)] text-white font-medium hover:bg-[var(--color-green-mid)] transition-colors shadow-sm"
        >
          Search
        </button>
      </form>
    </div>
  );
}
