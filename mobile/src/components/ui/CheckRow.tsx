import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

interface CheckRowProps {
  label: string;
  required?: boolean;
  checked?: boolean;
}

export function CheckRow({ label, required = true, checked = false }: CheckRowProps) {
  return (
    <View style={styles.row}>
      <View style={[styles.check, checked && styles.checkDone]}>
        {checked && (
          <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
            <Path d="M2.5 6l2.5 2.5 4.5-5" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        )}
      </View>
      <Text style={styles.label} numberOfLines={2}>{label}</Text>
      {required && <Text style={styles.req}>req</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkDone: {
    backgroundColor: '#1A6B43',
    borderColor: '#1A6B43',
  },
  label: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#374151',
    lineHeight: 18,
  },
  req: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: '#9CA3AF',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
});
