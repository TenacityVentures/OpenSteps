import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, ActivityIndicator,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useGuide } from '@/hooks/useGuides';
import { useGuideDetail } from '@/hooks/useGuideDetail';
import { GuideHeader } from '@/components/guide/GuideHeader';
import { SegmentedProgress } from '@/components/guide/SegmentedProgress';
import { StepCard } from '@/components/guide/StepCard';
import { TipCard } from '@/components/guide/TipCard';

export default function GuideScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();

  const { data: guide, isLoading: guideLoading } = useGuide(slug);
  const { steps, evidence, tips, isLoading: detailLoading, isError } = useGuideDetail(guide?.id);

  const isLoading = guideLoading || detailLoading;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator size="large" color="#1A6B43" />
      </SafeAreaView>
    );
  }

  if (isError || !guide) {
    return (
      <SafeAreaView style={styles.centered}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.errorText}>Guide not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Nav bar */}
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.navBtn}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#374151" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>{guide.title}</Text>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => router.push(`/guide/${slug}/overview`)}
        >
          <Text style={styles.overviewLink}>Checklist</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <GuideHeader guide={guide} />
        <SegmentedProgress total={steps.length} current={0} />

        <View style={styles.stepsSection}>
          <Text style={styles.sectionHeading}>Steps</Text>
          {steps.map((step, i) => (
            <StepCard
              key={step.id}
              step={step}
              evidence={evidence}
              isLast={i === steps.length - 1}
            />
          ))}
        </View>

        {tips.length > 0 && (
          <View style={styles.tipsSection}>
            <Text style={styles.sectionHeading}>Community tips</Text>
            <View style={styles.tipsGrid}>
              {tips.map(tip => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </View>
          </View>
        )}

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 8,
  },
  navBtn: {
    padding: 6,
    flexShrink: 0,
  },
  navTitle: {
    flex: 1,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: '#111827',
    textAlign: 'center',
  },
  overviewLink: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: '#1A6B43',
  },
  stepsSection: {
    paddingTop: 20,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  sectionHeading: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#111827',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tipsSection: {
    marginTop: 8,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  tipsGrid: {
    gap: 10,
  },
  errorText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  backBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1A6B43',
    borderRadius: 10,
  },
  backBtnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  bottomPad: {
    height: 40,
  },
});
