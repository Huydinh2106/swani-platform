import { Text, type TextProps } from 'react-native';
import { colors, type } from '@/theme';

type Props = TextProps & { variant?: keyof typeof type; tone?: keyof typeof colors };
export function AppText({ variant = 'body', tone = 'ink', style, ...props }: Props) {
  return <Text {...props} style={[type[variant], { color: colors[tone] }, style]} />;
}
