import { View, Text, StyleSheet } from 'react-native';
import type { FeedItem as FeedItemType } from '@opensteps/types';
import { formatRelative } from '@/lib/format';
import { Avatar } from '@/components/ui/Avatar';

interface FeedItemProps {
  item: FeedItemType;
}

const TYPE_LABELS: Record<string, string> = {
  verified:   '✓ verified',
  updated:    '↑ updated',
  evidence:   '📷 evidence',
  tip:        '💬 tip',
  completed:  '✓ completed',
};

export function FeedItem({ item }: FeedItemProps) {
  const typeLabel = TYPE_LABELS[item.type] ?? item.type;

  return (
    <View style={styles.row}>
      <Avatar name={item.actor_id ?? 'User'} size={30} />
      <View style={styles.body}>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
        <View style={styles.meta}>
          <Text style={styles.type}>{typeLabel}</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.time}>{formatRelative(item.created_at)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  body: {
    flex: 1,
    gap: 3,
  },
  desc: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#374151',
    lineHeight: 18,
  },
  meta: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  type: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: '#1A6B43',
  },
  dot: {
    fontSize: 11,
    color: '#D1D5DB',
  },
  time: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: '#9CA3AF',
  },
});
