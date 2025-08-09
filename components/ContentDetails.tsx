import { Content, isMovie, isTVShow } from '@/types'
import { Play, Info, Star } from 'lucide-react'
import GenreBadge from '@/components/GenreBadge'
import CastGrid from '@/components/CastGrid'
import EpisodeList from '@/components/EpisodeList'

interface ContentDetailsProps {
  content: Content
}

export default function ContentDetails({ content }: ContentDetailsProps) {
  const backgroundImage = content.metadata?.background_image?.imgix_url || content.metadata?.poster_image?.imgix_url
  const posterImage = content.metadata?.poster_image?.imgix_url
  const title = content.metadata?.title || content.title
  const description = content.metadata?.description
  const rating = content.metadata?.rating?.value
  const genres = content.metadata?.genres || []
  const cast = content.metadata?.cast || []

  const getYear = () => {
    if (isMovie(content)) {
      return content.metadata?.release_year
    } else if (isTVShow(content)) {
      return content.metadata?.first_air_date ? new Date(content.metadata.first_air_date).getFullYear() : null
    }
    return null
  }

  const getDuration = () => {
    if (isMovie(content)) {
      const duration = content.metadata?.duration
      return duration ? `${Math.floor(duration / 60)}h ${duration % 60}m` : null
    } else if (isTVShow(content)) {
      const seasons = content.metadata?.seasons
      return seasons ? `${seasons} Season${seasons > 1 ? 's' : ''}` : null
    }
    return null
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-screen">
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImage}?w=1920&h=1080&fit=crop&auto=format,compress)`
            }}
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        
        <div className="relative z-10 flex items-center h-full px-4 md:px-8 lg:px-16">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-6 md:space-y-0 md:space-x-8 max-w-6xl">
            {/* Poster */}
            {posterImage && (
              <div className="flex-none">
                <img
                  src={`${posterImage}?w=400&h=600&fit=crop&auto=format,compress`}
                  alt={title}
                  className="w-48 md:w-64 rounded-lg shadow-2xl"
                  width={256}
                  height={384}
                />
              </div>
            )}
            
            {/* Content Info */}
            <div className="flex-1 max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow">
                {title}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6 text-gray-300">
                {getYear() && <span>{getYear()}</span>}
                {rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span>{rating}</span>
                  </div>
                )}
                {getDuration() && <span>{getDuration()}</span>}
              </div>
              
              {description && (
                <p className="text-lg leading-relaxed mb-6 text-gray-200 text-shadow">
                  {description}
                </p>
              )}
              
              {genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {genres.map((genre) => (
                    <GenreBadge key={genre.id} genre={genre} />
                  ))}
                </div>
              )}
              
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 transition-colors font-semibold">
                  <Play className="w-5 h-5 fill-current" />
                  <span>Play</span>
                </button>
                
                <button className="flex items-center space-x-2 bg-gray-600/70 text-white px-8 py-3 rounded hover:bg-gray-600/50 transition-colors font-semibold backdrop-blur-sm">
                  <Info className="w-5 h-5" />
                  <span>My List</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Details Section */}
      <div className="relative z-10 bg-black px-4 md:px-8 lg:px-16 py-12 space-y-12">
        {/* Cast */}
        {cast.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-white">Cast</h2>
            <CastGrid cast={cast} />
          </section>
        )}
        
        {/* Episodes (TV Shows only) */}
        {isTVShow(content) && content.metadata?.episodes_info && (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-white">Episodes</h2>
            <EpisodeList episodes={content.metadata.episodes_info} />
          </section>
        )}
      </div>
    </div>
  )
}