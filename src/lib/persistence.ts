const STORAGE_KEY = "logg-prototype-state-v1";

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
    return raw ? (JSON.parse(raw) as PersistedPrototypeState) : null;
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
