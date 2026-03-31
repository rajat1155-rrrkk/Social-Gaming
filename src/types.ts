export type TabKey = "feed" | "search" | "log" | "profile";
export type Rating = 1 | 2 | 3 | 4 | 5;

export type ActivityItem = {
  id: string;
  user: string;
  handle: string;
  action: string;
  game: string;
  rating: Rating;
  note: string;
  time: string;
  status?: "playing" | "finished" | "replaying" | "wishlist";
};

export type GameItem = {
  id: string;
  title: string;
  genre: string;
  year: string;
  platform: string;
  friendsLogged: number;
  accent: [string, string];
  coverUri: string;
  blurb: string;
};

export type UserItem = {
  id: string;
  name: string;
  handle: string;
  favorite: string;
  avatar: string;
};

export type Profile = {
  name: string;
  handle: string;
  bio: string;
  vibe: string;
};
