import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import { HapticTab } from '@/components/haptic-tab';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          height: 90,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#C0C0C0',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Function',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', gap: 6 }}>
              <Feather name="home" size={28} color={color} />
              {focused && <View style={{ width: 24, height: 8, borderRadius: 4, backgroundColor: '#DCEEFB' }} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', gap: 6 }}>
              <Feather name="message-circle" size={28} color={color} />
              {focused && <View style={{ width: 24, height: 8, borderRadius: 4, backgroundColor: '#DCEEFB' }} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Setting',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', gap: 6 }}>
              <Feather name="settings" size={28} color={color} />
              {focused && <View style={{ width: 24, height: 8, borderRadius: 4, backgroundColor: '#DCEEFB' }} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
