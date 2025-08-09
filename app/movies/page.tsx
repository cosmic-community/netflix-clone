import { cosmic, hasStatus } from '@/lib/cosmic'
import { Movie } from '@/types'
import ContentGrid from '@/components/ContentGrid'

async function getMovies(): Promise<Movie[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'movies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Movie[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching movies:', error);
    return [];
  }
}

export default async function MoviesPage() {
  const movies = await getMovies();

  return (
    <div className="min-h-screen pt-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-white">Movies</h1>
        <ContentGrid content={movies} />
      </div>
    </div>
  )
}