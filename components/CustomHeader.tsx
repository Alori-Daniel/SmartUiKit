import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: insets.top,
        backgroundColor: "#FFFDF8",
        paddingHorizontal: 20,
      }}
    >
      <Text style={styles.sectionTitle}>Smart ToolKit</Text>
      <Ionicons name="settings-outline" size={24} color="#0D3B66" />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  sectionTitle: {
    color: "#102542",
    fontSize: 18,
    fontWeight: "700",
  },
});
