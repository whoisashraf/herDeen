import { Stack } from 'expo-router';
import React from 'react';

export default function QuranLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
            <Stack.Screen name="reading-mode" options={{ headerShown: false }} />
        </Stack>
    );
}
