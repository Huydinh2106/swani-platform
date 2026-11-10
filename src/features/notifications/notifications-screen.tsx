import { AppText } from '@/components/ui/app-text';
import { PageHeader } from '@/components/ui/page-header';
import { Screen } from '@/components/ui/screen';

export function NotificationsScreen() {
  return (
    <Screen>
      <PageHeader title="Thông báo" />
      <AppText tone="muted">Mục thông báo sẽ xuất hiện tại đây.</AppText>
    </Screen>
  );
}
