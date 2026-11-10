import { GlassView, isGlassEffectAPIAvailable, isLiquidGlassAvailable } from 'expo-glass-effect';
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { AccessibilityInfo, Platform, StyleSheet, View, type ViewProps } from 'react-native';
import { colors, glass, radius } from '@/theme';

const GlassEnabledContext = createContext(false);

export function GlassProvider({ children }: PropsWithChildren) {
  // Start opaque until the accessibility preference is known, including during SSR.
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (Platform.OS !== 'ios' || !isLiquidGlassAvailable() || !isGlassEffectAPIAvailable()) return;
    let active = true;
    let preferenceChanged = false;
    const subscription = AccessibilityInfo.addEventListener(
      'reduceTransparencyChanged',
      (reduce) => {
        preferenceChanged = true;
        setEnabled(!reduce);
      },
    );
    void AccessibilityInfo.isReduceTransparencyEnabled().then(
      (reduce) => {
        if (active && !preferenceChanged) setEnabled(!reduce);
      },
      () => {}, // Keep the opaque surface if the preference cannot be read.
    );
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);
  return <GlassEnabledContext value={enabled}>{children}</GlassEnabledContext>;
}

export function GlassSurface({
  children,
  style,
  interactive = false,
  ...props
}: ViewProps & { interactive?: boolean }) {
  const enabled = useContext(GlassEnabledContext);
  if (enabled) {
    return (
      <GlassView
        {...props}
        glassEffectStyle="regular"
        colorScheme="light"
        tintColor={glass.tint}
        isInteractive={interactive}
        style={[styles.base, style]}
      >
        {children}
      </GlassView>
    );
  }
  return (
    <View {...props} style={[styles.base, styles.opaque, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.pill, borderCurve: 'continuous' },
  opaque: {
    backgroundColor: colors.surface,
    borderColor: glass.border,
    borderWidth: StyleSheet.hairlineWidth,
    boxShadow: glass.shadow,
  },
});
