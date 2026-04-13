import { fonts } from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 8,
        },
      ]}
    >
      <View style={styles.brand}>
        {/* <Ionicons name="grid-outline" size={20} color="#0D5DB8" /> */}
        <Text style={styles.sectionTitle}>Smart Kit</Text>
      </View>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => router.push("/settings")}
      >
        <Ionicons name="settings-outline" size={22} color="#0D3B66" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFDF8",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sectionTitle: {
    color: "#0D3B66",
    fontSize: 18,
    lineHeight: 24,
    fontFamily: fonts.extraBold,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
