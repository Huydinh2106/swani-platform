import { router } from 'expo-router';
import { Screen } from '@/components/ui/screen';
import { EmptyState } from '@/components/ui/empty-state';
export default function NotFound() {
  return (
    <Screen>
      <EmptyState
        title="Trang này chưa có"
        description="Quay lại khám phá những món đồ mới nhé."
        action={{ title: 'Về trang chủ', onPress: () => router.replace('/') }}
      />
    </Screen>
  );
}
