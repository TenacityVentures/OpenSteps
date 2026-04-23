import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, ActivityIndicator,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useGuide } from '@/hooks/useGuides';
import { useGuideDetail } from '@/hooks/useGuideDetail';
import { ChecklistSection } from '@/components/guide/ChecklistSection';
import { formatLeone, formatDuration } from '@/lib/format';

export default function OverviewScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();

  const { data: guide, isLoading: guideLoading } = useGuide(slug);
  const { documents, budget, isLoading: detailLoading } = useGuideDetail(guide?.id);

  const isLoading = guideLoading || detailLoading;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator size="large" color="#1A6B43" />
      </SafeAreaView>
    );
  }

  if (!guide) {
    return (
      <SafeAreaView style={styles.centered}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.errorText}>Not found</Text>
      </SafeAreaView>
    );
  }

  const officialTotal = budget.filter(b => b.payment_type !== 'unofficial').reduce((s, b) => s + b.amount, 0);
  const withUnofficial = budget.reduce((s, b) => s + b.amount, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.nav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.navBtn}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#374151" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Pre-flight checklist</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.guideTitle}>{guide.title}</Text>

        {/* Summary row */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCell}>
            <Text style={styles.summaryLabel}>Duration</Text>
            <Text style={styles.summaryValue}>{formatDuration(guide.duration_days)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryCell}>
            <Text style={styles.summaryLabel}>Official cost</Text>
            <Text style={styles.summaryValue}>{formatLeone(officialTotal)}</Text>
          </View>
          {withUnofficial > officialTotal && (
            <>
              <View style={styles.divider} />
              <View style={styles.summaryCell}>
                <Text style={styles.summaryLabel}>Incl. unofficial</Text>
                <Text style={[styles.summaryValue, styles.amberText]}>{formatLeone(withUnofficial)}</Text>
              </View>
            </>
          )}
        </View>

        {/* Documents checklist */}
        {documents.length > 0 && (
          <View style={styles.card}>
            <ChecklistSection title="What to bring" items={documents} />
          </View>
        )}

        {/* Budget table */}
        {budget.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardHeading}>Budget breakdown</Text>
            {budget.map((line) => (
              <View key={line.id} style={[styles.budgetRow, line.payment_type === 'unofficial' && styles.unofficialRow]}>
                <Text style={styles.budgetLabel} numberOfLines={1}>{line.label}</Text>
                <Text style={[styles.budgetAmount, line.payment_type === 'unofficial' && styles.amberText]}>
                  {formatLeone(line.amount)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* CTA */}
      <View style={styles.cta}>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => router.back()}
          activeOpacity={0.85}
        >
          <Text style={styles.startBtnText}>Start guide →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAFA' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorText: { fontFamily: 'Inter_400Regular', fontSize: 16, color: '#6B7280' },
  nav: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 12, paddingVertical: 10,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', gap: 8,
  },
  navBtn: { padding: 6 },
  navTitle: { flex: 1, fontFamily: 'Inter_600SemiBold', fontSize: 15, color: '#111827', textAlign: 'center' },
  content: { padding: 20, gap: 16, paddingBottom: 100 },
  guideTitle: { fontFamily: 'Inter_700Bold', fontSize: 20, color: '#111827', lineHeight: 26 },
  summaryRow: {
    flexDirection: 'row', backgroundColor: '#fff',
    borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB',
    padding: 16, alignItems: 'center',
  },
  summaryCell: { flex: 1, alignItems: 'center', gap: 2 },
  summaryLabel: { fontFamily: 'Inter_400Regular', fontSize: 11, color: '#9CA3AF' },
  summaryValue: { fontFamily: 'Inter_700Bold', fontSize: 14, color: '#111827' },
  amberText: { color: '#D97706' },
  divider: { width: 1, height: 28, backgroundColor: '#E5E7EB', marginHorizontal: 4 },
  card: {
    backgroundColor: '#fff', borderRadius: 12,
    borderWidth: 1, borderColor: '#E5E7EB', padding: 16, gap: 6,
  },
  cardHeading: {
    fontFamily: 'Inter_600SemiBold', fontSize: 13, color: '#374151',
    textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4,
  },
  budgetRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 8,
    borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
  },
  unofficialRow: { opacity: 0.6 },
  budgetLabel: { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#374151', flex: 1, marginRight: 12 },
  budgetAmount: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: '#111827' },
  cta: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 20, paddingBottom: 36, backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: '#E5E7EB',
  },
  startBtn: {
    backgroundColor: '#1A6B43', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center',
  },
  startBtnText: { fontFamily: 'Inter_700Bold', fontSize: 16, color: '#fff' },
});
