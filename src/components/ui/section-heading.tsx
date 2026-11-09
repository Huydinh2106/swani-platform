import { StyleSheet, View } from 'react-native';
import { spacing } from '@/theme';
import { AppText } from './app-text';
import { Button } from './button';
export function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: { title: string; onPress(): void };
}) {
  return (
    <View style={styles.row}>
      <AppText variant="heading" style={styles.title}>
        {title}
      </AppText>
      {action ? <Button {...action} variant="ghost" /> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  title: { flex: 1 },
});
