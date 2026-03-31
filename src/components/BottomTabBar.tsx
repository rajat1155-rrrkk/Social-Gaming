import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";

import { layout, theme } from "../theme";
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
  const { width } = useWindowDimensions();
  const tabBarWidth = Math.min(Math.max(width - 28, 0), layout.maxContentWidth + 24);
  const tabBarLeft = Math.max((width - tabBarWidth) / 2, 14);

  return (
    <View style={[styles.tabBar, { width: tabBarWidth, left: tabBarLeft }]}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.key}
          style={[styles.tabItem, activeTab === tab.key && styles.tabItemActive]}
          onPress={() => onChange(tab.key)}
        >
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
    bottom: 16,
    backgroundColor: "rgba(255,248,238,0.97)",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: theme.stroke,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 8,
    shadowColor: theme.brandDeep,
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  tabItem: {
    alignItems: "center",
    gap: 6,
    minWidth: 58,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    flex: 1,
  },
  tabItemActive: {
    backgroundColor: "#ffe7cf",
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
