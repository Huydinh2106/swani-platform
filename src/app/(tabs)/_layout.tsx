import { Tabs } from 'expo-router';
import { Icon, type IconName } from '@/components/ui/icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, size, spacing, type } from '@/theme';
const tabs: { name: string; title: string; icon: IconName }[] = [
  { name: 'index', title: 'Khám phá', icon: 'home' },
  { name: 'search', title: 'Tìm kiếm', icon: 'search' },
  { name: 'stores', title: 'Cửa hàng', icon: 'pin' },
  { name: 'saved', title: 'Đã lưu', icon: 'heart' },
  { name: 'profile', title: 'Cá nhân', icon: 'user' },
];
export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          height: size.tabBar + insets.bottom,
          paddingBottom: Math.max(spacing.sm, insets.bottom),
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarItemStyle: { paddingTop: spacing.xs },
        tabBarLabelStyle: { ...type.caption },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => (
              <Icon name={tab.icon} color={typeof color === 'string' ? color : colors.primary} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
