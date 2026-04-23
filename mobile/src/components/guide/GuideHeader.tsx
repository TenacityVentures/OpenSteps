import { View, Text, StyleSheet } from 'react-native';
import type { Guide } from '@opensteps/types';
import { formatLeone, formatDuration, formatDate } from '@/lib/format';
import { TrustBar } from '@/components/ui/TrustBar';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

interface GuideHeaderProps {
  guide: Guide;
}

export function GuideHeader({ guide }: GuideHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.iconWrap}>
          <CategoryIcon category={guide.category} size={24} />
        </View>
        <View style={styles.costBlock}>
          <Text style={styles.costLabel}>Total cost</Text>
          <Text style={styles.cost}>{formatLeone(guide.total_cost)}</Text>
        </View>
      </View>

      <Text style={styles.title}>{guide.title}</Text>

      {guide.description && (
        <Text style={styles.description}>{guide.description}</Text>
      )}

      <View style={styles.pills}>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{guide.steps_count} steps</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{formatDuration(guide.duration_days)}</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{guide.follower_count.toLocaleString()} following</Text>
        </View>
      </View>

      <View style={styles.trustRow}>
        <Text style={styles.trustLabel}>Trust score</Text>
        <View style={styles.trustBar}>
          <TrustBar score={guide.trust_score} />
        </View>
      </View>

      {guide.last_verified_at && (
        <Text style={styles.verified}>Last verified {formatDate(guide.last_verified_at)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  costBlock: {
    alignItems: 'flex-end',
  },
  costLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: '#9CA3AF',
  },
  cost: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: '#1A6B43',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: '#111827',
    lineHeight: 28,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 21,
  },
  pills: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  pill: {
    backgroundColor: '#F3F4F6',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pillText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: '#374151',
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  trustLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#6B7280',
    flexShrink: 0,
  },
  trustBar: {
    flex: 1,
  },
  verified: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: '#9CA3AF',
  },
});
