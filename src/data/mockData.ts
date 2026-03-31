import { ActivityItem, GameItem, UserItem } from "../types";

function createCoverArt(
  title: string,
  top: string,
  bottom: string,
  accent: string,
  eyebrow: string,
) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="960" viewBox="0 0 720 960">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${top}" />
          <stop offset="100%" stop-color="${bottom}" />
        </linearGradient>
      </defs>
      <rect width="720" height="960" rx="44" fill="url(#bg)" />
      <circle cx="560" cy="180" r="170" fill="${accent}" opacity="0.28" />
      <circle cx="120" cy="760" r="190" fill="${accent}" opacity="0.16" />
      <path d="M80 620C210 470 350 420 630 250" stroke="${accent}" stroke-opacity="0.6" stroke-width="18" fill="none" />
      <rect x="52" y="52" width="170" height="36" rx="18" fill="rgba(255,255,255,0.16)" />
      <text x="74" y="77" font-family="Arial, sans-serif" font-size="18" fill="#f8f1e6" letter-spacing="2">${eyebrow}</text>
      <text x="58" y="766" font-family="Georgia, serif" font-size="48" fill="#f8f1e6" font-weight="700">${title}</text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

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
  {
    id: "a4",
    user: "Ari Shah",
    handle: "@arish",
    action: "started",
    game: "Metaphor: ReFantazio",
    rating: 4,
    note: "The menu design alone deserves its own fan club.",
    time: "3h ago",
    status: "playing",
  },
  {
    id: "a5",
    user: "Lena Ford",
    handle: "@lenaframe",
    action: "wishlisted",
    game: "Death Stranding 2",
    rating: 5,
    note: "Purely for the weird moodboard energy and landscape direction.",
    time: "5h ago",
    status: "wishlist",
  },
  {
    id: "a6",
    user: "Noah Bell",
    handle: "@noahbell",
    action: "logged",
    game: "Cyberpunk 2077",
    rating: 4,
    note: "Night City still feels like the benchmark for density and atmosphere.",
    time: "7h ago",
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
    coverUri: createCoverArt("Expedition 33", "#0f1c1a", "#254d43", "#e7c57d", "PAINTED RPG"),
    blurb: "A lush prestige RPG with painterly spectacle and elegant turn-based combat.",
  },
  {
    id: "g2",
    title: "Hades II",
    genre: "Roguelike",
    year: "2024",
    platform: "PC",
    friendsLogged: 11,
    accent: ["#281410", "#7f3b29"],
    coverUri: createCoverArt("Hades II", "#25120f", "#6b2e1f", "#f4c27f", "MYTHIC ROGUELIKE"),
    blurb: "Stylish, fast, and still one of the sharpest-feeling action loops around.",
  },
  {
    id: "g3",
    title: "Elden Ring",
    genre: "Action RPG",
    year: "2022",
    platform: "Console / PC",
    friendsLogged: 31,
    accent: ["#161616", "#6d612c"],
    coverUri: createCoverArt("Elden Ring", "#141414", "#625724", "#d0c17d", "OPEN-WORLD EPIC"),
    blurb: "The modern benchmark for mythic scale, mystery, and hard-earned discovery.",
  },
  {
    id: "g4",
    title: "Animal Well",
    genre: "Puzzle Platformer",
    year: "2024",
    platform: "Switch / PS5 / PC",
    friendsLogged: 7,
    accent: ["#18192e", "#4d64b1"],
    coverUri: createCoverArt("Animal Well", "#191a30", "#465aa3", "#c5d2ff", "PUZZLE MAZE"),
    blurb: "Dense, secretive, and designed like a puzzle box you carry around in your head.",
  },
  {
    id: "g5",
    title: "Metaphor: ReFantazio",
    genre: "Fantasy RPG",
    year: "2024",
    platform: "PS5 / Xbox / PC",
    friendsLogged: 14,
    accent: ["#24191c", "#82484f"],
    coverUri: createCoverArt("Metaphor", "#21161a", "#7a434c", "#f3c98b", "FANTASY PRESTIGE"),
    blurb: "Big ideas, bolder UI, and exactly the kind of theatrical worldbuilding logg should spotlight.",
  },
  {
    id: "g6",
    title: "Cyberpunk 2077",
    genre: "Sci-fi RPG",
    year: "2023",
    platform: "PS5 / Xbox / PC",
    friendsLogged: 26,
    accent: ["#151924", "#c08120"],
    coverUri: createCoverArt("Cyberpunk", "#11151f", "#8f6d1d", "#7bd4f6", "CITY ODYSSEY"),
    blurb: "A maximalist city fantasy with some of the strongest environmental mood in games.",
  },
  {
    id: "g7",
    title: "Death Stranding 2",
    genre: "Cinematic Adventure",
    year: "2025",
    platform: "PS5",
    friendsLogged: 9,
    accent: ["#1c2028", "#55687f"],
    coverUri: createCoverArt("Death Stranding 2", "#191d24", "#546579", "#d7b7a0", "CINEMATIC JOURNEY"),
    blurb: "High-concept, atmospheric, and exactly the kind of conversation-starter a social log should amplify.",
  },
  {
    id: "g8",
    title: "Balatro",
    genre: "Deckbuilder",
    year: "2024",
    platform: "Console / Mobile / PC",
    friendsLogged: 22,
    accent: ["#1e1626", "#70354a"],
    coverUri: createCoverArt("Balatro", "#1b1422", "#6a3348", "#f0d38a", "COMPELLED LOOP"),
    blurb: "A tiny game with dangerous gravity. Perfect for quick logs and replay chatter.",
  },
];

export const userSeed: UserItem[] = [
  { id: "u1", name: "Mia Chen", handle: "@miaxplay", favorite: "JRPGs", avatar: "MC" },
  { id: "u2", name: "Theo Park", handle: "@tpixel", favorite: "Indies", avatar: "TP" },
  { id: "u3", name: "Jules Rivera", handle: "@juleslogs", favorite: "Narrative", avatar: "JR" },
  { id: "u4", name: "Ari Shah", handle: "@arish", favorite: "Soulslikes", avatar: "AS" },
  { id: "u5", name: "Lena Ford", handle: "@lenaframe", favorite: "Art direction", avatar: "LF" },
  { id: "u6", name: "Noah Bell", handle: "@noahbell", favorite: "Immersive sims", avatar: "NB" },
  { id: "u7", name: "Sana Iqbal", handle: "@sanalogs", favorite: "Mood indies", avatar: "SI" },
  { id: "u8", name: "Marcus Vale", handle: "@mvale", favorite: "Action combat", avatar: "MV" },
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

export const featuredGameIds = ["g1", "g5", "g7", "g8"];
