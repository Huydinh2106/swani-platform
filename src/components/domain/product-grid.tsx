import { router } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';
import type { Brand, Product } from '@/contracts/catalog';
import { spacing } from '@/theme';
import { useDemoState } from '@/state/demo-state';
import { ProductCard } from './product-card';

export function ProductGrid({
  products,
  brands,
  embedded = false,
}: {
  products: Product[];
  brands: Brand[];
  embedded?: boolean;
}) {
  const { savedIds, toggleSaved, hydrated } = useDemoState();
  const rows: Product[][] = [];
  for (let index = 0; index < products.length; index += 2)
    rows.push(products.slice(index, index + 2));
  function renderRow(items: Product[]) {
    return (
      <View key={items[0].id} style={styles.row}>
        {items.map((item) => (
          <View key={item.id} style={styles.cell}>
            <ProductCard
              product={item}
              brand={brands.find((brand) => brand.id === item.brandId)}
              saved={savedIds.includes(item.id)}
              disabled={!hydrated}
              onToggleSaved={() => toggleSaved(item.id)}
              onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
            />
          </View>
        ))}
        {items.length === 1 ? <View style={styles.cell} /> : null}
      </View>
    );
  }
  // Short embedded sections avoid nested VirtualizedList warnings.
  if (embedded) return <View style={styles.content}>{rows.map(renderRow)}</View>;
  return (
    <FlatList
      data={rows}
      keyExtractor={(items) => items[0].id}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => renderRow(item)}
    />
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.lg },
  cell: { flex: 1, minWidth: 0 },
  content: { gap: spacing.xxl, paddingBottom: spacing.xxl },
});
