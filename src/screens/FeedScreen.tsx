import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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

      <LinearGradient colors={["#ffe2c2", "#ffd5ed", "#d8fff8"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.storyCard}>
        <Text style={styles.storyEyebrow}>Today on logg</Text>
        <Text style={styles.storyTitle}>Your circle is leaning narrative-heavy this week.</Text>
        <Text style={styles.storyCopy}>
          Following {followingCount} players. New posts appear here immediately when you publish a
          log in this browser prototype.
        </Text>
      </LinearGradient>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.momentsRow}>
        {gameSeed.slice(0, 6).map((game) => (
          <View key={game.id} style={styles.momentCard}>
            <View
              style={[
                styles.momentRing,
                index % 3 === 0 && styles.momentRingOrange,
                index % 3 === 1 && styles.momentRingMint,
                index % 3 === 2 && styles.momentRingPurple,
              ]}
            >
              <CoverArt uri={game.coverUri} width={68} height={68} radius={34} />
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
              <CoverArt uri={game.coverUri} width={124} height={164} radius={22} />
              <View style={styles.genreChip}>
                <Text style={styles.genreChipText}>{game.genre}</Text>
              </View>
              <Text style={styles.featuredTitle}>{game.title}</Text>
              <Text style={styles.featuredMeta}>{game.blurb}</Text>
            </View>
          ))}
      </ScrollView>

      <LinearGradient colors={["#8a3ffc", "#ff5d73", "#ff8c42"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.clipsCard}>
        <View style={styles.clipsHeader}>
          <Text style={styles.clipsTitle}>Quick Clips</Text>
          <Text style={styles.clipsMeta}>Motion-inspired previews without autoplay audio</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.clipsRow}>
          {gameSeed.slice(2, 6).map((game) => (
            <View key={game.id} style={styles.clipTile}>
              <CoverArt uri={game.coverUri} width={168} height={112} radius={18} />
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
      </LinearGradient>

      {activity.map((item, index) => (
        <AnimatedEntrance key={item.id} delay={120 + index * 70}>
          <View style={styles.feedCard}>
            <View style={styles.feedStickerRow}>
              <View style={styles.feedSticker}>
                <Text style={styles.feedStickerText}>{item.sticker ?? "Hot take"}</Text>
              </View>
            </View>
            <View style={styles.feedCardTop}>
              <CoverArt
                uri={gameSeed.find((game) => game.title === item.game)?.coverUri ?? gameSeed[0].coverUri}
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
                  <View style={styles.socialBar}>
                    <View style={styles.socialPill}>
                      <Text style={styles.socialIcon}>❤</Text>
                      <Text style={styles.socialText}>{item.reactionCount ?? 0}</Text>
                    </View>
                    <View style={styles.socialPill}>
                      <Text style={styles.socialIcon}>✦</Text>
                      <Text style={styles.socialText}>{item.commentCount ?? 0}</Text>
                    </View>
                    <View style={styles.socialPill}>
                      <Text style={styles.socialIcon}>↗</Text>
                      <Text style={styles.socialText}>Share</Text>
                    </View>
                  </View>
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
    borderRadius: 24,
    padding: 18,
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
    color: "#6b5148",
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
    padding: 3,
    borderRadius: 999,
    backgroundColor: theme.panelAlt,
    borderWidth: 1,
    borderColor: "#b79f80",
  },
  momentRingOrange: {
    backgroundColor: "#ffd6b8",
    borderColor: "#ff8c42",
  },
  momentRingMint: {
    backgroundColor: "#d7fff9",
    borderColor: "#32d3c7",
  },
  momentRingPurple: {
    backgroundColor: "#ead9ff",
    borderColor: "#8a3ffc",
  },
  momentLabel: {
    color: "#fff1dc",
    fontSize: 11,
    maxWidth: 76,
  },
  featuredCard: {
    width: 132,
    gap: 10,
    backgroundColor: "#241f38",
    borderRadius: 22,
    padding: 10,
    borderWidth: 1,
    borderColor: "#53477d",
  },
  genreChip: {
    alignSelf: "flex-start",
    backgroundColor: "#ffe14d",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  genreChipText: {
    color: "#4d3500",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  featuredTitle: {
    color: "#fff6de",
    fontSize: 14,
    fontWeight: "700",
  },
  featuredMeta: {
    color: "#dacaff",
    fontSize: 12,
    lineHeight: 18,
  },
  clipsCard: {
    borderRadius: 24,
    padding: 16,
    gap: 14,
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
    color: "rgba(255,240,230,0.86)",
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
    backgroundColor: "rgba(24,22,16,0.78)",
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
    color: "#fff9ef",
    fontSize: 13,
    fontWeight: "700",
  },
  feedCard: {
    backgroundColor: "#fff7ec",
    borderRadius: 24,
    borderColor: theme.stroke,
    borderWidth: 1,
    padding: 16,
    gap: 14,
    shadowColor: theme.redClay,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  feedStickerRow: {
    flexDirection: "row",
  },
  feedSticker: {
    backgroundColor: "#c9fff8",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  feedStickerText: {
    color: "#046e66",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
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
  socialBar: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 2,
  },
  socialPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#ffe8d0",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  socialIcon: {
    fontSize: 12,
  },
  socialText: {
    color: theme.brandDeep,
    fontSize: 12,
    fontWeight: "700",
  },
});
