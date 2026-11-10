import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { GlassSurface } from '@/components/ui/glass-surface';
import { Icon, type IconName } from '@/components/ui/icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, size, spacing, type } from '@/theme';
const tabs: { name: string; title: string; icon: IconName }[] = [
  { name: 'index', title: 'Khám phá', icon: 'home' },
  { name: 'stores', title: 'Cửa hàng', icon: 'pin' },
  { name: 'notifications', title: 'Thông báo', icon: 'bell' },
  { name: 'profile', title: 'Cá nhân', icon: 'user' },
];
// Web preview only. Mobile resolves app-tabs.tsx and uses the system tab bar.
export function AppTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarHideOnKeyboard: true,
        tabBarBackground: () => <GlassSurface style={StyleSheet.absoluteFill} />,
        tabBarStyle: {
          position: 'absolute',
          bottom: Math.max(spacing.md, insets.bottom),
          left: spacing.md,
          right: spacing.md,
          height: size.tabBar,
          paddingBottom: spacing.sm,
          paddingHorizontal: spacing.xs,
          backgroundColor: colors.transparent,
          borderTopWidth: 0,
          borderRadius: radius.pill,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarItemStyle: { paddingTop: spacing.xs, borderRadius: radius.pill },
        tabBarLabelStyle: { ...type.caption },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.icon, focused && styles.selected]}>
                <Icon name={tab.icon} color={typeof color === 'string' ? color : colors.primary} />
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  selected: { backgroundColor: colors.scrim },
});
