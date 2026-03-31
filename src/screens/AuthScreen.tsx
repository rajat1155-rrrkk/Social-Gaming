import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { onboardingPoints } from "../data/mockData";
import { layout, theme } from "../theme";

export function AuthScreen({
  name,
  handle,
  onNameChange,
  onHandleChange,
  onEnter,
}: {
  name: string;
  handle: string;
  onNameChange: (value: string) => void;
  onHandleChange: (value: string) => void;
  onEnter: () => void;
}) {
  const canEnter = name.trim().length > 1 && handle.trim().length > 1;

  return (
    <View style={styles.shell}>
      <View style={styles.topRow}>
        <View style={styles.brandRow}>
          <LinearGradient colors={["#5f49ff", "#2d74ff"]} style={styles.brandBadge}>
            <MaterialCommunityIcons name="controller-classic" size={24} color={theme.panel} />
          </LinearGradient>
          <View style={styles.titleWrap}>
            <Text style={styles.eyebrow}>logg</Text>
            <Text style={styles.title}>Start your log</Text>
          </View>
        </View>
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>Browser-ready</Text>
        </View>
      </View>

      <Text style={styles.copy}>
        Set a playful profile and drop straight into the same bright product experience.
      </Text>

      <View style={styles.formWrap}>
        <View style={styles.inputWrap}>
          <Text style={styles.inputLabel}>Display name</Text>
          <TextInput
            value={name}
            onChangeText={onNameChange}
            placeholder="Cosmic Otter"
            placeholderTextColor={theme.muted}
            style={styles.input}
          />
        </View>
        <View style={styles.inputWrap}>
          <Text style={styles.inputLabel}>Handle</Text>
          <TextInput
            value={handle}
            onChangeText={(value) => onHandleChange(value.startsWith("@") ? value : `@${value}`)}
            placeholder="@cosmicotter"
            placeholderTextColor={theme.muted}
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.previewPanel}>
        <Text style={styles.previewTitle}>Inside the app</Text>
        {onboardingPoints.map((item) => (
          <View key={item} style={styles.previewRow}>
            <View style={styles.previewDot} />
            <Text style={styles.previewItem}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>4</Text>
          <Text style={styles.metricLabel}>Core flows</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>Live</Text>
          <Text style={styles.metricLabel}>Local state</Text>
        </View>
      </View>

      <Pressable
        style={[styles.primaryButton, !canEnter && styles.primaryButtonDisabled]}
        onPress={onEnter}
        disabled={!canEnter}
      >
        <Text style={styles.primaryButtonText}>Enter logg</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    width: "100%",
    maxWidth: layout.maxContentWidth,
    backgroundColor: theme.panel,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.stroke,
    gap: 16,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  brandBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrap: {
    gap: 2,
    flex: 1,
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    color: theme.brandDeep,
    fontWeight: "800",
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
    color: theme.ink,
    fontWeight: "800",
  },
  statusPill: {
    backgroundColor: theme.accentSoft,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  statusText: {
    color: "#0f6e68",
    fontSize: 12,
    fontWeight: "800",
  },
  copy: {
    fontSize: 15,
    lineHeight: 22,
    color: theme.muted,
  },
  formWrap: {
    gap: 12,
  },
  inputWrap: {
    gap: 6,
  },
  inputLabel: {
    color: theme.brandDeep,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  input: {
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.stroke,
    backgroundColor: "#fffaf3",
    paddingHorizontal: 14,
    color: theme.ink,
    fontSize: 15,
  },
  previewPanel: {
    backgroundColor: "#fff4e6",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: theme.stroke,
    padding: 16,
    gap: 10,
  },
  previewTitle: {
    color: theme.ink,
    fontWeight: "800",
    fontSize: 15,
  },
  previewRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  previewDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: theme.redClay,
    marginTop: 6,
  },
  previewItem: {
    flex: 1,
    color: theme.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  metricsRow: {
    flexDirection: "row",
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#fffbf5",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.stroke,
    gap: 6,
  },
  metricValue: {
    color: theme.ink,
    fontSize: 22,
    fontWeight: "800",
  },
  metricLabel: {
    color: theme.muted,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  primaryButton: {
    backgroundColor: theme.brandDeep,
    minHeight: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  primaryButtonText: {
    color: "#fff8f0",
    fontSize: 15,
    fontWeight: "700",
  },
  primaryButtonDisabled: {
    opacity: 0.55,
  },
});
