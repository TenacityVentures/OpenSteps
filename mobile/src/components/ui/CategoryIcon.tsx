import Svg, { Path, Rect, Circle } from 'react-native-svg';
import type { CategoryKey } from '@opensteps/types';

interface CategoryIconProps {
  category: CategoryKey;
  size?: number;
  color?: string;
}

const PATHS: Record<CategoryKey, React.ReactNode> = {
  business: (
    <>
      <Rect x="3" y="7" width="18" height="13" rx="2" strokeWidth={1.8} fill="none" />
      <Path d="M8 7V5a2 2 0 014 0v2M12 12v3" strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  id: (
    <>
      <Rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={1.8} fill="none" />
      <Circle cx="9" cy="10" r="2.5" strokeWidth={1.8} fill="none" />
      <Path d="M14 9h4M14 12h3" strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  travel: (
    <>
      <Path d="M12 3C8.13 3 5 6.13 5 10c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7z" strokeWidth={1.8} fill="none" />
      <Circle cx="12" cy="10" r="2.5" strokeWidth={1.8} fill="none" />
    </>
  ),
  property: (
    <>
      <Path d="M3 12L12 4l9 8" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5 10v9h5v-5h4v5h5v-9" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  education: (
    <>
      <Path d="M12 3L2 8l10 5 10-5-10-5z" strokeWidth={1.8} strokeLinejoin="round" />
      <Path d="M6 10.5v4c0 2 2.686 3.5 6 3.5s6-1.5 6-3.5v-4" strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  health: (
    <>
      <Path d="M12 21C12 21 4 14.5 4 9a8 8 0 0116 0c0 5.5-8 12-8 12z" strokeWidth={1.8} fill="none" />
      <Path d="M12 6v6M9 9h6" strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  tax: (
    <>
      <Circle cx="12" cy="12" r="9" strokeWidth={1.8} fill="none" />
      <Path d="M12 7v1.5M12 15.5V17M9.5 10.5C9.5 9.12 10.62 8 12 8s2.5 1.12 2.5 2.5S12 13 12 13s-2.5 1.12-2.5 2.5S10.62 17 12 17" strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  transport: (
    <>
      <Rect x="3" y="11" width="18" height="8" rx="2" strokeWidth={1.8} fill="none" />
      <Path d="M7 11V7a2 2 0 012-2h6a2 2 0 012 2v4" strokeWidth={1.8} />
      <Circle cx="7.5" cy="17" r="1.5" strokeWidth={1.8} fill="none" />
      <Circle cx="16.5" cy="17" r="1.5" strokeWidth={1.8} fill="none" />
    </>
  ),
};

export function CategoryIcon({ category, size = 24, color = '#1A6B43' }: CategoryIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}>
      {PATHS[category]}
    </Svg>
  );
}
