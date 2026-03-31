import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

import { theme } from "../theme";
import { Rating } from "../types";

export function RatingStars({
  rating,
  onChange,
  size = 16,
}: {
  rating: number;
  onChange?: (value: Rating) => void;
  size?: number;
}) {
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable key={star} onPress={() => onChange?.(star as Rating)} style={styles.button}>
          <Ionicons
            name={star <= rating ? "star" : "star-outline"}
            size={size}
            color={theme.gold}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  button: {
    paddingRight: 2,
  },
});
