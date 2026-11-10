import { router } from 'expo-router';
import { Screen } from '@/components/ui/screen';
import { PageHeader } from '@/components/ui/page-header';
import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import { BrandRow } from '@/components/domain/brand-row';
import { CatalogFeedback } from '@/components/domain/catalog-feedback';
import { useBrands } from '@/hooks/use-catalog';
import { useDemoState } from '@/state/demo-state';
export function ProfileScreen() {
  const { followedIds, hydrated, storageError } = useDemoState();
  const brands = useBrands();
  return (
    <Screen>
      <PageHeader title="Góc nhỏ của bạn" subtitle="Chào bạn, người yêu local brand." />
      <AppText tone="muted">
        Bạn đang dùng chế độ khách. Đăng nhập và đồng bộ tài khoản sẽ được bổ sung ở giai đoạn
        backend.
      </AppText>
      <Button
        title="Xem bộ component chung"
        icon="grid"
        variant="secondary"
        onPress={() => router.push('/design-system')}
      />
      <Button title="Không gian dành cho brand" icon="bag" onPress={() => router.push('/brand')} />
      <SectionHeading title={`Đang theo dõi · ${followedIds.length}`} />
      <CatalogFeedback
        loading={!hydrated || brands.isPending}
        error={brands.isError}
        retry={() => {
          void brands.refetch();
        }}
      />
      {storageError ? <AppText tone="danger">Chưa lưu được thay đổi trên thiết bị.</AppText> : null}
      {brands.data
        ?.filter((brand) => followedIds.includes(brand.id))
        .map((brand) => (
          <BrandRow key={brand.id} brand={brand} />
        ))}
      {hydrated && !brands.isPending && !followedIds.length ? (
        <AppText tone="muted">Theo dõi brand tại trang Khám phá hoặc Chi tiết sản phẩm.</AppText>
      ) : null}
      <AppText variant="caption" tone="muted">
        SWANI / Starter cho nhóm 5 người
      </AppText>
    </Screen>
  );
}
