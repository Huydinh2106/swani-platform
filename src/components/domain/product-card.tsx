import { Pressable, StyleSheet, View } from 'react-native';
import type { Brand, Product } from '@/contracts/catalog';
import { colors, opacity, radius, spacing, type } from '@/theme';
import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import { ProductArtwork } from './product-artwork';
import { formatVnd } from '@/utils/format';
export function ProductCard({
  product,
  brand,
  saved,
  disabled,
  onPress,
  onToggleSaved,
}: {
  product: Product;
  brand?: Brand;
  saved: boolean;
  disabled?: boolean;
  onPress(): void;
  onToggleSaved(): void;
}) {
  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${product.name}, ${formatVnd(product.priceVnd)}`}
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? opacity.pressed : opacity.full }]}
      >
        <View style={styles.art}>
          <ProductArtwork category={product.category} color={product.color} />
        </View>
        <View style={styles.info}>
          <AppText variant="eyebrow" tone="muted">
            {brand?.name ?? 'LOCAL BRAND'}
          </AppText>
          <AppText variant="label" numberOfLines={2} style={styles.name}>
            {product.name}
          </AppText>
          <AppText variant="price">{formatVnd(product.priceVnd)}</AppText>
        </View>
      </Pressable>
      <View style={styles.save}>
        <IconButton
          name="heart"
          label={saved ? `Bỏ lưu ${product.name}` : `Lưu ${product.name}`}
          selected={saved}
          disabled={disabled}
          onPress={onToggleSaved}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 0 },
  art: {
    aspectRatio: 0.86,
    overflow: 'hidden',
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    backgroundColor: colors.subtle,
  },
  info: { paddingTop: spacing.md, gap: spacing.xs },
  name: { minHeight: type.label.lineHeight * 2 },
  save: { position: 'absolute', right: spacing.sm, top: spacing.sm },
});
