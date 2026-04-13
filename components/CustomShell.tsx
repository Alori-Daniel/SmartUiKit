import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomShell = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();
  return <View style={[styles.container]}>{children}</View>;
};

export default CustomShell;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF8",
  },
});
