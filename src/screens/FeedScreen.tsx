import { StyleSheet, Text, View } from "react-native";

import { RatingStars } from "../components/RatingStars";
import { SectionTitle } from "../components/SectionTitle";
import { ActivityItem } from "../types";
import { theme } from "../theme";

export function FeedScreen({ activity }: { activity: ActivityItem[] }) {
  return (
    <>
      <SectionTitle title="Friend Activity" subtitle="Recent logs from people you follow" />

      <View style={styles.storyCard}>
        <Text style={styles.storyEyebrow}>Today on logg</Text>
        <Text style={styles.storyTitle}>Your circle is leaning narrative-heavy this week.</Text>
        <Text style={styles.storyCopy}>
          RPGs and stylish action games are driving most of the engagement in this mock feed.
        </Text>
      </View>

      {activity.map((item) => (
        <View key={item.id} style={styles.feedCard}>
          <View style={styles.feedRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.user
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </Text>
            </View>
            <View style={styles.feedHeader}>
              <Text style={styles.feedTitle}>
                {item.user} <Text style={styles.feedMuted}>{item.action}</Text> {item.game}
              </Text>
              <Text style={styles.feedMeta}>
                {item.handle} • {item.time}
              </Text>
            </View>
          </View>
          <View style={styles.feedFooter}>
            <RatingStars rating={item.rating} />
            <Text style={styles.feedNote}>{item.note}</Text>
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  storyCard: {
    backgroundColor: "#e4eee9",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#c7ddd4",
    gap: 8,
  },
  storyEyebrow: {
    color: theme.brand,
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  storyTitle: {
    color: theme.ink,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "800",
  },
  storyCopy: {
    color: theme.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  feedCard: {
    backgroundColor: theme.panel,
    borderRadius: 24,
    borderColor: theme.stroke,
    borderWidth: 1,
    padding: 16,
    gap: 14,
  },
  feedRow: {
    flexDirection: "row",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: theme.brand,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: theme.panel,
    fontWeight: "700",
    fontSize: 13,
  },
  feedHeader: {
    flex: 1,
    gap: 4,
  },
  feedTitle: {
    color: theme.ink,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22,
  },
  feedMuted: {
    color: theme.muted,
    fontWeight: "500",
  },
  feedMeta: {
    color: theme.muted,
    fontSize: 13,
  },
  feedFooter: {
    paddingLeft: 56,
    gap: 8,
  },
  feedNote: {
    color: theme.ink,
    fontSize: 14,
    lineHeight: 21,
  },
});
