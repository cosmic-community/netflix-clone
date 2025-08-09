import { Content, isMovie, isTVShow } from '@/types'
import { Play, Info } from 'lucide-react'
import Link from 'next/link'

interface HeroSectionProps {
  content: Content
}

export default function HeroSection({ content }: HeroSectionProps) {
  const backgroundImage = content.metadata?.background_image?.imgix_url || content.metadata?.poster_image?.imgix_url
  const title = content.metadata?.title || content.title
  const description = content.metadata?.description
  const linkPrefix = isMovie(content) ? '/movies' : '/tv-shows'

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage}?w=1920&h=1080&fit=crop&auto=format,compress)`
          }}
        />
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow">
            {title}
          </h1>
          
          {description && (
            <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed text-shadow">
              {description.length > 200 ? `${description.substring(0, 200)}...` : description}
            </p>
          )}
          
          <div className="flex items-center space-x-4">
            <Link 
              href={`${linkPrefix}/${content.slug}`}
              className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 transition-colors font-semibold"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Play</span>
            </Link>
            
            <Link 
              href={`${linkPrefix}/${content.slug}`}
              className="flex items-center space-x-2 bg-gray-600/70 text-white px-8 py-3 rounded hover:bg-gray-600/50 transition-colors font-semibold backdrop-blur-sm"
            >
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}