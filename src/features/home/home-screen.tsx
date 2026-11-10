import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@/components/ui/screen';
import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { Icon } from '@/components/ui/icon';
import { SearchEntry } from '@/components/ui/search-input';
import { SectionHeading } from '@/components/ui/section-heading';
import { ProductArtwork } from '@/components/domain/product-artwork';
import { ProductGrid } from '@/components/domain/product-grid';
import { BrandRow } from '@/components/domain/brand-row';
import { CatalogFeedback } from '@/components/domain/catalog-feedback';
import { useBrands, useProducts } from '@/hooks/use-catalog';
import { categories } from '@/fixtures/catalog';
import { colors, radius, size, spacing } from '@/theme';
export function HomeScreen() {
  const products = useProducts();
  const brands = useBrands();
  return (
    <Screen>
      <SearchEntry
        onPress={() => router.push({ pathname: '/search', params: { focus: 'true' } })}
      />
      <View style={styles.top}>
        <View style={styles.location}>
          <Icon name="pin" size={size.iconSm} />
          <AppText variant="label">Hà Nội</AppText>
          <AppText variant="caption" tone="muted">
            Khu vực mẫu
          </AppText>
        </View>
        <View style={styles.demo}>
          <AppText variant="eyebrow" tone="primary">
            DEMO / 01
          </AppText>
        </View>
      </View>
      <View style={styles.intro}>
        <AppText variant="eyebrow" tone="primary">
          LOCAL FINDS, YOUR STYLE
        </AppText>
        <AppText variant="display">Gu của bạn.{'\n'}Brand quanh bạn.</AppText>
        <AppText tone="muted">Khám phá những món đồ có cá tính riêng.</AppText>
      </View>
      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <AppText variant="eyebrow" tone="accent">
            THE EVERYDAY EDIT
          </AppText>
          <AppText variant="title" tone="onPrimary">
            Mặc đơn giản.{'\n'}Đẹp theo cách bạn.
          </AppText>
          <Button
            title="Khám phá ngay"
            variant="secondary"
            icon="arrow"
            onPress={() => router.push('/search')}
          />
        </View>
        <View style={styles.heroArt}>
          <ProductArtwork category="shirt" color="sand" />
        </View>
      </View>
      <View style={styles.section}>
        <SectionHeading title="Hôm nay mặc gì?" />
        <View style={styles.chips}>
          {categories.map((category) => (
            <Chip
              key={category.value}
              label={category.label}
              onPress={() =>
                router.push({ pathname: '/search', params: { category: category.value } })
              }
            />
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <SectionHeading
          title="Những món đáng khám phá"
          action={{ title: 'Xem tất cả', onPress: () => router.push('/search') }}
        />
        <CatalogFeedback
          loading={products.isPending || brands.isPending}
          error={products.isError || brands.isError}
          retry={() => {
            void products.refetch();
            void brands.refetch();
          }}
        />
        {products.data && brands.data ? (
          <ProductGrid embedded products={products.data.slice(0, 4)} brands={brands.data} />
        ) : null}
      </View>
      <View style={styles.section}>
        <SectionHeading title="Brand có câu chuyện riêng" />
        {brands.data?.map((brand) => (
          <BrandRow key={brand.id} brand={brand} />
        ))}
      </View>
      <AppText variant="caption" tone="muted">
        Bản khởi đầu · Brand, sản phẩm và minh họa đều là dữ liệu mẫu.
      </AppText>
    </Screen>
  );
}
const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  location: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.sm },
  demo: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
  },
  intro: { gap: spacing.sm },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    borderCurve: 'continuous',
    padding: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  heroCopy: { flex: 1.4, gap: spacing.lg },
  heroArt: {
    flex: 1,
    height: size.heroArt,
    borderRadius: radius.lg,
    overflow: 'hidden',
    transform: [{ rotate: '7deg' }],
  },
  section: { gap: spacing.lg },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
