import { Genre } from '@/types'

interface GenreBadgeProps {
  genre: Genre
}

export default function GenreBadge({ genre }: GenreBadgeProps) {
  const name = genre.metadata?.name || genre.title
  const color = genre.metadata?.color || '#666666'

  return (
    <span 
      className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
      style={{ backgroundColor: color }}
    >
      {name}
    </span>
  )
}