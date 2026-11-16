export type Theme = "light" | "dark" | "rose-pine";

export type LinkType =
  | "youtube"
  | "lastfm"
  | "general"
  | "gitlab"
  | "plain"
  | "player-alts"
  | "player-art"
  | "player-title";

export type Language = {
  name: string;
  description: string;
  supportedOS: string[];
};

export type Computer = {
  brand: string;
  model: string;
  operatingSystem?: string;
  price: number;
  description: string;
  url?: string;
  parts?: ComputerParts[];
};

export type ComputerParts = {
  brand: string;
  model: string;
  price: number;
};

export type NetworkingDevice = {
  brand: string;
  model: string;
  description: string;
  price: number;
  url?: string;
};

export type Software = {
  name: string;
  description: string;
  supportedOS: string[];
};

export type Food = {
  foodName: string;
  countryOfOrigin: string;
  woolworthsLink?: string;
};

/** A table cell is either plain text or a link. */
export type Cell = string | { href: string; label: string };

export type Column<T> = {
  header: string;
  accessor: (item: T) => Cell;
};

export type Song = {
  artist: string;
  title: string;
  album: string;
  url: string;
  image: string;
  nowPlaying: boolean;
};

export type Track = {
  artist: { "#text": string };
  name: string;
  album: { "#text": string };
  url: string;
  image: { size: string; "#text": string }[];
  "@attr"?: { nowplaying: string };
};

export type LastFmResponse = {
  recenttracks?: {
    track: Track[];
  };
};

export type Repo = {
  name: string;
  id: number;
  path_with_namespace: string;
  first_commit_at: string;
  topics: string[];
  created_at: string;
  star_count: number;
  last_activity_at: string;
  description: string;
  web_url: string;
  language?: string;
};

export type LanguageData = Record<string, number>;

export type SortType =
  | "last_committed"
  | "first_committed"
  | "a_z"
  | "z_a"
  | "newest"
  | "oldest";

export type PageMeta = {
  title: string;
  writer: string;
  tags?: string[];
  summary: string;
  date?: string;
  readTime?: string | number;
  lastRevisionDate?: string;
  img?: string;
};

export type PageEntry = {
  slug: string;
  meta: PageMeta;
};
