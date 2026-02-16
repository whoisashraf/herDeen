import { Stack } from 'expo-router';

export default function PrayerTimesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="prayer-settings" />
      <Stack.Screen name="current-location" />
      <Stack.Screen name="calculation-method" />
    </Stack>
  );
}
