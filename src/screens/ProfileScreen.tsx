import { Pressable, StyleSheet, Text, View } from "react-native";

import { CoverArt } from "../components/CoverArt";
import { RatingStars } from "../components/RatingStars";
import { SectionTitle } from "../components/SectionTitle";
import { ActivityItem, GameItem, Profile } from "../types";
import { theme } from "../theme";

export function ProfileScreen({
  profile,
  favorites,
  recentLogs,
  followingCount,
  onSignOut,
}: {
  profile: Profile;
  favorites: GameItem[];
  recentLogs: ActivityItem[];
  followingCount: number;
  onSignOut: () => void;
}) {
  const statCards = [
    { label: "Logged", value: `${recentLogs.length + 125}` },
    { label: "Following", value: `${followingCount}` },
    { label: "Avg rating", value: recentLogs.length ? "4.6" : "4.2" },
  ];

  return (
    <>
      <SectionTitle
        title="Your Profile"
        subtitle="A profile view shaped for social credibility and personal taste"
      />
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.profileAvatar}>
            <Text style={styles.avatarText}>
              {profile.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileMeta}>
              {profile.handle} • {profile.vibe}
            </Text>
          </View>
        </View>

        <View style={styles.vibeRow}>
          <View style={[styles.vibeChip, styles.vibeChipOrange]}>
            <Text style={styles.vibeChipText}>Boss fight energy</Text>
          </View>
          <View style={[styles.vibeChip, styles.vibeChipMint]}>
            <Text style={styles.vibeChipText}>Comfort grind</Text>
          </View>
          <View style={[styles.vibeChip, styles.vibeChipPurple]}>
            <Text style={styles.vibeChipText}>Story mood</Text>
          </View>
        </View>

        <View style={styles.profileHighlight}>
          <Text style={styles.highlightEyebrow}>Taste signal</Text>
          <Text style={styles.highlightText}>{profile.bio}</Text>
        </View>

        <View style={styles.statsRow}>
          {statCards.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.blockLabel}>Recent favorites</Text>
        {favorites.map((game) => (
          <View key={game.id} style={styles.favoriteRow}>
            <CoverArt
              uri={game.coverUri}
              title={game.title}
              colors={game.accent}
              symbolText={game.symbolText}
              width={62}
              height={84}
              radius={16}
            />
            <View style={styles.favoriteTextWrap}>
              <Text style={styles.favoriteTitle}>{game.title}</Text>
              <Text style={styles.logMeta}>{game.genre}</Text>
              <RatingStars rating={5} />
            </View>
          </View>
        ))}

        <Text style={styles.blockLabel}>Your latest logs</Text>
        {recentLogs.slice(0, 3).map((entry) => (
          <View key={entry.id} style={styles.favoriteRow}>
            <CoverArt
              uri={favorites.find((game) => game.title === entry.game)?.coverUri ?? favorites[0].coverUri}
              title={entry.game}
              colors={favorites.find((game) => game.title === entry.game)?.accent ?? favorites[0].accent}
              symbolText={
                favorites.find((game) => game.title === entry.game)?.symbolText ?? favorites[0].symbolText
              }
              width={62}
              height={84}
              radius={16}
            />
            <View style={styles.favoriteTextWrap}>
              <Text style={styles.favoriteTitle}>{entry.game}</Text>
              <Text style={styles.logMeta}>
                {entry.status ?? "logged"} • {entry.time}
              </Text>
            </View>
          </View>
        ))}

        <Pressable style={styles.signOutButton} onPress={onSignOut}>
          <Text style={styles.signOutText}>Reset prototype session</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: "#fff5e7",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: theme.stroke,
    padding: 18,
    gap: 18,
  },
  profileHeader: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: theme.brandDeep,
    borderWidth: 3,
    borderColor: theme.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: theme.panel,
    fontWeight: "700",
    fontSize: 16,
  },
  profileText: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    color: theme.ink,
    fontWeight: "800",
    fontSize: 20,
  },
  profileMeta: {
    color: theme.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  vibeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  vibeChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  vibeChipOrange: {
    backgroundColor: "#ffe1cd",
  },
  vibeChipMint: {
    backgroundColor: "#d6fff8",
  },
  vibeChipPurple: {
    backgroundColor: "#ead9ff",
  },
  vibeChipText: {
    color: theme.ink,
    fontSize: 12,
    fontWeight: "700",
  },
  profileHighlight: {
    backgroundColor: "#fff0de",
    borderRadius: 20,
    padding: 16,
    gap: 8,
  },
  highlightEyebrow: {
    color: theme.brandDeep,
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  highlightText: {
    color: theme.ink,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#2a1d4b",
    borderRadius: 20,
    borderWidth: 0,
    padding: 16,
    alignItems: "center",
    gap: 6,
  },
  statValue: {
    color: "#fff6de",
    fontSize: 22,
    fontWeight: "800",
  },
  statLabel: {
    color: "#d7c8ff",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
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
  favoriteRow: {
    backgroundColor: "#fffaf3",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.stroke,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  favoriteTextWrap: {
    flex: 1,
    gap: 6,
  },
  favoriteTitle: {
    color: theme.ink,
    fontWeight: "700",
    fontSize: 15,
  },
  logMeta: {
    color: theme.muted,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  signOutButton: {
    marginTop: 4,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.stroke,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#fff0de",
  },
  signOutText: {
    color: theme.brandDeep,
    fontSize: 14,
    fontWeight: "800",
  },
});
