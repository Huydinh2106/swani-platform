import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DemoProvider } from '@/state/demo-state';
import { GlassProvider } from '@/components/ui/glass-surface';
import { colors } from '@/theme';

const navigationTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.background },
};

export default function RootLayout() {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000, retry: 1 } } }),
  );
  return (
    <SafeAreaProvider>
      <ThemeProvider value={navigationTheme}>
        <QueryClientProvider client={queryClient}>
          <DemoProvider>
            <GlassProvider>
              <StatusBar style="dark" />
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: colors.background },
                }}
              >
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                  name="search"
                  options={{ presentation: 'card', animation: 'default' }}
                />
                <Stack.Screen name="product/[id]" />
                <Stack.Screen name="design-system" />
                <Stack.Screen name="brand" />
              </Stack>
            </GlassProvider>
          </DemoProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
