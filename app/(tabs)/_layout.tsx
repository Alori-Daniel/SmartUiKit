import CustomHeader from "@/components/CustomHeader";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0D3B66",
        tabBarInactiveTintColor: "#7E8B9A",
        tabBarStyle: {
          height: 84,
          paddingTop: 8,
          paddingBottom: insets.bottom + 15,
          backgroundColor: "#FFFDF8",
          borderTopColor: "#E9E0D2",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Length",
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart-outline" size={24} color={color} />
          ),
          headerShown: true,
          header: () => <CustomHeader />,
        }}
      />
      <Tabs.Screen
        name="temp"
        options={{
          title: "Temperature",
          tabBarIcon: ({ color }) => (
            <Ionicons name="thermometer" size={24} color={color} />
          ),
          headerShown: true,
          header: () => <CustomHeader />,
        }}
      />
      <Tabs.Screen
        name="weight"
        options={{
          title: "Weight",
          tabBarIcon: ({ color }) => (
            <Ionicons name="scale" size={24} color={color} />
          ),
          headerShown: true,
          header: () => <CustomHeader />,
        }}
      />
      <Tabs.Screen
        name="currency"
        options={{
          title: "Currency",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cash" size={24} color={color} />
          ),
          headerShown: true,
          header: () => <CustomHeader />,
        }}
      />
    </Tabs>
  );
}
