import CustomShell from "@/components/CustomShell";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const settings = () => {
  const insets = useSafeAreaInsets();
  return (
    <CustomShell
      style={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 8 }}
      safeArea={true}
    >
      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 40,
            width: 40,
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            justifyContent: "center",
          }}
        >
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.resultCard}></View>

      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            marginTop: 20,
            alignSelf: "center",
          }}
        >
          Version 1.0.0
        </Text>
      </View>
    </CustomShell>
  );
};

export default settings;

const styles = StyleSheet.create({
  resultCard: {
    backgroundColor: "#0D5DB8",
    borderRadius: 28,
    paddingHorizontal: 22,
    paddingVertical: 26,
    minHeight: 172,
    gap: 16,
    justifyContent: "center",
    shadowColor: "#0D5DB8",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 6,
  },
});
