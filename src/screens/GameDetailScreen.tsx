import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { CoverArt } from "../components/CoverArt";
import { RatingStars } from "../components/RatingStars";
import { SectionTitle } from "../components/SectionTitle";
import { ActivityItem, GameItem } from "../types";
import { theme } from "../theme";

export function GameDetailScreen({
  game,
  activity,
  onBack,
  onLogGame,
}: {
  game: GameItem;
  activity: ActivityItem[];
  onBack: () => void;
  onLogGame: () => void;
}) {
  const matchingActivity = activity.filter((entry) => entry.game === game.title);

  return (
    <>
      <View style={styles.topBar}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
        <Pressable style={styles.logButton} onPress={onLogGame}>
          <Text style={styles.logButtonText}>Log This</Text>
        </Pressable>
      </View>

      <SectionTitle
        title={game.title}
        subtitle="A prototype detail page for richer discovery and social proof"
      />

      <View style={styles.heroCard}>
        <CoverArt
          uri={game.coverUri}
          title={game.title}
          colors={game.accent}
          symbolText={game.symbolText}
          width={148}
          height={202}
          radius={24}
        />
        <View style={styles.heroText}>
          <View style={styles.genreChip}>
            <Text style={styles.genreChipText}>{game.genre}</Text>
          </View>
          <Text style={styles.heroMeta}>
            {game.year} • {game.platform}
          </Text>
          <Text style={styles.heroBlurb}>{game.blurb}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBadge}>
              <Text style={styles.statValue}>{game.friendsLogged}</Text>
              <Text style={styles.statLabel}>Friends logged</Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statValue}>{matchingActivity.length || 1}</Text>
              <Text style={styles.statLabel}>Recent notes</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.highlightRow}>
        <View style={[styles.highlightChip, styles.highlightOrange]}>
          <Text style={styles.highlightText}>Screenshot worthy</Text>
        </View>
        <View style={[styles.highlightChip, styles.highlightMint]}>
          <Text style={styles.highlightText}>Strong social chatter</Text>
        </View>
        <View style={[styles.highlightChip, styles.highlightPurple]}>
          <Text style={styles.highlightText}>Replay bait</Text>
        </View>
      </View>

      <Text style={styles.blockLabel}>Friend Reviews</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.reviewRow}>
        {matchingActivity.length ? (
          matchingActivity.map((entry) => (
            <View key={entry.id} style={styles.reviewCard}>
              <Text style={styles.reviewName}>{entry.user}</Text>
              <Text style={styles.reviewMeta}>
                {entry.handle} • {entry.time}
              </Text>
              <RatingStars rating={entry.rating} />
              <Text style={styles.reviewNote}>{entry.note}</Text>
            </View>
          ))
        ) : (
          <View style={styles.reviewCard}>
            <Text style={styles.reviewName}>No friend logs yet</Text>
            <Text style={styles.reviewMeta}>Be the first to start the conversation</Text>
            <Text style={styles.reviewNote}>
              This prototype detail page is ready to evolve into a real social game hub.
            </Text>
          </View>
        )}
      </ScrollView>

      <Text style={styles.blockLabel}>Why It Pops On logg</Text>
      <View style={styles.reasonCard}>
        <Text style={styles.reasonCopy}>
          {game.title} works well here because it has a strong visual identity, clear emotional tone,
          and enough replay or conversation value to make logs, reactions, and friend discovery feel alive.
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  backButton: {
    backgroundColor: "#ead9ff",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backButtonText: {
    color: "#5d34b9",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  logButton: {
    backgroundColor: theme.redClay,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  logButtonText: {
    color: theme.panel,
    fontWeight: "800",
    fontSize: 12,
  },
  heroCard: {
    flexDirection: "row",
    gap: 16,
    backgroundColor: "#fff7ec",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: theme.stroke,
    padding: 16,
  },
  heroText: {
    flex: 1,
    gap: 10,
  },
  genreChip: {
    alignSelf: "flex-start",
    backgroundColor: "#ffe14d",
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  genreChipText: {
    color: "#4d3500",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  heroMeta: {
    color: theme.muted,
    fontSize: 13,
  },
  heroBlurb: {
    color: theme.ink,
    fontSize: 15,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statBadge: {
    flex: 1,
    backgroundColor: "#fff0de",
    borderRadius: 18,
    padding: 12,
    gap: 4,
  },
  statValue: {
    color: theme.brandDeep,
    fontSize: 20,
    fontWeight: "800",
  },
  statLabel: {
    color: theme.muted,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  highlightRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 2,
  },
  highlightChip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  highlightOrange: {
    backgroundColor: "#ffe1cd",
  },
  highlightMint: {
    backgroundColor: "#d6fff8",
  },
  highlightPurple: {
    backgroundColor: "#ead9ff",
  },
  highlightText: {
    color: theme.ink,
    fontSize: 12,
    fontWeight: "700",
  },
  blockLabel: {
    marginTop: 6,
    marginBottom: 10,
    color: theme.muted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  reviewRow: {
    gap: 12,
    paddingRight: 10,
  },
  reviewCard: {
    width: 250,
    backgroundColor: "#241f38",
    borderRadius: 22,
    padding: 16,
    gap: 8,
  },
  reviewName: {
    color: "#fff5e7",
    fontSize: 16,
    fontWeight: "800",
  },
  reviewMeta: {
    color: "#d7c8ff",
    fontSize: 12,
  },
  reviewNote: {
    color: "#fff0de",
    fontSize: 14,
    lineHeight: 20,
  },
  reasonCard: {
    backgroundColor: "#fff0de",
    borderRadius: 22,
    padding: 16,
    marginBottom: 8,
  },
  reasonCopy: {
    color: theme.ink,
    fontSize: 15,
    lineHeight: 22,
  },
});
