import { StyleSheet, Text, View } from "react-native";

import { theme } from "../theme";

export function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 8,
    gap: 4,
  },
  title: {
    color: theme.ink,
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    color: theme.muted,
    fontSize: 14,
    lineHeight: 20,
  },
});
