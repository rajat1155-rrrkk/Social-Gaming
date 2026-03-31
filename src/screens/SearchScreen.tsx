import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { CoverArt } from "../components/CoverArt";
import { SectionTitle } from "../components/SectionTitle";
import { GameItem, UserItem } from "../types";
import { theme } from "../theme";

export function SearchScreen({
  search,
  onSearchChange,
  filteredGames,
  filteredUsers,
  onSelectGame,
  followedHandles,
  onToggleFollow,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  filteredGames: GameItem[];
  filteredUsers: UserItem[];
  onSelectGame: (game: GameItem) => void;
  followedHandles: string[];
  onToggleFollow: (handle: string) => void;
}) {
  return (
    <>
      <SectionTitle
        title="Discover"
        subtitle="Search games and people with mocked IGDB-style data"
      />
      <View style={styles.discoveryBanner}>
        <Text style={styles.discoveryEyebrow}>Fresh finds</Text>
        <Text style={styles.discoveryTitle}>Colorful picks, taste-forward people, instant logging.</Text>
        <Text style={styles.discoveryCopy}>
          Browse the kind of games and profiles that make the app feel social, curated, and alive.
        </Text>
      </View>
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
        <View key={game.id} style={styles.gameCard}>
          <CoverArt
            uri={game.coverUri}
            title={game.title}
            colors={game.accent}
            symbolText={game.symbolText}
            width={92}
            height={122}
            radius={20}
          />
          <View style={styles.gameTextWrap}>
            <Text style={styles.gameTitle}>{game.title}</Text>
            <Text style={styles.gameMeta}>
              {game.genre} • {game.year} • {game.platform}
            </Text>
            <Text style={styles.gameBlurb}>{game.blurb}</Text>
            <Text style={styles.gameFriends}>{game.friendsLogged} friends logged this</Text>
          </View>
          <Pressable style={styles.ghostButton} onPress={() => onSelectGame(game)}>
            <Text style={styles.ghostButtonText}>Log</Text>
          </Pressable>
        </View>
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
          <Pressable
            style={[
              styles.followButton,
              followedHandles.includes(user.handle) && styles.followButtonActive,
            ]}
            onPress={() => onToggleFollow(user.handle)}
          >
            <Text
              style={[
                styles.followButtonText,
                followedHandles.includes(user.handle) && styles.followButtonTextActive,
              ]}
            >
              {followedHandles.includes(user.handle) ? "Following" : "Follow"}
            </Text>
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
    backgroundColor: "#fffdf7",
    borderWidth: 1,
    borderColor: theme.stroke,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
  },
  discoveryBanner: {
    backgroundColor: "#fff1de",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#ffc78f",
    padding: 18,
    gap: 8,
  },
  discoveryEyebrow: {
    color: theme.brandDeep,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.3,
    textTransform: "uppercase",
  },
  discoveryTitle: {
    color: theme.ink,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "800",
  },
  discoveryCopy: {
    color: theme.muted,
    fontSize: 14,
    lineHeight: 21,
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
    borderRadius: 26,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#fffaf3",
    borderWidth: 1,
    borderColor: theme.stroke,
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  gameTextWrap: {
    flex: 1,
    gap: 8,
  },
  gameTitle: {
    color: theme.ink,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
  },
  gameMeta: {
    color: theme.brandDeep,
    fontSize: 13,
    fontWeight: "700",
  },
  gameBlurb: {
    color: theme.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  gameFriends: {
    color: theme.redClay,
    fontSize: 13,
    fontWeight: "700",
  },
  ghostButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: theme.redClay,
  },
  ghostButtonText: {
    color: theme.panel,
    fontWeight: "700",
  },
  userCard: {
    backgroundColor: "#fffaf3",
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
    backgroundColor: "#dff0ff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#9fd0ff",
  },
  avatarText: {
    color: "#10213d",
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
    backgroundColor: "#e8fff7",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#97eadf",
  },
  followButtonText: {
    color: "#0f6e68",
    fontWeight: "700",
    fontSize: 12,
  },
  followButtonActive: {
    backgroundColor: theme.brandDeep,
  },
  followButtonTextActive: {
    color: theme.panel,
  },
});
