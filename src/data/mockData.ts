import { ActivityItem, GameItem, UserItem } from "../types";

export const activitySeed: ActivityItem[] = [
  {
    id: "a1",
    user: "Mia Chen",
    handle: "@miaxplay",
    action: "logged",
    game: "Clair Obscur: Expedition 33",
    rating: 5,
    note: "Every chapter feels hand-painted. Combat is absurdly stylish.",
    time: "12m ago",
    status: "finished",
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
    status: "replaying",
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
    status: "finished",
  },
];

export const gameSeed: GameItem[] = [
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

export const userSeed: UserItem[] = [
  { id: "u1", name: "Mia Chen", handle: "@miaxplay", favorite: "JRPGs", avatar: "MC" },
  { id: "u2", name: "Theo Park", handle: "@tpixel", favorite: "Indies", avatar: "TP" },
  { id: "u3", name: "Jules Rivera", handle: "@juleslogs", favorite: "Narrative", avatar: "JR" },
  { id: "u4", name: "Ari Shah", handle: "@arish", favorite: "Soulslikes", avatar: "AS" },
];

export const statCards = [
  { label: "Logged", value: "128" },
  { label: "This Month", value: "09" },
  { label: "Friends", value: "142" },
];

export const defaultProfile = {
  name: "Rajat Mehra",
  handle: "@rajat",
  bio: "I log games for atmosphere, combat feel, and emotional aftertaste.",
  vibe: "Prestige RPGs, stylish action, and emotionally sharp indies",
};

export const defaultFollowedHandles = ["@miaxplay", "@tpixel"];

export const logStatuses = [
  { key: "playing", label: "Playing now" },
  { key: "finished", label: "Finished" },
  { key: "replaying", label: "Replay" },
  { key: "wishlist", label: "Wishlist" },
] as const;

export const onboardingPoints = [
  "Taste-first profiles built around what you finish and rate",
  "A social feed that highlights friends, reviews, and replays",
  "Mocked browser-only data today, ready for Supabase and IGDB next",
];
