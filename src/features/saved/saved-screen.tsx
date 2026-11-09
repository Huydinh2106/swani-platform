import { router } from 'expo-router';
import { Screen } from '@/components/ui/screen';
import { PageHeader } from '@/components/ui/page-header';
import { EmptyState } from '@/components/ui/empty-state';
import { AppText } from '@/components/ui/app-text';
import { ProductGrid } from '@/components/domain/product-grid';
import { CatalogFeedback } from '@/components/domain/catalog-feedback';
import { useBrands, useProducts } from '@/hooks/use-catalog';
import { useDemoState } from '@/state/demo-state';
export function SavedScreen() {
  const { savedIds, hydrated, storageError } = useDemoState();
  const products = useProducts();
  const brands = useBrands();
  const saved = products.data?.filter((product) => savedIds.includes(product.id)) ?? [];
  const loading = !hydrated || products.isPending || brands.isPending;
  return (
    <Screen scroll={false}>
      <PageHeader title="Để dành một chút gu" subtitle="Những món bạn muốn quay lại." />
      {storageError ? (
        <AppText tone="danger">
          Thiết bị chưa lưu được dữ liệu. Thay đổi có thể mất khi đóng app.
        </AppText>
      ) : (
        <AppText variant="caption" tone="muted">
          Lưu trên thiết bị này · Chưa đồng bộ tài khoản
        </AppText>
      )}
      <CatalogFeedback
        loading={loading}
        error={products.isError || brands.isError}
        retry={() => {
          void products.refetch();
          void brands.refetch();
        }}
      />
      {!loading && products.data && brands.data && !products.isError ? (
        saved.length ? (
          <ProductGrid products={saved} brands={brands.data} />
        ) : (
          <EmptyState
            icon="heart"
            title="Bộ sưu tập đang đợi bạn"
            description="Chạm vào trái tim trên món đồ bạn thích để lưu lại đây."
            action={{ title: 'Đi khám phá', onPress: () => router.push('/search') }}
          />
        )
      ) : null}
    </Screen>
  );
}
