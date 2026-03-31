import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { SectionTitle } from "../components/SectionTitle";
import { GameItem, UserItem } from "../types";
import { theme } from "../theme";

export function SearchScreen({
  search,
  onSearchChange,
  filteredGames,
  filteredUsers,
  onSelectGame,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  filteredGames: GameItem[];
  filteredUsers: UserItem[];
  onSelectGame: (game: GameItem) => void;
}) {
  return (
    <>
      <SectionTitle
        title="Discover"
        subtitle="Search games and people with mocked IGDB-style data"
      />
      <View style={styles.searchInputWrap}>
        <Ionicons name="search" size={18} color={theme.muted} />
        <TextInput
          value={search}
          onChangeText={onSearchChange}
          placeholder="Search games, genres, or users"
          placeholderTextColor={theme.muted}
          style={styles.searchInput}
        />
      </View>

      <Text style={styles.blockLabel}>Games</Text>
      {filteredGames.map((game) => (
        <LinearGradient key={game.id} colors={game.accent} style={styles.gameCard}>
          <View style={styles.gameTextWrap}>
            <Text style={styles.gameTitle}>{game.title}</Text>
            <Text style={styles.gameMeta}>
              {game.genre} • {game.year} • {game.platform}
            </Text>
            <Text style={styles.gameFriends}>{game.friendsLogged} friends logged this</Text>
          </View>
          <Pressable style={styles.ghostButton} onPress={() => onSelectGame(game)}>
            <Text style={styles.ghostButtonText}>Log</Text>
          </Pressable>
        </LinearGradient>
      ))}

      <Text style={styles.blockLabel}>Players</Text>
      {filteredUsers.map((user) => (
        <View key={user.id} style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.avatar}</Text>
          </View>
          <View style={styles.userTextWrap}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userMeta}>
              {user.handle} • Loves {user.favorite}
            </Text>
          </View>
          <Pressable style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </Pressable>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  searchInputWrap: {
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: theme.panel,
    borderWidth: 1,
    borderColor: theme.stroke,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: theme.ink,
    fontSize: 15,
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
  gameCard: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 12,
    minHeight: 130,
    justifyContent: "space-between",
  },
  gameTextWrap: {
    gap: 8,
  },
  gameTitle: {
    color: "#f7f3ee",
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800",
    maxWidth: 240,
  },
  gameMeta: {
    color: "rgba(247,243,238,0.8)",
    fontSize: 13,
  },
  gameFriends: {
    color: "#f7f3ee",
    fontSize: 13,
    fontWeight: "600",
  },
  ghostButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "rgba(251,247,241,0.16)",
    borderWidth: 1,
    borderColor: "rgba(251,247,241,0.2)",
  },
  ghostButtonText: {
    color: "#f7f3ee",
    fontWeight: "700",
  },
  userCard: {
    backgroundColor: theme.panel,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: theme.stroke,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
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
  userTextWrap: {
    flex: 1,
    gap: 4,
  },
  userName: {
    color: theme.ink,
    fontSize: 15,
    fontWeight: "700",
  },
  userMeta: {
    color: theme.muted,
    fontSize: 13,
  },
  followButton: {
    backgroundColor: theme.brandSoft,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  followButtonText: {
    color: theme.brand,
    fontWeight: "700",
    fontSize: 12,
  },
});
