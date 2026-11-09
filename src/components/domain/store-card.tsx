import { Linking, StyleSheet, View } from 'react-native';
import type { Store } from '@/contracts/catalog';
import { colors, radius, spacing } from '@/theme';
import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
export function StoreCard({ store }: { store: Store }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Icon name="pin" color={colors.primary} />
        <View style={styles.info}>
          <AppText variant="label">{store.name}</AppText>
          <AppText variant="caption" tone="muted">
            {store.address}
          </AppText>
          <AppText variant="caption" tone="muted">
            Giờ mẫu: {store.hours}
          </AppText>
        </View>
      </View>
      <Button
        title="Mở vị trí mẫu trên bản đồ"
        variant="secondary"
        onPress={() => {
          void Linking.openURL(
            `https://www.google.com/maps/search/?api=1&query=${store.latitude},${store.longitude}`,
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    gap: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: { flexDirection: 'row', gap: spacing.md },
  info: { flex: 1, gap: spacing.xs },
});
