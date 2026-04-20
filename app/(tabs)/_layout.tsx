import CustomHeader from "@/components/CustomHeader";
import { fonts } from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { KeyboardController } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  KeyboardController.preload();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0D3B66",
        tabBarInactiveTintColor: "#7E8B9A",
        tabBarStyle: {
          height: 84 + (Platform.OS === "android" ? insets.bottom : 0),
          paddingTop: 8,
          paddingHorizontal: 8,
          paddingBottom: 15,
          backgroundColor: "#FFFDF8",
          borderTopColor: "#E9E0D2",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          lineHeight: 16,
          fontFamily: fonts.bold,
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
          title: "Temp",
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
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color }) => (
            <Ionicons name="checkmark-done-outline" size={24} color={color} />
          ),
          headerShown: true,
          header: () => <CustomHeader title="Todo-List" />,
        }}
      />
    </Tabs>
  );
}
