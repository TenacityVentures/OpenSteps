import { View, Text, StyleSheet } from 'react-native';

interface TrustBarProps {
  score: number; // 0-10
  showLabel?: boolean;
}

function scoreColor(s: number) {
  if (s >= 8) return '#1A6B43';
  if (s >= 6) return '#D97706';
  return '#DC2626';
}

export function TrustBar({ score, showLabel = true }: TrustBarProps) {
  const color = scoreColor(score);
  const pct = (score / 10) * 100;
  return (
    <View style={styles.row}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%` as any, backgroundColor: color }]} />
      </View>
      {showLabel && (
        <Text style={[styles.label, { color }]}>{score.toFixed(1)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  track: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    minWidth: 28,
    textAlign: 'right',
  },
});
