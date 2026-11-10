import { Pressable, StyleSheet } from 'react-native';
import { colors, opacity, radius, size } from '@/theme';
import { Icon, type IconName } from './icon';
import { GlassSurface } from './glass-surface';
export function IconButton({
  name,
  label,
  onPress,
  selected = false,
  disabled = false,
  diameter = size.touch,
}: {
  name: IconName;
  label: string;
  onPress(): void;
  selected?: boolean;
  disabled?: boolean;
  diameter?: number;
}) {
  return (
    <GlassSurface interactive={!disabled}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ selected, disabled }}
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          styles.base,
          { width: diameter, height: diameter },
          { opacity: disabled ? opacity.disabled : pressed ? opacity.pressed : opacity.full },
        ]}
      >
        <Icon name={name} color={colors.primary} filled={selected} />
      </Pressable>
    </GlassSurface>
  );
}
const styles = StyleSheet.create({
  base: {
    minWidth: size.touch,
    minHeight: size.touch,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
  },
});
