import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import type { GuideListItem } from '@opensteps/types';
import { formatLeone, formatDuration } from '@/lib/format';
import { TrustBar } from '@/components/ui/TrustBar';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

interface GuideCardProps {
  guide: GuideListItem;
}

export function GuideCard({ guide }: GuideCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/guide/${guide.slug}`)}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <CategoryIcon category={guide.category} size={18} />
        </View>
        <View style={styles.meta}>
          <Text style={styles.title} numberOfLines={2}>{guide.title}</Text>
          <Text style={styles.sub}>
            {guide.steps_count} steps · {formatDuration(guide.duration_days)}
          </Text>
        </View>
        <Text style={styles.cost}>{formatLeone(guide.total_cost)}</Text>
      </View>
      <View style={styles.footer}>
        <TrustBar score={guide.trust_score} />
        <Text style={styles.followers}>{guide.follower_count.toLocaleString()} following</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
    gap: 12,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  meta: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#111827',
    lineHeight: 20,
  },
  sub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  cost: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: '#1A6B43',
    flexShrink: 0,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  followers: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: '#9CA3AF',
    flexShrink: 0,
  },
});
