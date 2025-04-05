import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View, Text } from 'react-native';

// Custom header title component with icon
const CustomHeaderTitle = ({ title, icon }: { title: string, icon?: string }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {icon && <Ionicons name={icon as any} size={26} color="#ff6b6b" style={{ marginRight: 10 }} />}
    <Text style={{
      fontSize: 26,
      fontWeight: '800',
      color: '#333',
      letterSpacing: -0.5
    }}>
      {title}
    </Text>
  </View>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ff6b6b',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarStyle: {
          height: 65,
          paddingVertical: 20,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
          elevation: 5,
          backgroundColor: '#ffffff',
        },
        headerStyle: {
          backgroundColor: '#ffffff',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
          height: 110,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 26,
          color: '#333',
          letterSpacing: -0.5,
        },
        headerTitleAlign: 'left',
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
        headerRightContainerStyle: {
          paddingRight: 20,
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerTitle: () => <CustomHeaderTitle title="A2Z Ideas" icon="heart" />,
        }}
      />
      <Tabs.Screen
        name="letters"
        options={{
          title: 'A-Z',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
          headerTitle: () => <CustomHeaderTitle title="Browse by Letter" icon="grid" />,
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          headerTitle: () => <CustomHeaderTitle title="Find Places or Products" icon="search" />,
        }}
      />
      <Tabs.Screen
        name="wrapped"
        options={{
          title: 'Wrapped',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="albums" size={size} color={color} />
          ),
          headerTitle: () => <CustomHeaderTitle title="Your Ideas Wrapped" icon="gift" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
          headerTitle: () => <CustomHeaderTitle title="Settings" icon="cog" />,
        }}
      />
    </Tabs>
  );
}
