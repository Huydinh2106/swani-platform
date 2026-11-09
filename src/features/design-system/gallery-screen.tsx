import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@/components/ui/screen';
import { PageHeader } from '@/components/ui/page-header';
import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { SearchInput } from '@/components/ui/search-input';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeading } from '@/components/ui/section-heading';
import { ProductGrid } from '@/components/domain/product-grid';
import { BrandRow } from '@/components/domain/brand-row';
import { StoreCard } from '@/components/domain/store-card';
import { brands, products, stores } from '@/fixtures/catalog';
import { colors, radius, spacing } from '@/theme';
export function GalleryScreen() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(false);
  return (
    <Screen>
      <PageHeader title="Bộ giao diện chung" subtitle="Nguồn đối chiếu trước khi merge UI." back />
      <AppText variant="caption" tone="muted">
        Dành cho phát triển. Các nút mẫu minh họa trạng thái.
      </AppText>
      <View style={styles.section}>
        <SectionHeading title="Màu & typography" />
        <View style={styles.swatches}>
          {(['primary', 'accent', 'background', 'ink'] as const).map((tone) => (
            <View key={tone} style={styles.swatch}>
              <View style={[styles.color, { backgroundColor: colors[tone] }]} />
              <AppText variant="caption">{tone}</AppText>
            </View>
          ))}
        </View>
        <AppText variant="display">Gu của bạn.</AppText>
        <AppText variant="title">Tiêu đề màn hình</AppText>
        <AppText variant="heading">Một nhóm sản phẩm</AppText>
        <AppText>Chữ nội dung · Tiếng Việt: ă â đ ê ô ơ ư</AppText>
        <AppText variant="caption" tone="muted">
          Chú thích & thông tin bổ sung
        </AppText>
      </View>
      <View style={styles.section}>
        <SectionHeading title="Nút & bộ lọc" />
        <Button title="Hành động chính" onPress={() => setSelected(!selected)} />
        <Button title="Hành động phụ" variant="secondary" onPress={() => setSelected(!selected)} />
        <Button title="Chưa khả dụng" disabled onPress={() => {}} />
        <Button title="Đang xử lý" loading onPress={() => {}} />
        <View style={styles.row}>
          <Chip label="Minimal" selected={selected} onPress={() => setSelected(!selected)} />
          <Chip label="Streetwear" selected={!selected} onPress={() => setSelected(!selected)} />
        </View>
        <SearchInput value={query} onChangeText={setQuery} />
      </View>
      <View style={styles.section}>
        <SectionHeading title="Card sản phẩm" />
        <ProductGrid products={products.slice(0, 2)} brands={brands} embedded />
      </View>
      <View style={styles.section}>
        <SectionHeading title="Brand & cửa hàng" />
        <BrandRow brand={brands[0]} />
        <StoreCard store={stores[0]} />
      </View>
      <EmptyState
        title="Không có kết quả"
        description="Mẫu trạng thái rỗng để tất cả các màn dùng chung."
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  section: { gap: spacing.lg },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  swatches: { flexDirection: 'row', gap: spacing.lg, flexWrap: 'wrap' },
  swatch: { gap: spacing.xs },
  color: {
    width: spacing.hero,
    height: spacing.hero,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
