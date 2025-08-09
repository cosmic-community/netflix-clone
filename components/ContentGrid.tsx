import { Content, isMovie } from '@/types'
import ContentCard from '@/components/ContentCard'

interface ContentGridProps {
  content: Content[]
}

export default function ContentGrid({ content }: ContentGridProps) {
  if (content.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-lg">No content available</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {content.map((item) => (
        <ContentCard 
          key={item.id} 
          content={item}
          href={`${isMovie(item) ? '/movies' : '/tv-shows'}/${item.slug}`}
        />
      ))}
    </div>
  )
}