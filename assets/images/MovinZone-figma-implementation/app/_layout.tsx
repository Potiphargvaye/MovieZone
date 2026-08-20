import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { Colors } from '@/constants/theme';

export const unstable_settings = {
  anchor: 'index',
};

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.background,
    card: Colors.background,
    text: Colors.text,
    border: Colors.border,
    primary: Colors.primary,
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={navigationTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="movie/[id]" />
        <Stack.Screen name="booking/[id]/seats" />
        <Stack.Screen name="booking/success" />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
