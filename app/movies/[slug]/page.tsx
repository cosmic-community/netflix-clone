// app/movies/[slug]/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic'
import { Movie } from '@/types'
import { notFound } from 'next/navigation'
import ContentDetails from '@/components/ContentDetails'

async function getMovie(slug: string): Promise<Movie | null> {
  try {
    console.log(`Fetching movie with slug: ${slug}`);
    
    const response = await cosmic.objects
      .findOne({
        type: 'movies',
        slug: slug
      })
      .depth(2)
      .props(['id', 'title', 'slug', 'metadata', 'status']);
    
    console.log('Movie response:', response);
    
    if (!response.object) {
      console.log('No movie object found in response');
      return null;
    }
    
    return response.object as Movie;
  } catch (error: any) {
    console.error('Error fetching movie:', error);
    
    if (hasStatus(error) && error.status === 404) {
      console.log('Movie not found (404)');
      return null;
    }
    
    // Re-throw other errors
    throw error;
  }
}

export default async function MoviePage({ params }: { params: Promise<{ slug: string }> }) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params;
  
  console.log(`Movie page requested for slug: ${slug}`);
  
  const movie = await getMovie(slug);
  
  if (!movie) {
    console.log(`Movie not found for slug: ${slug}`);
    notFound();
  }
  
  console.log('Rendering movie:', movie.title);
  
  return <ContentDetails content={movie} />;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params;
  const movie = await getMovie(slug);

  if (!movie) {
    return {
      title: 'Movie Not Found - Netflix Clone'
    };
  }

  const title = movie.metadata?.title || movie.title;
  const description = movie.metadata?.description || 'Watch this amazing movie on Netflix Clone';

  return {
    title: `${title} - Netflix Clone`,
    description: description
  };
}