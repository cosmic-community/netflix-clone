import { Content, isMovie } from '@/types'
import ContentCard from '@/components/ContentCard'

interface ContentRowProps {
  title: string
  content: Content[]
}

export default function ContentRow({ title, content }: ContentRowProps) {
  if (content.length === 0) {
    return null
  }

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">{title}</h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide pb-4">
        {content.map((item) => (
          <ContentCard 
            key={item.id} 
            content={item}
            href={`${isMovie(item) ? '/movies' : '/tv-shows'}/${item.slug}`}
          />
        ))}
      </div>
    </div>
  )
}