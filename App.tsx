import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { BottomTabBar } from "./src/components/BottomTabBar";
import { activitySeed, gameSeed, userSeed } from "./src/data/mockData";
import { AuthScreen } from "./src/screens/AuthScreen";
import { FeedScreen } from "./src/screens/FeedScreen";
import { LogScreen } from "./src/screens/LogScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { SearchScreen } from "./src/screens/SearchScreen";
import { layout, theme } from "./src/theme";
import { ActivityItem, GameItem, Rating, TabKey } from "./src/types";

export default function App() {
  const { width } = useWindowDimensions();
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
        <AuthScreen onEnter={() => setSignedIn(true)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.appShell}>
        <View
          style={[
            styles.backdropOrb,
            styles.backdropOrbTop,
            width > 768 && styles.backdropOrbWide,
          ]}
        />
        <View style={[styles.backdropOrb, styles.backdropOrbBottom]} />
        <ScrollView contentContainerStyle={styles.pageContent}>
          <View style={styles.deviceFrame}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
              <View style={styles.heroCard}>
                <View style={styles.heroTopRow}>
                  <View style={styles.heroBadge}>
                    <View style={styles.heroBadgeDot} />
                    <Text style={styles.heroBadgeText}>Social Gaming MVP</Text>
                  </View>
                  <View style={styles.heroStatusPill}>
                    <Text style={styles.heroStatusText}>Browser-only demo</Text>
                  </View>
                </View>
                <Text style={styles.heroTitle}>A polished mobile concept for logging and discovering games.</Text>
                <Text style={styles.heroCopy}>
                  Built as an Expo web demo for fast review on Vercel, with mocked social data now
                  and a clean path to Supabase plus IGDB when we wire the real MVP.
                </Text>
              </View>

              {activeTab === "feed" && <FeedScreen activity={activity} />}

              {activeTab === "search" && (
                <SearchScreen
                  search={search}
                  onSearchChange={setSearch}
                  filteredGames={filteredGames}
                  filteredUsers={filteredUsers}
                  onSelectGame={(game) => {
                    setSelectedGame(game);
                    setActiveTab("log");
                  }}
                />
              )}

              {activeTab === "log" && (
                <LogScreen
                  selectedGame={selectedGame}
                  rating={rating}
                  onRatingChange={setRating}
                  onPublish={addLog}
                />
              )}

              {activeTab === "profile" && <ProfileScreen favorites={gameSeed.slice(0, 3)} />}
            </ScrollView>
          </View>
        </ScrollView>

        <BottomTabBar activeTab={activeTab} onChange={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  appShell: {
    flex: 1,
    overflow: "hidden",
  },
  pageContent: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    paddingBottom: 120,
  },
  deviceFrame: {
    width: "100%",
    maxWidth: layout.maxContentWidth + 24,
    backgroundColor: "rgba(251, 247, 241, 0.45)",
    borderRadius: 36,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(216, 206, 191, 0.7)",
  },
  content: {
    padding: 18,
    paddingBottom: 24,
    gap: 16,
    backgroundColor: "rgba(243, 237, 229, 0.82)",
    borderRadius: 28,
  },
  backdropOrb: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgba(31, 92, 75, 0.08)",
  },
  backdropOrbTop: {
    width: 260,
    height: 260,
    top: -30,
    right: -70,
  },
  backdropOrbWide: {
    right: "8%",
  },
  backdropOrbBottom: {
    width: 220,
    height: 220,
    bottom: 40,
    left: -80,
    backgroundColor: "rgba(199, 146, 47, 0.09)",
  },
  heroCard: {
    backgroundColor: theme.panel,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: theme.stroke,
    padding: 18,
    gap: 14,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  heroBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: theme.brand,
  },
  heroBadgeText: {
    color: theme.brand,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  heroStatusPill: {
    backgroundColor: theme.brandSoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  heroStatusText: {
    color: theme.brand,
    fontWeight: "700",
    fontSize: 12,
  },
  heroTitle: {
    color: theme.ink,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
  },
  heroCopy: {
    color: theme.muted,
    fontSize: 15,
    lineHeight: 23,
  },
});
