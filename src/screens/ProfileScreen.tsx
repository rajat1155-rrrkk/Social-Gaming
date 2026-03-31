import { StyleSheet, Text, View } from "react-native";

import { RatingStars } from "../components/RatingStars";
import { SectionTitle } from "../components/SectionTitle";
import { statCards } from "../data/mockData";
import { GameItem } from "../types";
import { theme } from "../theme";

export function ProfileScreen({ favorites }: { favorites: GameItem[] }) {
  return (
    <>
      <SectionTitle
        title="Your Profile"
        subtitle="A profile view shaped for social credibility and personal taste"
      />
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.profileAvatar}>
            <Text style={styles.avatarText}>RM</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileName}>Rajat Mehra</Text>
            <Text style={styles.profileMeta}>@rajat • RPGs, stylish action, narrative indies</Text>
          </View>
        </View>

        <View style={styles.profileHighlight}>
          <Text style={styles.highlightEyebrow}>Taste signal</Text>
          <Text style={styles.highlightText}>
            Leans toward atmospheric RPGs, prestige action, and emotionally sharp indies.
          </Text>
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
            <Text style={styles.favoriteTitle}>{game.title}</Text>
            <RatingStars rating={5} />
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: theme.panel,
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
    backgroundColor: theme.brand,
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
  profileHighlight: {
    backgroundColor: "#efe8db",
    borderRadius: 20,
    padding: 16,
    gap: 8,
  },
  highlightEyebrow: {
    color: theme.redClay,
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
    backgroundColor: theme.bg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.stroke,
    padding: 16,
    alignItems: "center",
    gap: 6,
  },
  statValue: {
    color: theme.ink,
    fontSize: 22,
    fontWeight: "800",
  },
  statLabel: {
    color: theme.muted,
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
    backgroundColor: theme.bg,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.stroke,
    padding: 14,
    marginBottom: 10,
    gap: 8,
  },
  favoriteTitle: {
    color: theme.ink,
    fontWeight: "700",
    fontSize: 15,
  },
});
