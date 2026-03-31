import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
        <>
          <Image source={{ uri }} style={{ width, height, borderRadius: radius - 2 }} />
          <View style={styles.gloss} />
        </>
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
    shadowColor: theme.brandDeep,
    shadowOpacity: 0.14,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  gloss: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "40%",
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  generatedCard: {
    overflow: "hidden",
    justifyContent: "space-between",
    padding: 10,
  },
  generatedOrb: {
    position: "absolute",
    width: 74,
    height: 74,
    borderRadius: 999,
    top: -8,
    right: -8,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  symbolText: {
    alignSelf: "center",
    marginTop: 8,
    fontSize: 42,
    color: "#fffaf2",
    fontWeight: "800",
  },
  generatedFooter: {
    backgroundColor: "rgba(17,19,31,0.34)",
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 12,
  },
  generatedTitle: {
    color: "#fffaf2",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "800",
  },
});
