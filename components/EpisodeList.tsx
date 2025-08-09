import { Season } from '@/types'

interface EpisodeListProps {
  episodes: Season[]
}

export default function EpisodeList({ episodes }: EpisodeListProps) {
  if (!episodes || episodes.length === 0) {
    return (
      <p className="text-gray-400">No episode information available</p>
    )
  }

  return (
    <div className="space-y-8">
      {episodes.map((seasonInfo) => (
        <div key={seasonInfo.season}>
          <h3 className="text-xl font-semibold mb-4 text-white">
            Season {seasonInfo.season}
          </h3>
          
          <div className="space-y-4">
            {seasonInfo.episodes.map((episode, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-2">
                      {index + 1}. {episode.title}
                    </h4>
                    <p className="text-gray-300 text-sm mb-2">
                      {episode.description}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {episode.duration} minutes
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}