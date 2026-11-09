import { ActivityIndicator, View } from 'react-native';
import { colors, spacing } from '@/theme';
import { AppText } from '@/components/ui/app-text';
import { EmptyState } from '@/components/ui/empty-state';
export function CatalogFeedback({
  loading,
  error,
  retry,
}: {
  loading: boolean;
  error: boolean;
  retry(): void;
}) {
  if (loading)
    return (
      <View
        accessibilityRole="progressbar"
        accessibilityLabel="Đang tải sản phẩm"
        style={{ padding: spacing.xxxl, gap: spacing.md, alignItems: 'center' }}
      >
        <ActivityIndicator color={colors.primary} />
        <AppText tone="muted">Đang tải bộ sưu tập…</AppText>
      </View>
    );
  if (error)
    return (
      <EmptyState
        title="Chưa tải được dữ liệu"
        description="Bạn thử lại giúp mình nhé."
        action={{ title: 'Thử lại', onPress: retry }}
      />
    );
  return null;
}
