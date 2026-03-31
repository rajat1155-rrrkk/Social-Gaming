import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { AnimatedEntrance } from "./src/components/AnimatedEntrance";
import { BottomTabBar } from "./src/components/BottomTabBar";
import {
  activitySeed,
  defaultFollowedHandles,
  defaultProfile,
  gameSeed,
  userSeed,
} from "./src/data/mockData";
import { loadPrototypeState, savePrototypeState } from "./src/lib/persistence";
import { AuthScreen } from "./src/screens/AuthScreen";
import { FeedScreen } from "./src/screens/FeedScreen";
import { LogScreen } from "./src/screens/LogScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { SearchScreen } from "./src/screens/SearchScreen";
import { layout, theme } from "./src/theme";
import { ActivityItem, GameItem, Profile, Rating, TabKey } from "./src/types";

export default function App() {
  const { width } = useWindowDimensions();
  const [signedIn, setSignedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("feed");
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState<Rating>(4);
  const [note, setNote] = useState("");
  const [logStatus, setLogStatus] = useState<"playing" | "finished" | "replaying" | "wishlist">(
    "finished",
  );
  const [selectedGame, setSelectedGame] = useState<GameItem>(gameSeed[0]);
  const [activity, setActivity] = useState<ActivityItem[]>(activitySeed);
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [followedHandles, setFollowedHandles] = useState<string[]>(defaultFollowedHandles);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const persisted = loadPrototypeState();
    if (persisted) {
      setSignedIn(persisted.signedIn);
      setProfile(persisted.profile);
      setActivity(persisted.activity as ActivityItem[]);
      setFollowedHandles(persisted.followedHandles);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    savePrototypeState({
      signedIn,
      profile,
      activity,
      followedHandles,
    });
  }, [signedIn, profile, activity, followedHandles, hydrated]);

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

  const ownActivity = useMemo(
    () => activity.filter((entry) => entry.handle === profile.handle),
    [activity, profile.handle],
  );

  const addLog = () => {
    setActivity((current) => [
      {
        id: `${Date.now()}`,
        user: profile.name,
        handle: profile.handle,
        action: logStatus === "finished" ? "finished" : logStatus === "wishlist" ? "saved" : "logged",
        game: selectedGame.title,
        rating,
        note: note.trim() || "No review added yet, but the prototype log is live and persisted.",
        time: "now",
        status: logStatus,
      },
      ...current,
    ]);
    setNote("");
    setLogStatus("finished");
    setActiveTab("feed");
  };

  const toggleFollow = (handle: string) => {
    setFollowedHandles((current) =>
      current.includes(handle) ? current.filter((entry) => entry !== handle) : [...current, handle],
    );
  };

  const resetSession = () => {
    setSignedIn(false);
    setProfile(defaultProfile);
    setActivity(activitySeed);
    setFollowedHandles(defaultFollowedHandles);
    setRating(4);
    setNote("");
    setLogStatus("finished");
    setSelectedGame(gameSeed[0]);
    setActiveTab("feed");
    setSearch("");
  };

  if (!hydrated) {
    return <SafeAreaView style={styles.safeArea} />;
  }

  if (!signedIn) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <AuthScreen
          name={profile.name}
          handle={profile.handle}
          onNameChange={(value) => setProfile((current) => ({ ...current, name: value }))}
          onHandleChange={(value) => setProfile((current) => ({ ...current, handle: value }))}
          onEnter={() => setSignedIn(true)}
        />
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
              <AnimatedEntrance delay={40} offset={10}>
                <View style={styles.heroCard}>
                  <View style={styles.heroTopRow}>
                    <View style={styles.heroBadge}>
                      <View style={styles.heroBadgeDot} />
                      <Text style={styles.heroBadgeText}>Working Prototype</Text>
                    </View>
                    <View style={styles.heroStatusPill}>
                      <Text style={styles.heroStatusText}>Vercel-safe local state</Text>
                    </View>
                  </View>
                  <Text style={styles.heroTitle}>A collector-style social app for people with game taste.</Text>
                  <Text style={styles.heroCopy}>
                    The UI now behaves like a real prototype: profile entry, follow state, notes, and
                    logs persist in-browser so the product can actually be used and revisited.
                  </Text>
                </View>
              </AnimatedEntrance>

              {activeTab === "feed" && (
                <FeedScreen activity={activity} followingCount={followedHandles.length} />
              )}

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
                  followedHandles={followedHandles}
                  onToggleFollow={toggleFollow}
                />
              )}

              {activeTab === "log" && (
                <LogScreen
                  selectedGame={selectedGame}
                  rating={rating}
                  note={note}
                  status={logStatus}
                  onRatingChange={setRating}
                  onNoteChange={setNote}
                  onStatusChange={setLogStatus}
                  onPublish={addLog}
                />
              )}

              {activeTab === "profile" && (
                <ProfileScreen
                  profile={profile}
                  favorites={gameSeed.slice(0, 3)}
                  recentLogs={ownActivity}
                  followingCount={followedHandles.length}
                  onSignOut={resetSession}
                />
              )}
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
    backgroundColor: "rgba(246, 239, 227, 0.08)",
    borderRadius: 36,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(234, 217, 196, 0.12)",
  },
  content: {
    padding: 18,
    paddingBottom: 24,
    gap: 16,
    backgroundColor: theme.bgElevated,
    borderRadius: 28,
  },
  backdropOrb: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgba(186, 138, 52, 0.12)",
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
    backgroundColor: "rgba(140, 159, 143, 0.12)",
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
    color: theme.brandDeep,
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
    color: theme.brandDeep,
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
