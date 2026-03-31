import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { onboardingPoints } from "../data/mockData";
import { layout, theme } from "../theme";

export function AuthScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <LinearGradient colors={["#f7f1e8", "#e2ece5"]} style={styles.shell}>
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

        <View style={styles.previewPanel}>
          <Text style={styles.previewTitle}>MVP Demo Includes</Text>
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

        <Pressable style={styles.primaryButton} onPress={onEnter}>
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
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: "rgba(31, 92, 75, 0.10)",
    top: -20,
    right: -20,
  },
  orbTwo: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: "rgba(199, 146, 47, 0.10)",
    bottom: 40,
    left: -40,
  },
  card: {
    width: "100%",
    maxWidth: layout.maxContentWidth,
    backgroundColor: "rgba(251, 247, 241, 0.96)",
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: theme.stroke,
    gap: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
  },
  brandBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.brand,
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: theme.brand,
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
  previewPanel: {
    backgroundColor: theme.panel,
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
    backgroundColor: theme.brand,
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
    backgroundColor: theme.panelAlt,
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
    backgroundColor: theme.ink,
    minHeight: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  primaryButtonText: {
    color: theme.panel,
    fontSize: 15,
    fontWeight: "700",
  },
});
