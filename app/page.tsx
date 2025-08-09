import { cosmic, hasStatus } from '@/lib/cosmic'
import { Movie, TVShow, Content } from '@/types'
import HeroSection from '@/components/HeroSection'
import ContentRow from '@/components/ContentRow'

async function getFeaturedContent(): Promise<Content[]> {
  try {
    const [moviesResponse, showsResponse] = await Promise.all([
      cosmic.objects.find({
        type: 'movies',
        'metadata.featured': true
      }).props(['id', 'title', 'slug', 'metadata']).depth(1),
      cosmic.objects.find({
        type: 'tv-shows',
        'metadata.featured': true
      }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    ]);

    const allFeatured = [
      ...moviesResponse.objects as Movie[],
      ...showsResponse.objects as TVShow[]
    ];

    return allFeatured;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching featured content:', error);
    return [];
  }
}

async function getMovies(): Promise<Movie[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'movies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(10);
    
    return response.objects as Movie[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching movies:', error);
    return [];
  }
}

async function getTVShows(): Promise<TVShow[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'tv-shows' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(10);
    
    return response.objects as TVShow[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching TV shows:', error);
    return [];
  }
}

export default async function HomePage() {
  const [featuredContent, movies, tvShows] = await Promise.all([
    getFeaturedContent(),
    getMovies(),
    getTVShows()
  ]);

  const heroContent = featuredContent.length > 0 ? featuredContent[0] : (movies.length > 0 ? movies[0] : tvShows[0]);

  return (
    <div className="relative">
      {heroContent && <HeroSection content={heroContent} />}
      
      <div className="relative z-10 -mt-32 space-y-8 pb-20">
        {movies.length > 0 && (
          <ContentRow title="Popular Movies" content={movies} />
        )}
        
        {tvShows.length > 0 && (
          <ContentRow title="TV Shows" content={tvShows} />
        )}
        
        {featuredContent.length > 0 && (
          <ContentRow title="Featured Content" content={featuredContent} />
        )}
      </div>
    </div>
  )
}