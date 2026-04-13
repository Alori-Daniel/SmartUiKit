import { fonts } from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import CustomShell from "@/components/CustomShell";
import {
  ConverterCategoryId,
  convertValue,
  getCategoryById,
  getUnitById,
} from "@/constants/converters";

type PickerTarget = "from" | "to" | null;

function trimZeros(value: string) {
  return value.replace(/\.?0+$/, "");
}

function sanitizeNumericInput(value: string) {
  let result = "";
  let hasDecimalPoint = false;
  let hasMinus = false;

  for (const char of value.replace(/,/g, "")) {
    if (/\d/.test(char)) {
      result += char;
      continue;
    }

    if (char === "." && !hasDecimalPoint) {
      hasDecimalPoint = true;
      result += char;
      continue;
    }

    if (char === "-" && !hasMinus && result.length === 0) {
      hasMinus = true;
      result += char;
    }
  }

  return result;
}

function parseNumericValue(value: string) {
  if (!value.trim() || value === "." || value === "-" || value === "-.") {
    return null;
  }

  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function formatCompactValue(value: number, categoryId: ConverterCategoryId) {
  if (!Number.isFinite(value)) {
    return "--";
  }

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: categoryId === "currency" ? 2 : 0,
    maximumFractionDigits: categoryId === "currency" ? 2 : 2,
  }).format(value);
}

function formatDetailedValue(value: number, categoryId: ConverterCategoryId) {
  if (!Number.isFinite(value)) {
    return "--";
  }

  const decimals = categoryId === "currency" ? 2 : 5;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: categoryId === "currency" ? 2 : 0,
    maximumFractionDigits: decimals,
  }).format(value);
}

function formatEditableValue(value: number, categoryId: ConverterCategoryId) {
  if (!Number.isFinite(value)) {
    return "0";
  }

  const decimals = categoryId === "currency" ? 2 : 5;
  return trimZeros(value.toFixed(decimals));
}

export default function ConverterScreen({
  categoryId,
}: {
  categoryId: ConverterCategoryId;
}) {
  const category = getCategoryById(categoryId);
  const [fromUnitId, setFromUnitId] = useState(category.defaultFromUnitId);
  const [toUnitId, setToUnitId] = useState(category.defaultToUnitId);
  const [inputValue, setInputValue] = useState("1");
  const [pickerTarget, setPickerTarget] = useState<PickerTarget>(null);

  const fromUnit = getUnitById(category, fromUnitId);
  const toUnit = getUnitById(category, toUnitId);
  const parsedInputValue = parseNumericValue(inputValue);
  const convertedValue =
    parsedInputValue === null
      ? null
      : convertValue(category, fromUnitId, toUnitId, parsedInputValue);

  function handleSwap() {
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
    setInputValue(
      convertedValue === null
        ? inputValue
        : formatEditableValue(convertedValue, category.id),
    );
  }

  function handleUnitSelect(unitId: string) {
    if (pickerTarget === "from") {
      setFromUnitId(unitId);
    }

    if (pickerTarget === "to") {
      setToUnitId(unitId);
    }

    setPickerTarget(null);
  }

  return (
    <CustomShell>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleBlock}>
          <Text style={styles.eyebrow}>{category.sectionLabel}</Text>
          <Text style={styles.title}>
            {fromUnit.displayLabel} to {toUnit.displayLabel}
          </Text>
        </View>

        <View style={styles.resultCard}>
          <View style={styles.resultRow}>
            <View style={styles.resultCopy}>
              <Text style={styles.resultValue}>
                {convertedValue === null
                  ? "--"
                  : formatCompactValue(convertedValue, category.id)}
              </Text>
              <Text style={styles.resultUnit}>{toUnit.shortLabel}</Text>
            </View>

            {/* <View style={styles.heroIconWrap}>
              <Ionicons
                name={heroIcons[category.id]}
                size={44}
                color="rgba(13, 59, 102, 0.13)"
              />
            </View> */}
          </View>

          <Text style={styles.resultCaption}>Precise Calculation Result</Text>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelLabel}>Input Value</Text>
          <View style={styles.panelRow}>
            <TextInput
              value={inputValue}
              onChangeText={(value) =>
                setInputValue(sanitizeNumericInput(value))
              }
              keyboardType={Platform.OS === "ios" ? "numeric" : "numeric"}
              placeholder="0"
              placeholderTextColor="#A0A8B3"
              style={styles.primaryInput}
            />
            <Pressable
              onPress={() => setPickerTarget("from")}
              style={styles.unitSelector}
            >
              <Text style={styles.unitSelectorText}>{fromUnit.shortLabel}</Text>
              <Ionicons name="chevron-down" size={16} color="#1E2C3A" />
            </Pressable>
          </View>
        </View>

        <Pressable onPress={handleSwap} style={styles.swapButton}>
          <Ionicons name="swap-vertical" size={22} color="#FFFFFF" />
        </Pressable>

        <View style={styles.panel}>
          <Text style={styles.panelLabel}>Converted Value</Text>
          <View style={styles.panelRow}>
            <Text style={styles.convertedValue}>
              {convertedValue === null
                ? "--"
                : formatDetailedValue(convertedValue, category.id)}
            </Text>
            <Pressable
              onPress={() => setPickerTarget("to")}
              style={styles.unitSelector}
            >
              <Text style={styles.unitSelectorText}>{toUnit.shortLabel}</Text>
              <Ionicons name="chevron-down" size={16} color="#1E2C3A" />
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Modal
        transparent
        animationType="fade"
        visible={pickerTarget !== null}
        onRequestClose={() => setPickerTarget(null)}
      >
        <View style={styles.modalRoot}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setPickerTarget(null)}
          />

          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              Select {pickerTarget === "from" ? "input" : "output"} unit
            </Text>

            <View style={styles.modalList}>
              {category.units.map((unit) => {
                const isSelected =
                  (pickerTarget === "from" && unit.id === fromUnitId) ||
                  (pickerTarget === "to" && unit.id === toUnitId);

                return (
                  <Pressable
                    key={unit.id}
                    onPress={() => handleUnitSelect(unit.id)}
                    style={[
                      styles.modalOption,
                      isSelected && styles.modalOptionSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.modalOptionText,
                        isSelected && styles.modalOptionTextSelected,
                      ]}
                    >
                      {unit.label}
                    </Text>
                    <Text
                      style={[
                        styles.modalOptionMeta,
                        isSelected && styles.modalOptionTextSelected,
                      ]}
                    >
                      {unit.shortLabel}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </CustomShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 14,
  },
  titleBlock: {
    gap: 4,
  },
  eyebrow: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: fonts.bold,
    letterSpacing: 1.2,
    color: "#7D8793",
  },
  title: {
    fontSize: 21,
    lineHeight: 32,
    fontFamily: fonts.extraBold,
    color: "#252B33",
  },
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
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  resultCopy: {
    flexDirection: "row",
    alignItems: "flex-end",
    // borderWidth: 1,
    gap: 3,
    flex: 1,
  },
  resultValue: {
    color: "#FFFFFF",
    fontSize: 33,
    lineHeight: 46,
    fontFamily: fonts.extraBold,
  },
  resultUnit: {
    color: "#C6DCFA",
    fontSize: 16,
    lineHeight: 22,
    fontFamily: fonts.semiBold,
    paddingBottom: 3,
  },
  heroIconWrap: {
    width: 76,
    height: 76,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  resultCaption: {
    color: "#D9E9FF",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fonts.medium,
  },
  panel: {
    backgroundColor: "#F3F5FA",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 12,
  },
  panelLabel: {
    color: "#9198A1",
    fontSize: 11,
    lineHeight: 16,
    fontFamily: fonts.bold,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  panelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  primaryInput: {
    flex: 1,
    color: "#252B33",
    fontSize: 24,
    lineHeight: 32,
    fontFamily: fonts.extraBold,
    minHeight: 40,
    paddingVertical: 4,
    textAlignVertical: "center",
  },
  convertedValue: {
    flex: 1,
    color: "#0D3B66",
    fontSize: 24,
    lineHeight: 32,
    fontFamily: fonts.extraBold,
  },
  unitSelector: {
    minWidth: 104,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  unitSelectorText: {
    color: "#1E2C3A",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fonts.bold,
  },
  swapButton: {
    alignSelf: "center",
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#0D5DB8",
    alignItems: "center",
    justifyContent: "center",
  },
  modalRoot: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.35)",
  },
  modalCard: {
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    padding: 20,
    gap: 16,
  },
  modalTitle: {
    color: "#252B33",
    fontSize: 18,
    lineHeight: 24,
    fontFamily: fonts.extraBold,
  },
  modalList: {
    gap: 10,
  },
  modalOption: {
    borderRadius: 16,
    backgroundColor: "#F5F7FB",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalOptionSelected: {
    backgroundColor: "#0D5DB8",
  },
  modalOptionText: {
    color: "#25313D",
    fontSize: 15,
    lineHeight: 22,
    fontFamily: fonts.bold,
  },
  modalOptionMeta: {
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fonts.semiBold,
  },
  modalOptionTextSelected: {
    color: "#FFFFFF",
  },
});
