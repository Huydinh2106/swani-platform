import { StyleSheet, View } from 'react-native';
import { spacing } from '@/theme';
import { AppText } from './app-text';
import { Button } from './button';
import { Icon, type IconName } from './icon';
export function EmptyState({
  title,
  description,
  icon = 'search',
  action,
}: {
  title: string;
  description: string;
  icon?: IconName;
  action?: { title: string; onPress(): void };
}) {
  return (
    <View style={styles.wrap}>
      <Icon name={icon} />
      <AppText variant="heading" style={styles.text}>
        {title}
      </AppText>
      <AppText tone="muted" style={styles.text}>
        {description}
      </AppText>
      {action ? <Button {...action} variant="secondary" /> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.hero,
    gap: spacing.lg,
  },
  text: { textAlign: 'center' },
});
