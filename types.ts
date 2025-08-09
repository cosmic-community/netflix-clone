// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status: string;
  thumbnail?: string;
  published_at: string;
  bucket: string;
  created_by: string;
  modified_by: string;
}

// Movie interface
export interface Movie extends CosmicObject {
  type: 'movies';
  metadata: {
    title?: string;
    description?: string;
    release_year?: number;
    duration?: number;
    rating?: {
      key: string;
      value: string;
    };
    genres?: Genre[];
    cast?: CastMember[];
    poster_image?: {
      url: string;
      imgix_url: string;
    };
    background_image?: {
      url: string;
      imgix_url: string;
    };
    trailer_video?: {
      url: string;
    } | null;
    featured?: boolean;
  };
}

// TV Show interface
export interface TVShow extends CosmicObject {
  type: 'tv-shows';
  metadata: {
    title?: string;
    description?: string;
    first_air_date?: string;
    show_status?: {
      key: string;
      value: string;
    };
    seasons?: number;
    rating?: {
      key: string;
      value: string;
    };
    genres?: Genre[];
    cast?: CastMember[];
    poster_image?: {
      url: string;
      imgix_url: string;
    };
    background_image?: {
      url: string;
      imgix_url: string;
    };
    episodes_info?: EpisodeInfo[];
    featured?: boolean;
  };
}

// Genre interface
export interface Genre extends CosmicObject {
  type: 'genres';
  metadata: {
    name?: string;
    description?: string;
    color?: string;
  };
}

// Cast Member interface
export interface CastMember extends CosmicObject {
  type: 'cast-members';
  metadata: {
    name?: string;
    bio?: string;
    birth_date?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    role_type?: {
      key: string;
      value: string;
    };
  };
}

// Episode info structure
export interface EpisodeInfo {
  season: number;
  episodes: Episode[];
}

export interface Episode {
  title: string;
  duration: number;
  description: string;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Union type for all content
export type Content = Movie | TVShow;

// Type guards
export function isMovie(obj: CosmicObject): obj is Movie {
  return obj.type === 'movies';
}

export function isTVShow(obj: CosmicObject): obj is TVShow {
  return obj.type === 'tv-shows';
}

export function isGenre(obj: CosmicObject): obj is Genre {
  return obj.type === 'genres';
}

export function isCastMember(obj: CosmicObject): obj is CastMember {
  return obj.type === 'cast-members';
}

// Rating types
export type MovieRating = 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
export type TVRating = 'TV-G' | 'TV-PG' | 'TV-14' | 'TV-MA';
export type ShowStatus = 'ongoing' | 'ended' | 'cancelled';
export type RoleType = 'actor' | 'director' | 'producer' | 'writer';