import { cosmic, hasStatus } from '@/lib/cosmic'
import { TVShow } from '@/types'
import ContentGrid from '@/components/ContentGrid'

async function getTVShows(): Promise<TVShow[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'tv-shows' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as TVShow[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching TV shows:', error);
    return [];
  }
}

export default async function TVShowsPage() {
  const tvShows = await getTVShows();

  return (
    <div className="min-h-screen pt-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-white">TV Shows</h1>
        <ContentGrid content={tvShows} />
      </div>
    </div>
  )
}