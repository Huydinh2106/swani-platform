import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { EmptyState } from '@/components/ui/empty-state';
import { PageHeader } from '@/components/ui/page-header';
import { Screen } from '@/components/ui/screen';
import { SectionHeading } from '@/components/ui/section-heading';
import { BrandRow } from '@/components/domain/brand-row';
import { CatalogFeedback } from '@/components/domain/catalog-feedback';
import { ProductArtwork } from '@/components/domain/product-artwork';
import { StoreCard } from '@/components/domain/store-card';
import { useBrands, useProduct, useStores } from '@/hooks/use-catalog';
import { useDemoState } from '@/state/demo-state';
import { radius, spacing } from '@/theme';
import { formatVnd } from '@/utils/format';

export function ProductScreen() {
  const { id = '' } = useLocalSearchParams<{ id: string }>();
  const product = useProduct(id);
  const brands = useBrands();
  const stores = useStores();
  const { savedIds, toggleSaved, hydrated } = useDemoState();
  const [selectedSize, setSelectedSize] = useState<string>();
  if (product.isPending || product.isError)
    return (
      <Screen>
        <PageHeader title="Chi tiết sản phẩm" back />
        <CatalogFeedback
          loading={product.isPending}
          error={product.isError}
          retry={() => {
            void product.refetch();
          }}
        />
      </Screen>
    );
  if (!product.data)
    return (
      <Screen>
        <PageHeader title="Chi tiết sản phẩm" back />
        <EmptyState
          title="Không tìm thấy sản phẩm"
          description="Sản phẩm này chưa có trong bộ dữ liệu mẫu."
        />
      </Screen>
    );
  const item = product.data;
  const brand = brands.data?.find((entry) => entry.id === item.brandId);
  return (
    <Screen>
      <PageHeader title="Một món đồ, đúng gu" back />
      <View style={styles.art}>
        <ProductArtwork category={item.category} color={item.color} />
      </View>
      <View style={styles.section}>
        <AppText variant="eyebrow" tone="primary">
          {brand?.name ?? 'LOCAL BRAND'} / DEMO COLLECTION
        </AppText>
        <AppText variant="title">{item.name}</AppText>
        <AppText variant="price">{formatVnd(item.priceVnd)}</AppText>
        <AppText tone="muted">{item.description}</AppText>
      </View>
      <View style={styles.section}>
        <AppText variant="label">
          Kích cỡ {selectedSize ? `· ${selectedSize}` : '· Chọn để xem trạng thái'}
        </AppText>
        <View style={styles.chips}>
          {item.sizes.map((entry) => (
            <Chip
              key={entry}
              label={entry}
              selected={entry === selectedSize}
              onPress={() => setSelectedSize(entry)}
            />
          ))}
        </View>
        <AppText variant="caption" tone="muted">
          Size chỉ minh họa giao diện; chưa có tồn kho hoặc đặt hàng.
        </AppText>
      </View>
      <Button
        icon="heart"
        title={savedIds.includes(item.id) ? 'Đã lưu · Bấm để bỏ lưu' : 'Lưu vào bộ sưu tập'}
        disabled={!hydrated}
        onPress={() => toggleSaved(item.id)}
      />
      {brand ? <BrandRow brand={brand} /> : null}
      <View style={styles.section}>
        <SectionHeading title="Cửa hàng của brand" />
        <AppText variant="caption" tone="muted">
          Địa điểm mẫu; chưa xác nhận sản phẩm có sẵn tại cửa hàng.
        </AppText>
        <CatalogFeedback
          loading={stores.isPending}
          error={stores.isError}
          retry={() => {
            void stores.refetch();
          }}
        />
        {stores.data
          ?.filter((store) => item.storeIds.includes(store.id))
          .map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  art: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radius.xl,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  section: { gap: spacing.md },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
