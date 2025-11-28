import { Stack } from 'expo-router';

export default function PlannerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="plan-result" />
      <Stack.Screen name="my-plan" />
    </Stack>
  );
}
