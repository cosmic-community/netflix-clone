// app/tv-shows/[slug]/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic'
import { TVShow } from '@/types'
import { notFound } from 'next/navigation'
import ContentDetails from '@/components/ContentDetails'

async function getTVShow(slug: string): Promise<TVShow | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'tv-shows',
        slug: slug
      })
      .depth(2)
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object as TVShow;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export default async function TVShowPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tvShow = await getTVShow(slug);

  if (!tvShow) {
    notFound();
  }

  return <ContentDetails content={tvShow} />;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tvShow = await getTVShow(slug);

  if (!tvShow) {
    return {
      title: 'TV Show Not Found'
    };
  }

  return {
    title: `${tvShow.metadata?.title || tvShow.title} - Netflix Clone`,
    description: tvShow.metadata?.description || 'Watch this amazing TV show on Netflix Clone'
  };
}