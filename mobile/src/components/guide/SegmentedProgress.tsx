import { View, StyleSheet } from 'react-native';

interface SegmentedProgressProps {
  total: number;
  current: number; // 0-based index of active step
}

export function SegmentedProgress({ total, current }: SegmentedProgressProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={[
            styles.segment,
            i < current && styles.done,
            i === current && styles.active,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  segment: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
  },
  done: {
    backgroundColor: '#1A6B43',
  },
  active: {
    backgroundColor: '#1A6B43',
    opacity: 0.5,
  },
});
