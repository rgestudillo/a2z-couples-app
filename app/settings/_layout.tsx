import React from 'react';
import { Stack } from 'expo-router';

export default function SettingsLayout() {
    return (
        <Stack>
            <Stack.Screen name="data-manager" options={{ headerShown: true, headerTitle: 'Offline Data Manager' }} />
            {/* Add more settings screens here */}
        </Stack>
    );
} 