import { View, Text, StyleSheet } from 'react-native';
import type { Step, Evidence } from '@opensteps/types';
import { formatLeone } from '@/lib/format';
import { EvidenceStrip } from './EvidenceStrip';

interface StepCardProps {
  step: Step;
  evidence: Evidence[];
  isLast?: boolean;
}

export function StepCard({ step, evidence, isLast = false }: StepCardProps) {
  const stepEvidence = evidence.filter(e => e.step_id === step.id);

  return (
    <View style={styles.row}>
      <View style={styles.indicator}>
        <View style={styles.circle}>
          <Text style={styles.num}>{step.n}</Text>
        </View>
        {!isLast && <View style={styles.line} />}
      </View>

      <View style={[styles.content, isLast && styles.contentLast]}>
        {step.day !== undefined && step.day !== null && (
          <Text style={styles.day}>Day {step.day}</Text>
        )}
        <Text style={styles.title}>{step.title}</Text>
        {step.description && (
          <Text style={styles.description}>{step.description}</Text>
        )}

        <View style={styles.meta}>
          {step.cost != null && step.cost > 0 && (
            <View style={styles.pill}>
              <Text style={styles.pillText}>{formatLeone(step.cost)}</Text>
            </View>
          )}
          {step.office && (
            <View style={styles.pill}>
              <Text style={styles.pillText} numberOfLines={1}>{step.office}</Text>
            </View>
          )}
        </View>

        {stepEvidence.length > 0 && (
          <EvidenceStrip evidence={stepEvidence} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 20,
  },
  indicator: {
    alignItems: 'center',
    width: 28,
    flexShrink: 0,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#1A6B43',
    alignItems: 'center',
    justifyContent: 'center',
  },
  num: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#1A6B43',
  },
  line: {
    flex: 1,
    width: 1.5,
    backgroundColor: '#E5E7EB',
    marginTop: 4,
    marginBottom: 4,
    minHeight: 20,
  },
  content: {
    flex: 1,
    paddingBottom: 24,
    gap: 6,
  },
  contentLast: {
    paddingBottom: 16,
  },
  day: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: '#111827',
    lineHeight: 22,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 19,
  },
  meta: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  pill: {
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    maxWidth: 180,
  },
  pillText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: '#374151',
  },
});
