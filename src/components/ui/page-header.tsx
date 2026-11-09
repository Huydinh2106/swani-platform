import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { spacing } from '@/theme';
import { AppText } from './app-text';
import { IconButton } from './icon-button';
export function PageHeader({
  title,
  subtitle,
  back = false,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
}) {
  return (
    <View style={styles.row}>
      {back ? (
        <IconButton
          name="back"
          label="Quay lại"
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
        />
      ) : null}
      <View style={styles.title}>
        <AppText variant="title" accessibilityRole="header">
          {title}
        </AppText>
        {subtitle ? <AppText tone="muted">{subtitle}</AppText> : null}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  title: { flex: 1, gap: spacing.xs },
});
