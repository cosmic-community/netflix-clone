export interface CosmicFile {
  url: string
  imgix_url: string
}

export interface SelectOption {
  key: string
  value: string
}

export interface Genre {
  id: string
  slug: string
  title: string
  metadata: {
    name: string
    description: string
    color: string
  }
}

export interface CastMember {
  id: string
  slug: string
  title: string
  metadata: {
    name: string
    bio: string
    birth_date: string
    profile_photo: CosmicFile
    role_type: SelectOption
  }
}

export interface Movie {
  id: string
  title: string
  slug: string
  metadata: {
    title: string
    description: string
    release_year: number
    duration: number
    rating: SelectOption
    genres: Genre[]
    cast: CastMember[]
    poster_image: CosmicFile
    background_image?: CosmicFile
    trailer_video?: CosmicFile
    featured: boolean
  }
}

export interface Episode {
  title: string
  duration: number
  description: string
}

export interface Season {
  season: number
  episodes: Episode[]
}

export interface TVShow {
  id: string
  title: string
  slug: string
  metadata: {
    title: string
    description: string
    first_air_date: string
    show_status: SelectOption
    seasons: number
    rating: SelectOption
    genres: Genre[]
    cast: CastMember[]
    poster_image: CosmicFile
    background_image?: CosmicFile
    episodes_info: Season[]
    featured: boolean
  }
}

export type Content = Movie | TVShow

export function isMovie(content: Content): content is Movie {
  return 'release_year' in content.metadata
}

export function isTVShow(content: Content): content is TVShow {
  return 'first_air_date' in content.metadata
}