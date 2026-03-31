import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AnimatedEntrance } from "../components/AnimatedEntrance";
import { CoverArt } from "../components/CoverArt";
import { RatingStars } from "../components/RatingStars";
import { SectionTitle } from "../components/SectionTitle";
import { featuredGameIds, gameSeed } from "../data/mockData";
import { ActivityItem } from "../types";
import { theme } from "../theme";

export function FeedScreen({
  activity,
  followingCount,
}: {
  activity: ActivityItem[];
  followingCount: number;
}) {
  return (
    <>
      <SectionTitle title="Friend Activity" subtitle="Recent logs from people you follow" />

      <View style={styles.storyCard}>
        <Text style={styles.storyEyebrow}>Today on logg</Text>
        <Text style={styles.storyTitle}>Your circle is leaning narrative-heavy this week.</Text>
        <Text style={styles.storyCopy}>
          Following {followingCount} players. New posts appear here immediately when you publish a
          log in this browser prototype.
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.momentsRow}>
        {gameSeed.slice(0, 6).map((game) => (
            <View key={game.id} style={styles.momentCard}>
            <View style={[styles.momentRing, { borderColor: game.accent[1] }]}>
              <CoverArt
                uri={game.coverUri}
                title={game.title}
                colors={game.accent}
                symbolText={game.symbolText}
                width={68}
                height={68}
                radius={34}
              />
            </View>
            <Text numberOfLines={1} style={styles.momentLabel}>
              {game.title.split(":")[0]}
            </Text>
          </View>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredRow}>
        {gameSeed
          .filter((game) => featuredGameIds.includes(game.id))
          .map((game) => (
            <View key={game.id} style={styles.featuredCard}>
              <CoverArt
                uri={game.coverUri}
                title={game.title}
                colors={game.accent}
                symbolText={game.symbolText}
                width={124}
                height={164}
                radius={22}
              />
              <Text style={styles.featuredTitle}>{game.title}</Text>
              <Text style={styles.featuredMeta}>{game.genre}</Text>
            </View>
          ))}
      </ScrollView>

      <View style={styles.clipsCard}>
        <View style={styles.clipsHeader}>
          <Text style={styles.clipsTitle}>Quick Clips</Text>
          <Text style={styles.clipsMeta}>Motion-inspired previews without autoplay audio</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.clipsRow}>
          {gameSeed.slice(2, 6).map((game) => (
            <View key={game.id} style={styles.clipTile}>
              <CoverArt
                uri={game.coverUri}
                title={game.title}
                colors={game.accent}
                symbolText={game.symbolText}
                width={168}
                height={112}
                radius={18}
              />
              <View style={styles.playBadge}>
                <Ionicons name="play" size={14} color={theme.panel} />
                <Text style={styles.playBadgeText}>0:18</Text>
              </View>
              <Text numberOfLines={1} style={styles.clipTitle}>
                {game.title}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {activity.map((item, index) => (
        <AnimatedEntrance key={item.id} delay={120 + index * 70}>
          <View style={styles.feedCard}>
            <View style={styles.feedCardTop}>
              <CoverArt
                uri={gameSeed.find((game) => game.title === item.game)?.coverUri ?? gameSeed[0].coverUri}
                title={item.game}
                colors={gameSeed.find((game) => game.title === item.game)?.accent ?? gameSeed[0].accent}
                symbolText={gameSeed.find((game) => game.title === item.game)?.symbolText ?? gameSeed[0].symbolText}
                width={78}
                height={104}
                radius={18}
              />
              <View style={styles.feedMain}>
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
                      {item.handle} • {item.status ?? "logged"} • {item.time}
                    </Text>
                  </View>
                </View>
                <View style={styles.feedFooter}>
                  <RatingStars rating={item.rating} />
                  <Text style={styles.feedNote}>{item.note}</Text>
                </View>
              </View>
            </View>
          </View>
        </AnimatedEntrance>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  storyCard: {
    backgroundColor: "#efe0c9",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#f3b37d",
    gap: 8,
  },
  storyEyebrow: {
    color: theme.brandDeep,
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
  featuredRow: {
    gap: 12,
    paddingRight: 10,
  },
  momentsRow: {
    gap: 12,
    paddingRight: 10,
  },
  momentCard: {
    width: 78,
    alignItems: "center",
    gap: 8,
  },
  momentRing: {
    padding: 4,
    borderRadius: 999,
    backgroundColor: "#241f39",
    borderWidth: 2,
  },
  momentLabel: {
    color: "#fff4df",
    fontSize: 11,
    maxWidth: 76,
  },
  featuredCard: {
    width: 132,
    gap: 10,
    backgroundColor: "rgba(255, 245, 231, 0.08)",
    borderRadius: 24,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 199, 143, 0.28)",
  },
  featuredTitle: {
    color: theme.panel,
    fontSize: 14,
    fontWeight: "700",
  },
  featuredMeta: {
    color: "#c7b8a2",
    fontSize: 12,
  },
  clipsCard: {
    backgroundColor: "#384c78",
    borderRadius: 24,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: "#72b7ff",
  },
  clipsHeader: {
    gap: 4,
  },
  clipsTitle: {
    color: theme.panel,
    fontSize: 20,
    fontWeight: "800",
  },
  clipsMeta: {
    color: "#dce8ff",
    fontSize: 13,
  },
  clipsRow: {
    gap: 12,
    paddingRight: 10,
  },
  clipTile: {
    width: 168,
    gap: 8,
  },
  playBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(34, 41, 77, 0.78)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  playBadgeText: {
    color: theme.panel,
    fontSize: 11,
    fontWeight: "700",
  },
  clipTitle: {
    color: theme.panel,
    fontSize: 13,
    fontWeight: "700",
  },
  feedCard: {
    backgroundColor: theme.panel,
    borderRadius: 24,
    borderColor: theme.stroke,
    borderWidth: 1,
    padding: 16,
    gap: 14,
  },
  feedCardTop: {
    flexDirection: "row",
    gap: 14,
  },
  feedMain: {
    flex: 1,
    gap: 10,
  },
  feedRow: {
    flexDirection: "row",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: theme.brandDeep,
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
    gap: 8,
  },
  feedNote: {
    color: theme.ink,
    fontSize: 14,
    lineHeight: 21,
  },
});
