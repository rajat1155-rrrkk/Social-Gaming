import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { RatingStars } from "../components/RatingStars";
import { SectionTitle } from "../components/SectionTitle";
import { logStatuses } from "../data/mockData";
import { theme } from "../theme";
import { GameItem, Rating } from "../types";

export function LogScreen({
  selectedGame,
  rating,
  note,
  status,
  onRatingChange,
  onNoteChange,
  onStatusChange,
  onPublish,
}: {
  selectedGame: GameItem;
  rating: Rating;
  note: string;
  status: "playing" | "finished" | "replaying" | "wishlist";
  onRatingChange: (value: Rating) => void;
  onNoteChange: (value: string) => void;
  onStatusChange: (value: "playing" | "finished" | "replaying" | "wishlist") => void;
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

        <Text style={styles.blockLabel}>Status</Text>
        <View style={styles.statusRow}>
          {logStatuses.map((item) => (
            <Pressable
              key={item.key}
              style={[styles.statusChip, status === item.key && styles.statusChipActive]}
              onPress={() => onStatusChange(item.key)}
            >
              <Text
                style={[styles.statusChipText, status === item.key && styles.statusChipTextActive]}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.mockPanel}>
          <Text style={styles.mockTitle}>Prototype state</Text>
          <Text style={styles.mockCopy}>
            This log form now persists in-browser, so your posts, follow choices, and profile state
            survive refreshes while we stay Vercel-safe and backend-free.
          </Text>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Quick Review</Text>
          <TextInput
            value={note}
            onChangeText={onNoteChange}
            multiline
            placeholder="What stood out: combat feel, writing, atmosphere, pacing..."
            placeholderTextColor={theme.muted}
            style={styles.noteInput}
          />
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
    backgroundColor: "#fff8f0",
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
    backgroundColor: "#fff2e4",
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
    color: theme.brandDeep,
    fontSize: 13,
    fontWeight: "700",
  },
  mockPanel: {
    marginTop: 18,
    backgroundColor: "#e7fff8",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#99ebdf",
    padding: 16,
    gap: 8,
  },
  mockTitle: {
    color: theme.brandDeep,
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
    backgroundColor: "#fff0df",
    borderWidth: 1,
    borderColor: "#ffd1a2",
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
  noteInput: {
    minHeight: 96,
    textAlignVertical: "top",
    color: theme.ink,
    fontSize: 14,
    lineHeight: 21,
  },
  statusRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 2,
  },
  statusChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.stroke,
    backgroundColor: "#fff1df",
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  statusChipActive: {
    backgroundColor: theme.brandDeep,
    borderColor: theme.brandDeep,
  },
  statusChipText: {
    color: theme.ink,
    fontSize: 12,
    fontWeight: "700",
  },
  statusChipTextActive: {
    color: theme.panel,
  },
  primaryButton: {
    backgroundColor: "#5f49ff",
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
