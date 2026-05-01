import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ACTIVE_COUNTRY_CODES } from '@opensteps/constants';

export default async function RootPage() {
  const cookieStore = await cookies();
  const preferred = cookieStore.get('preferred_country')?.value;
  const country =
    preferred && (ACTIVE_COUNTRY_CODES as string[]).includes(preferred)
      ? preferred
      : (ACTIVE_COUNTRY_CODES[0] ?? 'sl');
  redirect(`/${country}`);
}
