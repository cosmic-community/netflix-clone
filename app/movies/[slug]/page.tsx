// app/movies/[slug]/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic'
import { Movie } from '@/types'
import { notFound } from 'next/navigation'
import ContentDetails from '@/components/ContentDetails'

async function getMovie(slug: string): Promise<Movie | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'movies',
        slug: slug
      })
      .depth(2)
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object as Movie;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export default async function MoviePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const movie = await getMovie(slug);

  if (!movie) {
    notFound();
  }

  return <ContentDetails content={movie} />;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const movie = await getMovie(slug);

  if (!movie) {
    return {
      title: 'Movie Not Found'
    };
  }

  return {
    title: `${movie.metadata?.title || movie.title} - Netflix Clone`,
    description: movie.metadata?.description || 'Watch this amazing movie on Netflix Clone'
  };
}