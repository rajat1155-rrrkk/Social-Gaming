const STORAGE_KEY = "logg-prototype-state-v2";

export type PersistedPrototypeState = {
  signedIn: boolean;
  profile: {
    name: string;
    handle: string;
    bio: string;
    vibe: string;
  };
  activity: Array<{
    id: string;
    user: string;
    handle: string;
    action: string;
    game: string;
    rating: number;
    note: string;
    time: string;
    status?: "playing" | "finished" | "replaying" | "wishlist";
  }>;
  followedHandles: string[];
};

export function loadPrototypeState(): PersistedPrototypeState | null {
  if (typeof localStorage === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as PersistedPrototypeState;
    const normalizedName = parsed.profile.name.trim().toLowerCase();
    const normalizedHandle = parsed.profile.handle.trim().toLowerCase();

    if (normalizedName.includes("rajat") || normalizedHandle === "@rajat") {
      return {
        ...parsed,
        profile: {
          ...parsed.profile,
          name: "Cosmic Otter",
          handle: "@cosmicotter",
          bio: "I log games for color bursts, combat snap, and scenes weird enough to text friends about.",
          vibe: "Chaotic delight, sparkle quests, and dramatic finales",
        },
      };
    }

    return parsed;
  } catch {
    return null;
  }
}

export function savePrototypeState(state: PersistedPrototypeState) {
  if (typeof localStorage === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage failures so the prototype still works.
  }
}
