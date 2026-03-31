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
});
