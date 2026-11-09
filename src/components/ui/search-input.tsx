import { StyleSheet, TextInput, View } from 'react-native';
import { colors, radius, size, spacing, type } from '@/theme';
import { Icon } from './icon';
import { IconButton } from './icon-button';
export function SearchInput({
  value,
  onChangeText,
  placeholder = 'Bạn đang tìm món đồ nào?',
  onSubmit,
}: {
  value: string;
  onChangeText(value: string): void;
  placeholder?: string;
  onSubmit?(): void;
}) {
  return (
    <View style={styles.wrap}>
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
        style={styles.input}
      />
      {value ? (
        <IconButton name="close" label="Xóa từ khóa" onPress={() => onChangeText('')} />
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingLeft: spacing.lg,
    paddingRight: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    minHeight: size.button,
  },
  input: {
    ...type.body,
    color: colors.ink,
    flex: 1,
    minWidth: 0,
    minHeight: size.button,
    paddingVertical: spacing.md,
  },
});
