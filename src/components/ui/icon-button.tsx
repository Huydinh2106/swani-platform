import { Pressable, StyleSheet } from 'react-native';
import { colors, opacity, radius, size } from '@/theme';
import { Icon, type IconName } from './icon';
export function IconButton({
  name,
  label,
  onPress,
  selected = false,
  disabled = false,
}: {
  name: IconName;
  label: string;
  onPress(): void;
  selected?: boolean;
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
        { opacity: disabled ? opacity.disabled : pressed ? opacity.pressed : opacity.full },
      ]}
    >
      <Icon name={name} color={colors.primary} filled={selected} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  base: {
    minWidth: size.touch,
    minHeight: size.touch,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
  },
});
