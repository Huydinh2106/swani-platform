import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { colors, opacity, radius, size, spacing, type } from '@/theme';
import { AppText } from './app-text';
import { Icon } from './icon';
import { IconButton } from './icon-button';
import { GlassSurface } from './glass-surface';

const searchPlaceholder = 'Tìm sản phẩm, thương hiệu';

export function SearchEntry({ onPress }: { onPress(): void }) {
  return (
    <GlassSurface interactive>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Mở tìm kiếm sản phẩm"
        onPress={onPress}
        style={styles.wrap}
      >
        {({ pressed }) => (
          <View
            style={[styles.entryContent, { opacity: pressed ? opacity.pressed : opacity.full }]}
          >
            <Icon name="search" color={colors.muted} />
            <AppText variant="search" tone="muted" numberOfLines={1} style={styles.entryText}>
              {searchPlaceholder}
            </AppText>
          </View>
        )}
      </Pressable>
    </GlassSurface>
  );
}

export function SearchInput({
  value,
  onChangeText,
  placeholder = searchPlaceholder,
  onSubmit,
  autoFocus = false,
}: {
  value: string;
  onChangeText(value: string): void;
  placeholder?: string;
  onSubmit?(): void;
  autoFocus?: boolean;
}) {
  return (
    <GlassSurface style={styles.wrap}>
      <Icon name="search" color={colors.muted} />
      <TextInput
        accessibilityLabel="Tìm kiếm sản phẩm"
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        autoCorrect={false}
        autoCapitalize="none"
        autoFocus={autoFocus}
        selectionColor={colors.primary}
        style={styles.input}
      />
      {value ? (
        <IconButton name="close" label="Xóa từ khóa" onPress={() => onChangeText('')} />
      ) : null}
    </GlassSurface>
  );
}
const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
    borderRadius: radius.pill,
    minHeight: size.search,
  },
  entryContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  entryText: { flex: 1 },
  input: {
    ...type.search,
    color: colors.ink,
    flex: 1,
    minWidth: 0,
    minHeight: size.search,
    paddingVertical: spacing.md,
    paddingHorizontal: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
