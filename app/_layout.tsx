import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

import {
  Amiri_400Regular,
  Amiri_400Regular_Italic,
  Amiri_700Bold,
  Amiri_700Bold_Italic,
} from '@expo-google-fonts/amiri';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { AuthProvider, useAuth } from '@/contexts/auth-context'; // Import AuthProvider and useAuth
import { PlannerProvider } from '@/contexts/planner-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

const InitialLayout = () => {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Amiri_400Regular,
    Amiri_400Regular_Italic,
    Amiri_700Bold,
    Amiri_700Bold_Italic,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const { isAuthenticated } = useAuth(); // Use isAuthenticated from AuthContext

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Sync root native background with theme so dark mode shows correctly in simulator/dev builds
  useEffect(() => {
    const bg = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;
    SystemUI.setBackgroundColorAsync(bg);
  }, [colorScheme]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PlannerProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            <Stack.Screen name="(drawer)" />
            <Stack.Screen name="(auth)" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PlannerProvider>
    </SafeAreaProvider>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
