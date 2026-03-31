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
    <LinearGradient colors={["#20163a", "#0f223f", "#11131f"]} style={styles.shell}>
      <View style={styles.orbOne} />
      <View style={styles.orbTwo} />
      <View style={styles.card}>
        <View style={styles.brandBadge}>
          <MaterialCommunityIcons name="controller-classic" size={26} color={theme.panel} />
        </View>
        <Text style={styles.eyebrow}>logg</Text>
        <Text style={styles.title}>Track the games worth remembering.</Text>
        <Text style={styles.copy}>
          A social game journal for ratings, discovery, and the people whose taste you trust.
        </Text>

        <View style={styles.formWrap}>
          <View style={styles.inputWrap}>
            <Text style={styles.inputLabel}>Display name</Text>
            <TextInput
              value={name}
              onChangeText={onNameChange}
              placeholder="Rajat Mehra"
              placeholderTextColor={theme.muted}
              style={styles.input}
            />
          </View>
          <View style={styles.inputWrap}>
            <Text style={styles.inputLabel}>Handle</Text>
            <TextInput
              value={handle}
              onChangeText={(value) => onHandleChange(value.startsWith("@") ? value : `@${value}`)}
              placeholder="@rajat"
              placeholderTextColor={theme.muted}
              autoCapitalize="none"
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.previewPanel}>
          <Text style={styles.previewTitle}>Working Prototype Includes</Text>
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
            <Text style={styles.metricValue}>100%</Text>
            <Text style={styles.metricLabel}>Browser friendly</Text>
          </View>
        </View>

        <Pressable
          style={[styles.primaryButton, !canEnter && styles.primaryButtonDisabled]}
          onPress={onEnter}
          disabled={!canEnter}
        >
          <Text style={styles.primaryButtonText}>Enter Demo</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    overflow: "hidden",
  },
  orbOne: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 999,
    backgroundColor: "rgba(255, 191, 47, 0.28)",
    top: -40,
    right: -60,
  },
  orbTwo: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: "rgba(50, 211, 199, 0.24)",
    bottom: 20,
    left: -50,
  },
  card: {
    width: "100%",
    maxWidth: layout.maxContentWidth,
    backgroundColor: "rgba(255, 245, 231, 0.98)",
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: theme.stroke,
    gap: 16,
    shadowColor: theme.brandDeep,
    shadowOpacity: 0.18,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
  },
  brandBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.brandDeep,
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: theme.redClay,
    fontWeight: "700",
  },
  title: {
    fontSize: 34,
    lineHeight: 38,
    color: theme.ink,
    fontWeight: "800",
  },
  copy: {
    fontSize: 15,
    lineHeight: 24,
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
    backgroundColor: "#fff0de",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: theme.stroke,
    padding: 18,
    gap: 10,
  },
  previewTitle: {
    color: theme.ink,
    fontWeight: "700",
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
    backgroundColor: "#fff7ed",
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
