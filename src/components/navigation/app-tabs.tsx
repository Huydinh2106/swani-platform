import { NativeTabs } from 'expo-router/native-tabs';
import { colors } from '@/theme';

export function AppTabs() {
  return (
    <NativeTabs
      tintColor={colors.primary}
      iconColor={{ default: colors.muted, selected: colors.primary }}
      minimizeBehavior="onScrollDown"
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
        <NativeTabs.Trigger.Label>Khám phá</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="stores">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'mappin', selected: 'mappin.circle.fill' }}
          md="location_on"
        />
        <NativeTabs.Trigger.Label>Cửa hàng</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="saved">
        <NativeTabs.Trigger.Icon sf={{ default: 'heart', selected: 'heart.fill' }} md="favorite" />
        <NativeTabs.Trigger.Label>Đã lưu</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'person.crop.circle', selected: 'person.crop.circle.fill' }}
          md="person"
        />
        <NativeTabs.Trigger.Label>Cá nhân</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
