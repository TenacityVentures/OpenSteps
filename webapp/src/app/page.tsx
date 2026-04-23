import { redirect } from 'next/navigation';

// Root redirects to Sierra Leone (the first country)
export default function RootPage() {
  redirect('/sl');
}
