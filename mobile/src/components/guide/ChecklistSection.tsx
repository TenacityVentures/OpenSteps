import { View, Text, StyleSheet } from 'react-native';
import type { DocumentNeeded } from '@opensteps/types';
import { CheckRow } from '@/components/ui/CheckRow';

interface ChecklistSectionProps {
  title: string;
  items: DocumentNeeded[];
}

export function ChecklistSection({ title, items }: ChecklistSectionProps) {
  if (items.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{title}</Text>
      {items.map((item) => (
        <CheckRow key={item.id} label={item.label} required={item.required} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 0,
  },
  heading: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
});
