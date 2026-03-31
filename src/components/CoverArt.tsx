import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";

import { theme } from "../theme";

export function CoverArt({
  uri,
  title,
  colors = [theme.brandDeep, theme.redClay] as [string, string],
  symbolText,
  width = 82,
  height = 110,
  radius = 18,
}: {
  uri: string;
  title?: string;
  colors?: [string, string];
  symbolText?: string;
  width?: number;
  height?: number;
  radius?: number;
}) {
  const canRenderDirectImage = !uri.startsWith("data:image/svg+xml");

  return (
    <View style={[styles.frame, { width, height, borderRadius: radius }]}>
      {canRenderDirectImage ? (
        <Image source={{ uri }} style={{ width, height, borderRadius: radius - 2 }} />
      ) : (
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.generatedCard, { width, height, borderRadius: radius - 2 }]}
        >
          <View style={styles.generatedOrb} />
          {symbolText ? <Text style={styles.symbolText}>{symbolText}</Text> : null}
          <View style={styles.generatedFooter}>
            <Text numberOfLines={2} style={styles.generatedTitle}>
              {title}
            </Text>
          </View>
        </LinearGradient>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderWidth: 1,
    borderColor: theme.stroke,
    backgroundColor: theme.panelMuted,
    overflow: "hidden",
  },
  generatedCard: {
    overflow: "hidden",
    justifyContent: "space-between",
    padding: 10,
  },
  generatedOrb: {
    position: "absolute",
    width: 72,
    height: 72,
    borderRadius: 999,
    top: -8,
    right: -8,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  symbolText: {
    alignSelf: "center",
    marginTop: 6,
    fontSize: 40,
    fontWeight: "800",
    color: "#fff8f0",
  },
  generatedFooter: {
    backgroundColor: "rgba(17,19,31,0.26)",
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 12,
  },
  generatedTitle: {
    color: "#fff8f0",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "800",
  },
});
