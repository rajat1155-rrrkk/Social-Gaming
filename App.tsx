import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type TabKey = "feed" | "search" | "log" | "profile";
type Rating = 1 | 2 | 3 | 4 | 5;

type ActivityItem = {
  id: string;
  user: string;
  handle: string;
  action: string;
  game: string;
  rating: Rating;
  note: string;
  time: string;
};

type GameItem = {
  id: string;
  title: string;
  genre: string;
  year: string;
  platform: string;
  friendsLogged: number;
  accent: [string, string];
};

type UserItem = {
  id: string;
  name: string;
  handle: string;
  favorite: string;
  avatar: string;
};

const theme = {
  bg: "#f4efe7",
  panel: "#fbf7f1",
  ink: "#161410",
  muted: "#6d655a",
  stroke: "#d8cebf",
  brand: "#1f5c4b",
  brandSoft: "#d7eadf",
  gold: "#c7922f",
  danger: "#8c3c35",
};

const activitySeed: ActivityItem[] = [
  {
    id: "a1",
    user: "Mia Chen",
    handle: "@miaxplay",
    action: "logged",
    game: "Clair Obscur: Expedition 33",
    rating: 5,
    note: "Every chapter feels hand-painted. Combat is absurdly stylish.",
    time: "12m ago",
  },
  {
    id: "a2",
    user: "Theo Park",
    handle: "@tpixel",
    action: "replayed",
    game: "Hades II",
    rating: 4,
    note: "Still the cleanest loop design in the genre.",
    time: "48m ago",
  },
  {
    id: "a3",
    user: "Jules Rivera",
    handle: "@juleslogs",
    action: "finished",
    game: "Final Fantasy VII Rebirth",
    rating: 5,
    note: "Massive, emotional, and way more playful than I expected.",
    time: "2h ago",
  },
];

const gameSeed: GameItem[] = [
  {
    id: "g1",
    title: "Clair Obscur: Expedition 33",
    genre: "RPG",
    year: "2025",
    platform: "PS5 / PC",
    friendsLogged: 18,
    accent: ["#102520", "#245c4b"],
  },
  {
    id: "g2",
    title: "Hades II",
    genre: "Roguelike",
    year: "2024",
    platform: "PC",
    friendsLogged: 11,
    accent: ["#281410", "#7f3b29"],
  },
  {
    id: "g3",
    title: "Elden Ring",
    genre: "Action RPG",
    year: "2022",
    platform: "Console / PC",
    friendsLogged: 31,
    accent: ["#161616", "#6d612c"],
  },
  {
    id: "g4",
    title: "Animal Well",
    genre: "Puzzle Platformer",
    year: "2024",
    platform: "Switch / PS5 / PC",
    friendsLogged: 7,
    accent: ["#18192e", "#4d64b1"],
  },
];

const userSeed: UserItem[] = [
  { id: "u1", name: "Mia Chen", handle: "@miaxplay", favorite: "JRPGs", avatar: "MC" },
  { id: "u2", name: "Theo Park", handle: "@tpixel", favorite: "Indies", avatar: "TP" },
  { id: "u3", name: "Jules Rivera", handle: "@juleslogs", favorite: "Narrative", avatar: "JR" },
  { id: "u4", name: "Ari Shah", handle: "@arish", favorite: "Soulslikes", avatar: "AS" },
];

const statCards = [
  { label: "Logged", value: "128" },
  { label: "This Month", value: "09" },
  { label: "Friends", value: "142" },
];

function RatingStars({
  rating,
  onChange,
  size = 16,
}: {
  rating: number;
  onChange?: (value: Rating) => void;
  size?: number;
}) {
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable
          key={star}
          onPress={() => onChange?.(star as Rating)}
          style={styles.starButton}
        >
          <Ionicons
            name={star <= rating ? "star" : "star-outline"}
            size={size}
            color={theme.gold}
          />
        </Pressable>
      ))}
    </View>
  );
}

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("feed");
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState<Rating>(4);
  const [selectedGame, setSelectedGame] = useState<GameItem>(gameSeed[0]);
  const [activity, setActivity] = useState<ActivityItem[]>(activitySeed);

  const filteredGames = useMemo(() => {
    if (!search.trim()) return gameSeed;
    const query = search.toLowerCase();
    return gameSeed.filter(
      (game) =>
        game.title.toLowerCase().includes(query) ||
        game.genre.toLowerCase().includes(query),
    );
  }, [search]);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return userSeed;
    const query = search.toLowerCase();
    return userSeed.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.handle.toLowerCase().includes(query) ||
        user.favorite.toLowerCase().includes(query),
    );
  }, [search]);

  const addLog = () => {
    setActivity((current) => [
      {
        id: `${Date.now()}`,
        user: "Rajat Mehra",
        handle: "@rajat",
        action: "logged",
        game: selectedGame.title,
        rating,
        note: "Mocked from the demo composer. Ready for Supabase later.",
        time: "now",
      },
      ...current,
    ]);
    setActiveTab("feed");
  };

  if (!signedIn) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <LinearGradient colors={["#f8f3ec", "#e6eee8"]} style={styles.authShell}>
          <View style={styles.authCard}>
            <View style={styles.brandBadge}>
              <MaterialCommunityIcons name="controller-classic" size={26} color={theme.panel} />
            </View>
            <Text style={styles.eyebrow}>logg</Text>
            <Text style={styles.authTitle}>Track the games worth remembering.</Text>
            <Text style={styles.authText}>
              A social game journal for ratings, discovery, and the people whose taste you trust.
            </Text>

            <View style={styles.previewPanel}>
              <Text style={styles.previewTitle}>MVP Demo Includes</Text>
              <Text style={styles.previewItem}>User auth entry with premium onboarding</Text>
              <Text style={styles.previewItem}>Feed, search, logging, and profile flows</Text>
              <Text style={styles.previewItem}>Local sample data standing in for Supabase + IGDB</Text>
            </View>

            <Pressable style={styles.primaryButton} onPress={() => setSignedIn(true)}>
              <Text style={styles.primaryButtonText}>Enter Demo</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.appShell}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.heroCard}>
            <View>
              <Text style={styles.eyebrow}>Social Gaming MVP</Text>
              <Text style={styles.heroTitle}>A clean, premium-first demo for logg.</Text>
            </View>
            <View style={styles.heroPill}>
              <Text style={styles.heroPillText}>UI-first build</Text>
            </View>
          </View>

          {activeTab === "feed" && (
            <>
              <SectionTitle
                title="Friend Activity"
                subtitle="Recent logs from people you follow"
              />
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
          )}

          {activeTab === "search" && (
            <>
              <SectionTitle
                title="Discover"
                subtitle="Search games and people with mocked IGDB-style data"
              />
              <View style={styles.searchInputWrap}>
                <Ionicons name="search" size={18} color={theme.muted} />
                <TextInput
                  value={search}
                  onChangeText={setSearch}
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
                  <Pressable
                    style={styles.ghostButton}
                    onPress={() => {
                      setSelectedGame(game);
                      setActiveTab("log");
                    }}
                  >
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
          )}

          {activeTab === "log" && (
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
                <RatingStars rating={rating} onChange={setRating} size={24} />

                <View style={styles.noteCard}>
                  <Text style={styles.noteTitle}>Quick Review</Text>
                  <Text style={styles.noteText}>
                    Sample note text is intentionally static for the demo. The interaction is the
                    priority here, and this can later map directly to Supabase tables and IGDB
                    references.
                  </Text>
                </View>

                <Pressable style={styles.primaryButton} onPress={addLog}>
                  <Text style={styles.primaryButtonText}>Publish Demo Log</Text>
                </Pressable>
              </View>
            </>
          )}

          {activeTab === "profile" && (
            <>
              <SectionTitle
                title="Your Profile"
                subtitle="A profile view shaped for social credibility and personal taste"
              />
              <View style={styles.profileCard}>
                <View style={styles.profileHeader}>
                  <View style={[styles.avatar, styles.profileAvatar]}>
                    <Text style={styles.avatarText}>RM</Text>
                  </View>
                  <View style={styles.profileText}>
                    <Text style={styles.profileName}>Rajat Mehra</Text>
                    <Text style={styles.profileMeta}>@rajat • RPGs, stylish action, narrative indies</Text>
                  </View>
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
                {gameSeed.slice(0, 3).map((game) => (
                  <View key={game.id} style={styles.favoriteRow}>
                    <Text style={styles.favoriteTitle}>{game.title}</Text>
                    <RatingStars rating={5} />
                  </View>
                ))}
              </View>
            </>
          )}
        </ScrollView>

        <View style={styles.tabBar}>
          {[
            ["feed", "home-outline", "Feed"],
            ["search", "search-outline", "Search"],
            ["log", "add-circle-outline", "Log"],
            ["profile", "person-outline", "Profile"],
          ].map(([key, icon, label]) => (
            <Pressable
              key={key}
              style={styles.tabItem}
              onPress={() => setActiveTab(key as TabKey)}
            >
              <Ionicons
                name={icon as keyof typeof Ionicons.glyphMap}
                size={20}
                color={activeTab === key ? theme.brand : theme.muted}
              />
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === key && styles.tabLabelActive,
                ]}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.sectionTitleWrap}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  authShell: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  authCard: {
    backgroundColor: "rgba(251, 247, 241, 0.95)",
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: theme.stroke,
    gap: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
  },
  brandBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.brand,
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: theme.brand,
    fontWeight: "700",
  },
  authTitle: {
    fontSize: 34,
    lineHeight: 38,
    color: theme.ink,
    fontWeight: "800",
  },
  authText: {
    fontSize: 15,
    lineHeight: 24,
    color: theme.muted,
  },
  previewPanel: {
    backgroundColor: theme.panel,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: theme.stroke,
    padding: 18,
    gap: 8,
  },
  previewTitle: {
    color: theme.ink,
    fontWeight: "700",
    fontSize: 15,
  },
  previewItem: {
    color: theme.muted,
    fontSize: 14,
    lineHeight: 20,
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
  appShell: {
    flex: 1,
  },
  content: {
    padding: 18,
    paddingBottom: 110,
    gap: 16,
  },
  heroCard: {
    backgroundColor: theme.panel,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: theme.stroke,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  heroTitle: {
    marginTop: 8,
    color: theme.ink,
    fontSize: 26,
    lineHeight: 31,
    fontWeight: "800",
    maxWidth: 240,
  },
  heroPill: {
    backgroundColor: theme.brandSoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  heroPillText: {
    color: theme.brand,
    fontWeight: "700",
    fontSize: 12,
  },
  sectionTitleWrap: {
    marginTop: 8,
    gap: 4,
  },
  sectionTitle: {
    color: theme.ink,
    fontSize: 24,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: theme.muted,
    fontSize: 14,
    lineHeight: 20,
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
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  starButton: {
    paddingRight: 2,
  },
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
    maxWidth: 220,
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
  composerCard: {
    backgroundColor: theme.panel,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: theme.stroke,
    padding: 18,
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
  noteCard: {
    marginTop: 18,
    padding: 16,
    borderRadius: 22,
    backgroundColor: "#efe6d7",
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
  tabBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: "rgba(251,247,241,0.98)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.stroke,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
  },
  tabItem: {
    alignItems: "center",
    gap: 6,
  },
  tabLabel: {
    color: theme.muted,
    fontSize: 12,
    fontWeight: "600",
  },
  tabLabelActive: {
    color: theme.brand,
  },
});
