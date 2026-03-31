import { Image, StyleSheet, View } from "react-native";

import { theme } from "../theme";

export function CoverArt({
  uri,
  width = 82,
  height = 110,
  radius = 18,
}: {
  uri: string;
  width?: number;
  height?: number;
  radius?: number;
}) {
  return (
    <View style={[styles.frame, { width, height, borderRadius: radius }]}>
      <Image source={{ uri }} style={{ width, height, borderRadius: radius - 2 }} />
      <View style={styles.gloss} />
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
});
