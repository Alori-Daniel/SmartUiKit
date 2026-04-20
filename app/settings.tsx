import CustomShell from "@/components/CustomShell";
import { fonts } from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const toolkitHighlights = [
  {
    icon: "flash-outline" as const,
    title: "Quick",
    copy: "Built for fast one-hand conversions without clutter.",
  },
  {
    icon: "sparkles-outline" as const,
    title: "Focused",
    copy: "Converters and a simple checklist stay in one clean space.",
  },
  {
    icon: "cloud-offline-outline" as const,
    title: "Lightweight",
    copy: "Currency uses bundled reference rates for now.",
  },
];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const version = Constants.expoConfig?.version ?? "1.0.0";

  return (
    <CustomShell safeArea style={{ paddingBottom: insets.bottom + 12 }}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={22} color="#102542" />
          </Pressable>

          <Text style={styles.pageTitle}>Settings</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.heroBadge}>
              <Ionicons name="settings-outline" size={18} color="#FFFFFF" />
              <Text style={styles.heroBadgeText}>Smart Kit</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Simple tools, sharp results.</Text>
          <Text style={styles.heroCopy}>
            This toolkit keeps your everyday conversions and quick tasks clean,
            fast, and easy to trust.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Toolkit Notes</Text>

          {toolkitHighlights.map((item) => (
            <View key={item.title} style={styles.noteCard}>
              <View style={styles.noteIcon}>
                <Ionicons name={item.icon} size={18} color="#0D5DB8" />
              </View>

              <View style={styles.noteCopy}>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <Text style={styles.noteBody}>{item.copy}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}></View>

        <View style={styles.footerCard}>
          <Text style={styles.footerLabel}>Current Build</Text>
          <Text style={styles.footerValue}>Version {version}</Text>
        </View>
      </ScrollView>
    </CustomShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  pageTitle: {
    color: "#102542",
    fontSize: 20,
    lineHeight: 26,
    fontFamily: fonts.extraBold,
  },
  headerSpacer: {
    width: 40,
  },
  heroCard: {
    backgroundColor: "#0D5DB8",
    borderRadius: 28,
    paddingHorizontal: 22,
    paddingVertical: 24,
    gap: 12,
    shadowColor: "#0D5DB8",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 6,
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.14)",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  heroBadgeText: {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fonts.bold,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    lineHeight: 34,
    fontFamily: fonts.extraBold,
  },
  heroCopy: {
    color: "#DCEBFF",
    fontSize: 15,
    lineHeight: 22,
    fontFamily: fonts.medium,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: "#102542",
    fontSize: 18,
    lineHeight: 24,
    fontFamily: fonts.extraBold,
  },
  noteCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "#F3F5FA",
    borderRadius: 20,
    padding: 16,
  },
  noteIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  noteCopy: {
    flex: 1,
    gap: 4,
  },
  noteTitle: {
    color: "#102542",
    fontSize: 16,
    lineHeight: 22,
    fontFamily: fonts.bold,
  },
  noteBody: {
    color: "#627181",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fonts.medium,
  },
  tipCard: {
    borderRadius: 22,
    backgroundColor: "#FFF4D8",
    padding: 18,
  },
  tipText: {
    color: "#5A4A12",
    fontSize: 14,
    lineHeight: 22,
    fontFamily: fonts.semiBold,
  },
  footerCard: {
    alignItems: "center",
    gap: 4,
    paddingTop: 8,
    paddingBottom: 4,
  },
  footerLabel: {
    color: "#7D8793",
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.bold,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  footerValue: {
    color: "#102542",
    fontSize: 14,
    lineHeight: 22,
    fontFamily: fonts.extraBold,
  },
  footerSubtext: {
    color: "#7D8793",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fonts.medium,
  },
});
