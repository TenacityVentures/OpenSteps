import { View, Text, StyleSheet } from 'react-native';

type Variant = 'default' | 'green' | 'amber' | 'red' | 'blue';

interface BadgeProps {
  label: string;
  variant?: Variant;
}

const COLORS: Record<Variant, { bg: string; text: string }> = {
  default: { bg: '#F3F4F6', text: '#6B7280' },
  green:   { bg: '#DCFCE7', text: '#15803D' },
  amber:   { bg: '#FEF3C7', text: '#B45309' },
  red:     { bg: '#FEE2E2', text: '#DC2626' },
  blue:    { bg: '#DBEAFE', text: '#1D4ED8' },
};

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const c = COLORS[variant];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.text, { color: c.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
  },
});
