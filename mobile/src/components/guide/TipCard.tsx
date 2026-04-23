import { View, Text, StyleSheet } from 'react-native';
import type { Tip } from '@opensteps/types';
import { Avatar } from '@/components/ui/Avatar';

interface TipCardProps {
  tip: Tip;
}

export function TipCard({ tip }: TipCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Avatar name={tip.author_id ?? 'Community'} size={26} />
        <Text style={styles.text} numberOfLines={4}>{tip.text}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.upvotes}>▲ {tip.upvotes} helpful</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  text: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#374151',
    lineHeight: 19,
  },
  footer: {
    alignItems: 'flex-end',
  },
  upvotes: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: '#1A6B43',
  },
});
