import { Content, isMovie, isTVShow } from '@/types'
import Link from 'next/link'

interface ContentCardProps {
  content: Content
  href: string
}

export default function ContentCard({ content, href }: ContentCardProps) {
  const posterImage = content.metadata?.poster_image?.imgix_url
  const title = content.metadata?.title || content.title
  
  // Get additional info based on content type
  const getSubtitle = () => {
    if (isMovie(content)) {
      const year = content.metadata?.release_year
      const rating = content.metadata?.rating?.value
      return year && rating ? `${year} • ${rating}` : year || rating || ''
    } else if (isTVShow(content)) {
      const seasons = content.metadata?.seasons
      const rating = content.metadata?.rating?.value
      const seasonsText = seasons ? `${seasons} Season${seasons > 1 ? 's' : ''}` : ''
      return rating && seasonsText ? `${seasonsText} • ${rating}` : seasonsText || rating || ''
    }
    return ''
  }

  return (
    <Link href={href} className="group flex-none w-48 md:w-64">
      <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
        {posterImage ? (
          <img
            src={`${posterImage}?w=400&h=600&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-72 md:h-96 object-cover"
            width={256}
            height={384}
          />
        ) : (
          <div className="w-full h-72 md:h-96 bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </div>
      
      <div className="mt-2">
        <h3 className="text-white font-medium text-sm md:text-base truncate">
          {title}
        </h3>
        {getSubtitle() && (
          <p className="text-gray-400 text-xs md:text-sm">
            {getSubtitle()}
          </p>
        )}
      </div>
    </Link>
  )
}