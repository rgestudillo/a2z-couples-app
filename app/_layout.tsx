import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { View, Text, ActivityIndicator } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { IdeasProvider } from '../context/IdeasContext';
import ConnectionStatus from '@/components/ConnectionStatus';
import { preloadAppData } from '@/utils/dataPreloader';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  // Load fonts and then preload data
  useEffect(() => {
    async function loadResources() {
      try {
        if (loaded && !dataLoaded && !dataLoading) {
          setDataLoading(true);
          // Preload all app data for offline use
          await preloadAppData();
          setDataLoaded(true);
          setDataLoading(false);

          // Hide splash screen after data is loaded
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        console.error('Error loading resources:', error);
        setDataLoaded(true); // Still mark as loaded so users can use the app
        setDataLoading(false);
        await SplashScreen.hideAsync();
      }
    }

    loadResources();
  }, [loaded, dataLoaded, dataLoading]);

  // Don't render anything until both fonts and data are loaded
  if (!loaded || !dataLoaded) {
    return null;
  }

  return (
    <IdeasProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
          <ConnectionStatus />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="letter/[letter]" options={{ title: "Letter Ideas" }} />
            <Stack.Screen name="idea/[id]" options={{ title: "Idea Details" }} />
            <Stack.Screen name="business/[id]" options={{ title: "Business Details" }} />
            <Stack.Screen name="product/[id]" options={{ title: "Product Details" }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </View>
      </ThemeProvider>
    </IdeasProvider>
  );
}
