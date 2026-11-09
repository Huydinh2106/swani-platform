import { Screen } from '@/components/ui/screen';
import { PageHeader } from '@/components/ui/page-header';
import { AppText } from '@/components/ui/app-text';
import { StoreCard } from '@/components/domain/store-card';
import { CatalogFeedback } from '@/components/domain/catalog-feedback';
import { useStores } from '@/hooks/use-catalog';
export function StoresScreen() {
  const stores = useStores();
  return (
    <Screen>
      <PageHeader title="Hẹn ở cửa hàng" subtitle="Một vòng local brand quanh Hà Nội." />
      <AppText tone="muted">
        Starter hiển thị danh sách và mở tọa độ mẫu trên Google Maps. Bản đồ tương tác, GPS và bộ
        lọc khoảng cách thuộc task của AI 4.
      </AppText>
      <CatalogFeedback
        loading={stores.isPending}
        error={stores.isError}
        retry={() => {
          void stores.refetch();
        }}
      />
      {stores.data?.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </Screen>
  );
}
