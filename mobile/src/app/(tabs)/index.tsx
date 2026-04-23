import { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, RefreshControl,
  SafeAreaView, ActivityIndicator,
} from 'react-native';
import { useGuides } from '@/hooks/useGuides';
import { useCategories } from '@/hooks/useCategories';
import { useFeed } from '@/hooks/useFeed';
import { SearchBar } from '@/components/home/SearchBar';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { GuideCard } from '@/components/home/GuideCard';
import { FeedItem } from '@/components/home/FeedItem';
import type { GuideListItem } from '@opensteps/types';

type Section =
  | { type: 'search' }
  | { type: 'categories' }
  | { type: 'section-header'; label: string }
  | { type: 'guide'; guide: GuideListItem }
  | { type: 'feed-header' }
  | { type: 'feed'; itemId: string }
  | { type: 'empty'; message: string }
  | { type: 'loading' };

export default function HomeScreen() {
  const [query, setQuery] = useState('');

  const { data: guides = [], isLoading: guidesLoading, refetch: refetchGuides } = useGuides({ limit: 15 });
  const { data: categories = [] } = useCategories();
  const { data: feed = [], refetch: refetchFeed } = useFeed(8);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchGuides(), refetchFeed()]);
    setRefreshing(false);
  }, [refetchGuides, refetchFeed]);

  const filteredGuides = query.trim()
    ? guides.filter(g =>
        g.title.toLowerCase().includes(query.toLowerCase()) ||
        g.category.toLowerCase().includes(query.toLowerCase())
      )
    : guides;

  const sections: Section[] = [
    { type: 'search' },
    ...(query.trim() === '' ? [{ type: 'categories' } as Section] : []),
    { type: 'section-header', label: query.trim() ? `Results for "${query}"` : 'Popular guides' },
    ...(guidesLoading
      ? [{ type: 'loading' } as Section]
      : filteredGuides.length === 0
        ? [{ type: 'empty', message: 'No guides found' } as Section]
        : filteredGuides.map(g => ({ type: 'guide', guide: g } as Section))
    ),
    ...(query.trim() === '' && feed.length > 0
      ? [
          { type: 'feed-header' } as Section,
          ...feed.map(f => ({ type: 'feed', itemId: f.id } as Section)),
        ]
      : []),
  ];

  const feedMap = Object.fromEntries(feed.map(f => [f.id, f]));

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={sections}
        keyExtractor={(item, i) => {
          if (item.type === 'guide') return item.guide.id;
          if (item.type === 'feed') return `feed-${item.itemId}`;
          return `${item.type}-${i}`;
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1A6B43" />}
        ListHeaderComponent={<View style={styles.headerSpacer} />}
        renderItem={({ item }) => {
          if (item.type === 'search') {
            return (
              <View style={styles.searchWrap}>
                <Text style={styles.logo}>OpenSteps</Text>
                <SearchBar value={query} onChangeText={setQuery} />
              </View>
            );
          }
          if (item.type === 'categories' && categories.length > 0) {
            return (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Browse by category</Text>
                <CategoryGrid categories={categories} />
              </View>
            );
          }
          if (item.type === 'section-header') {
            return <Text style={[styles.sectionLabel, styles.sectionPad]}>{item.label}</Text>;
          }
          if (item.type === 'loading') {
            return <ActivityIndicator color="#1A6B43" style={{ marginTop: 32 }} />;
          }
          if (item.type === 'empty') {
            return <Text style={styles.empty}>{item.message}</Text>;
          }
          if (item.type === 'guide') {
            return (
              <View style={styles.cardPad}>
                <GuideCard guide={item.guide} />
              </View>
            );
          }
          if (item.type === 'feed-header') {
            return <Text style={[styles.sectionLabel, styles.sectionPad]}>Community activity</Text>;
          }
          if (item.type === 'feed') {
            const feedItem = feedMap[item.itemId];
            if (!feedItem) return null;
            return (
              <View style={styles.cardPad}>
                <FeedItem item={feedItem} />
              </View>
            );
          }
          return null;
        }}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerSpacer: {
    height: 8,
  },
  list: {
    paddingBottom: 32,
  },
  searchWrap: {
    padding: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    gap: 12,
  },
  logo: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: '#1A6B43',
    letterSpacing: -0.5,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  sectionPad: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  cardPad: {
    paddingHorizontal: 16,
  },
  empty: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 32,
    paddingHorizontal: 32,
  },
});
