import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "../theme";
import { TabKey } from "../types";

const tabs: Array<{ key: TabKey; icon: keyof typeof Ionicons.glyphMap; label: string }> = [
  { key: "feed", icon: "home-outline", label: "Feed" },
  { key: "search", icon: "search-outline", label: "Search" },
  { key: "log", icon: "add-circle-outline", label: "Log" },
  { key: "profile", icon: "person-outline", label: "Profile" },
];

export function BottomTabBar({
  activeTab,
  onChange,
}: {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
}) {
  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => (
        <Pressable key={tab.key} style={styles.tabItem} onPress={() => onChange(tab.key)}>
          <Ionicons
            name={tab.icon}
            size={20}
            color={activeTab === tab.key ? theme.brand : theme.muted}
          />
          <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: "rgba(255,245,231,0.96)",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: theme.stroke,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    shadowColor: theme.brandDeep,
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  tabItem: {
    alignItems: "center",
    gap: 6,
    minWidth: 58,
  },
  tabLabel: {
    color: theme.muted,
    fontSize: 12,
    fontWeight: "600",
  },
  tabLabelActive: {
    color: theme.brandDeep,
  },
});
