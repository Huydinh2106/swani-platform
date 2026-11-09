import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { Category } from '@/contracts/catalog';
import { Screen } from '@/components/ui/screen';
import { PageHeader } from '@/components/ui/page-header';
import { AppText } from '@/components/ui/app-text';
import { Chip } from '@/components/ui/chip';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';
import { EmptyState } from '@/components/ui/empty-state';
import { ProductGrid } from '@/components/domain/product-grid';
import { CatalogFeedback } from '@/components/domain/catalog-feedback';
import { categories } from '@/fixtures/catalog';
import { useBrands, useProducts } from '@/hooks/use-catalog';
import { spacing } from '@/theme';
export function SearchScreen() {
  const params = useLocalSearchParams<{ q?: string; category?: string }>();
  const initialCategory = categories.find((item) => item.value === params.category)?.value;
  return (
    <SearchContent
      key={JSON.stringify([params.q, params.category])}
      initialQuery={params.q ?? ''}
      initialCategory={initialCategory}
    />
  );
}
function SearchContent({
  initialQuery,
  initialCategory,
}: {
  initialQuery: string;
  initialCategory?: Category;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<Category | undefined>(initialCategory);
  const [under500, setUnder500] = useState(false);
  const [priceSort, setPriceSort] = useState(false);
  const products = useProducts({
    query,
    category,
    maxPriceVnd: under500 ? 500000 : undefined,
    sort: priceSort ? 'price-asc' : 'featured',
  });
  const brands = useBrands();
  function reset() {
    setQuery('');
    setCategory(undefined);
    setUnder500(false);
    setPriceSort(false);
  }
  return (
    <Screen scroll={false}>
      <PageHeader title="Tìm đúng gu" subtitle="Những local brand bạn sắp yêu thích." />
      <SearchInput
        value={query}
        onChangeText={setQuery}
        placeholder="Thử “sơ mi”, “linen”, “Nếp”…"
      />
      <View style={styles.chips}>
        <Chip label="Tất cả" selected={!category} onPress={() => setCategory(undefined)} />
        {categories.map((item) => (
          <Chip
            key={item.value}
            label={item.label}
            selected={category === item.value}
            onPress={() => setCategory(item.value)}
          />
        ))}
        <Chip label="Đến 500k" selected={under500} onPress={() => setUnder500(!under500)} />
      </View>
      <View style={styles.summary}>
        <AppText variant="label">
          {products.isPending ? 'Đang tìm…' : `${products.data?.length ?? 0} sản phẩm mẫu`}
        </AppText>
        <Button
          variant="ghost"
          title={priceSort ? 'Giá tăng dần ↑' : 'Sắp xếp theo giá'}
          onPress={() => setPriceSort(!priceSort)}
        />
      </View>
      <CatalogFeedback
        loading={products.isPending || brands.isPending}
        error={products.isError || brands.isError}
        retry={() => {
          void products.refetch();
          void brands.refetch();
        }}
      />
      {products.data && brands.data && !products.isError ? (
        products.data.length ? (
          <ProductGrid products={products.data} brands={brands.data} />
        ) : (
          <EmptyState
            title="Chưa tìm thấy món phù hợp"
            description="Thử từ khóa khác hoặc bỏ bớt bộ lọc nhé."
            action={{ title: 'Xóa bộ lọc', onPress: reset }}
          />
        )
      ) : null}
    </Screen>
  );
}
const styles = StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
});
