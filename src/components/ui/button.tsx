import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { colors, opacity, radius, size, spacing } from '@/theme';
import { AppText } from './app-text';
import { Icon, type IconName } from './icon';
import { GlassSurface } from './glass-surface';

type Props = {
  title: string;
  onPress(): void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  icon?: IconName;
  style?: StyleProp<ViewStyle>;
};
export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
  style,
}: Props) {
  const foreground = variant === 'primary' ? colors.onPrimary : colors.primary;
  const button = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        { opacity: disabled ? opacity.disabled : pressed ? opacity.pressed : opacity.full },
        variant !== 'secondary' && style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={foreground} />
      ) : (
        <View style={styles.content}>
          {icon ? <Icon name={icon} color={foreground} size={size.iconSm} /> : null}
          <AppText variant="label" tone={variant === 'primary' ? 'onPrimary' : 'primary'}>
            {title}
          </AppText>
        </View>
      )}
    </Pressable>
  );
  return variant === 'secondary' ? (
    <GlassSurface interactive={!disabled && !loading} style={[styles.secondary, style]}>
      {button}
    </GlassSurface>
  ) : (
    button
  );
}
const styles = StyleSheet.create({
  base: {
    minHeight: size.button,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  primary: { backgroundColor: colors.primary },
  secondary: { borderRadius: radius.md },
  ghost: { backgroundColor: colors.transparent },
});
