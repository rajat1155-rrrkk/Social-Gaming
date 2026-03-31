import { Pressable, StyleSheet, Text, View } from "react-native";

import { RatingStars } from "../components/RatingStars";
import { SectionTitle } from "../components/SectionTitle";
import { GameItem, Rating } from "../types";
import { theme } from "../theme";

export function LogScreen({
  selectedGame,
  rating,
  onRatingChange,
  onPublish,
}: {
  selectedGame: GameItem;
  rating: Rating;
  onRatingChange: (value: Rating) => void;
  onPublish: () => void;
}) {
  return (
    <>
      <SectionTitle
        title="Log a Game"
        subtitle="This composer is wired to local state so it works entirely in-browser"
      />
      <View style={styles.composerCard}>
        <Text style={styles.blockLabel}>Selected game</Text>
        <Pressable style={styles.selector}>
          <Text style={styles.selectorText}>{selectedGame.title}</Text>
          <Text style={styles.selectorMeta}>{selectedGame.platform}</Text>
        </Pressable>

        <Text style={styles.blockLabel}>Your rating</Text>
        <RatingStars rating={rating} onChange={onRatingChange} size={24} />

        <View style={styles.mockPanel}>
          <Text style={styles.mockTitle}>Frontend-first stack</Text>
          <Text style={styles.mockCopy}>
            This composer is intentionally mocked in local state for browser demos. The final shape
            maps cleanly to Supabase auth, profiles, logs, and an IGDB-backed game table.
          </Text>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Quick Review</Text>
          <Text style={styles.noteText}>
            Sample note text is intentionally static for the demo. The interaction is the priority
            here, and this can later map directly to Supabase tables and IGDB references.
          </Text>
        </View>

        <Pressable style={styles.primaryButton} onPress={onPublish}>
          <Text style={styles.primaryButtonText}>Publish Demo Log</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  composerCard: {
    backgroundColor: theme.panel,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: theme.stroke,
    padding: 18,
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
  selector: {
    backgroundColor: theme.bg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.stroke,
    padding: 16,
    marginBottom: 16,
    gap: 4,
  },
  selectorText: {
    color: theme.ink,
    fontSize: 16,
    fontWeight: "700",
  },
  selectorMeta: {
    color: theme.muted,
    fontSize: 13,
  },
  mockPanel: {
    marginTop: 18,
    backgroundColor: "#e4eee9",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#c7ddd4",
    padding: 16,
    gap: 8,
  },
  mockTitle: {
    color: theme.brand,
    fontWeight: "800",
    fontSize: 15,
  },
  mockCopy: {
    color: theme.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  noteCard: {
    marginTop: 18,
    padding: 16,
    borderRadius: 22,
    backgroundColor: theme.panelAlt,
    gap: 8,
    marginBottom: 18,
  },
  noteTitle: {
    color: theme.ink,
    fontWeight: "700",
    fontSize: 15,
  },
  noteText: {
    color: theme.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  primaryButton: {
    backgroundColor: theme.ink,
    minHeight: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  primaryButtonText: {
    color: theme.panel,
    fontSize: 15,
    fontWeight: "700",
  },
});
