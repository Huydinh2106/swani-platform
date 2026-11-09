import { Pressable, StyleSheet } from 'react-native';
import { colors, opacity, radius, size, spacing } from '@/theme';
import { AppText } from './app-text';
export function Chip({
  label,
  selected = false,
  onPress,
  disabled = false,
}: {
  label: string;
  selected?: boolean;
  onPress(): void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        selected && styles.selected,
        { opacity: disabled ? opacity.disabled : pressed ? opacity.pressed : opacity.full },
      ]}
    >
      <AppText variant="label" tone={selected ? 'onPrimary' : 'ink'}>
        {label}
      </AppText>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  base: {
    minHeight: size.touch,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.transparent,
  },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary },
});
