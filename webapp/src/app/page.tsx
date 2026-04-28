import { redirect } from 'next/navigation';
import { ACTIVE_COUNTRY_CODES } from '@opensteps/constants';

export default function RootPage() {
  redirect(`/${ACTIVE_COUNTRY_CODES[0] ?? 'sl'}`);
}
