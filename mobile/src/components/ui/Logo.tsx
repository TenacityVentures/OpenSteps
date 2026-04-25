import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const GREEN = '#1a6b43';
const INK = '#14120c';

interface LogoProps {
  /**
   * icon     — full dashed circle + checkmark
   * mark     — open-arc + checkmark
   * wordmark — open-arc mark beside "OpenSteps" text (default)
   * stacked  — full-circle mark above "OpenSteps" text
   */
  variant?: 'icon' | 'mark' | 'wordmark' | 'stacked';
  size?: number;
  color?: string;
}

function IconMark({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Circle
        cx="24" cy="24" r="20"
        stroke={color} strokeWidth="3"
        strokeDasharray="5.5,3.5" strokeLinecap="round"
      />
      <Path
        d="M13 24.5 L20.5 32 L36 16"
        stroke={color} strokeWidth="3.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

function OpenMark({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* 240° arc: clockwise from lower-left through top to lower-right */}
      <Path
        d="M 6.68 34 A 20 20 0 1 1 41.32 34"
        stroke={color} strokeWidth="3"
        strokeDasharray="5.5,3.5" strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M 12 25 L 20 33 L 36 15"
        stroke={color} strokeWidth="3.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Logo({ variant = 'wordmark', size = 32, color = GREEN }: LogoProps) {
  if (variant === 'icon') {
    return <IconMark size={size} color={color} />;
  }

  if (variant === 'mark') {
    return <OpenMark size={size} color={color} />;
  }

  if (variant === 'stacked') {
    return (
      <View style={styles.stacked}>
        <IconMark size={size} color={color} />
        <Text style={[styles.wordmarkText, { fontSize: size * 0.5, color: INK }]}>
          OpenSteps
        </Text>
      </View>
    );
  }

  // wordmark (default)
  return (
    <View style={styles.wordmark}>
      <OpenMark size={size} color={color} />
      <Text style={[styles.wordmarkText, { fontSize: size * 0.6, color: INK }]}>
        OpenSteps
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wordmark: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stacked: {
    alignItems: 'center',
    gap: 8,
  },
  wordmarkText: {
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.3,
  },
});
