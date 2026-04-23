import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import type { Category } from '@opensteps/types';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  const router = useRouter();

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.key}
      numColumns={4}
      scrollEnabled={false}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.cell}
          onPress={() => router.push(`/category/${item.key}`)}
          activeOpacity={0.7}
        >
          <View style={styles.iconWrap}>
            <CategoryIcon category={item.key} size={22} />
          </View>
          <Text style={styles.label} numberOfLines={1}>{item.label}</Text>
          <Text style={styles.count}>{item.count}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: '#374151',
    textAlign: 'center',
  },
  count: {
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
    color: '#9CA3AF',
  },
});
