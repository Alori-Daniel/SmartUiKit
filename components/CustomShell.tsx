import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomShell = ({
  children,
  safeArea = false,
  style,
}: {
  children: React.ReactNode;
  safeArea?: boolean;
  style?: any;
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        safeArea && { paddingTop: insets.top + 8 },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default CustomShell;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF8",
  },
});
