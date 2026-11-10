import type { PropsWithChildren } from 'react';
import { useSegments } from 'expo-router';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, size, spacing } from '@/theme';
export function Screen({
  children,
  scroll = true,
  style,
}: PropsWithChildren<{ scroll?: boolean; style?: StyleProp<ViewStyle> }>) {
  const segments = useSegments();
  const insets = useSafeAreaInsets();
  const bottomSpace =
    segments[0] !== '(tabs)'
      ? insets.bottom + spacing.xxxl
      : Platform.OS === 'web'
        ? size.tabBar + Math.max(spacing.md, insets.bottom) + spacing.xl
        : spacing.xxxl; // NativeTabs adjusts the scroll view's insets to the system tab bar.
  return (
    <SafeAreaView collapsable={false} edges={['top', 'left', 'right']} style={styles.safe}>
      {scroll ? (
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
          <View style={[styles.content, { paddingBottom: bottomSpace }, style]}>{children}</View>
        </ScrollView>
      ) : (
        <View style={[styles.content, styles.fill, { paddingBottom: bottomSpace }, style]}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1 },
  content: {
    width: '100%',
    maxWidth: size.contentMax,
    alignSelf: 'center',
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
    gap: spacing.xxl,
  },
  fill: { flex: 1 },
});
