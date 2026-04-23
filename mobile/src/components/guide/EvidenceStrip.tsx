import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import type { Evidence } from '@opensteps/types';
import { evidenceThumbnailUrl } from '@opensteps/supabase';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';

interface EvidenceStripProps {
  evidence: Evidence[];
  onPress?: (item: Evidence) => void;
}

export function EvidenceStrip({ evidence, onPress }: EvidenceStripProps) {
  if (evidence.length === 0) return null;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      <View style={styles.row}>
        {evidence.map((item) => {
          const uri = item.redacted_path
            ? evidenceThumbnailUrl(SUPABASE_URL, item.redacted_path, { width: 120, quality: 50 })
            : null;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => onPress?.(item)}
            >
              {uri ? (
                <Image
                  source={{ uri }}
                  style={styles.thumb}
                  contentFit="cover"
                  transition={200}
                />
              ) : (
                <View style={[styles.thumb, styles.placeholder]} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: 4,
    marginHorizontal: -4,
  },
  row: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 4,
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  placeholder: {
    backgroundColor: '#E5E7EB',
  },
});
