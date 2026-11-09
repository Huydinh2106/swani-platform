import { StyleSheet, View } from 'react-native';
import type { Brand } from '@/contracts/catalog';
import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { colors, radius, size, spacing } from '@/theme';
import { useDemoState } from '@/state/demo-state';
export function BrandRow({ brand }: { brand: Brand }) {
  const { followedIds, toggleFollowed, hydrated } = useDemoState();
  const followed = followedIds.includes(brand.id);
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <AppText variant="label" tone="onPrimary">
          {brand.name.slice(0, 2)}
        </AppText>
      </View>
      <View style={styles.info}>
        <AppText variant="label">{brand.name}</AppText>
        <AppText variant="caption" tone="muted">
          {brand.tagline}
        </AppText>
      </View>
      <Button
        title={followed ? 'Đã theo dõi' : 'Theo dõi'}
        variant={followed ? 'secondary' : 'ghost'}
        disabled={!hydrated}
        onPress={() => toggleFollowed(brand.id)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  avatar: {
    width: size.avatar,
    height: size.avatar,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1, minWidth: 0 },
});
