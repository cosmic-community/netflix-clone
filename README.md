# Netflix Clone

![Netflix Clone Preview](https://imgix.cosmicjs.com/38e35010-74d6-11f0-a051-23c10f41277a-photo-1446776653964-20c1d3a81b06-1754712387022.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern Netflix-inspired streaming platform built with Next.js that showcases your movies and TV shows from Cosmic CMS. Features a sleek interface with hero sections, content carousels, and detailed content pages.

## ✨ Features

- **Hero Featured Content**: Dynamic hero section with featured movies and shows
- **Content Carousels**: Horizontal scrolling rows for different content categories
- **Search & Filtering**: Advanced search by title, genre, and cast members
- **Detailed Content Pages**: Individual movie and TV show pages with cast info
- **Cast Profiles**: Dedicated pages for cast members with filmography
- **Genre Categories**: Browse content by genre with color-coded tags
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Netflix Theme**: Authentic Netflix-inspired dark interface

## 🚀 Clone this Bucket

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=6896c8ef2987c1a81b77a81d&clone_repository=6896ca0f2987c1a81b77a836)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Build a Netflix clone

### Code Generation Prompt

> Build a Nextflix clone using Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **React Icons** - Icon library
- **Lucide React** - Additional icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the cloned bucket

### Installation

1. Clone this repository
```bash
git clone <repository-url>
cd netflix-clone
```

2. Install dependencies
```bash
bun install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Add your Cosmic credentials:
- `COSMIC_BUCKET_SLUG`: Your bucket slug
- `COSMIC_READ_KEY`: Your bucket read key
- `COSMIC_WRITE_KEY`: Your bucket write key (optional)

4. Run the development server
```bash
bun dev
```

Visit `http://localhost:3000` to see your Netflix clone.

## 📖 Cosmic SDK Examples

### Fetch All Movies
```typescript
import { cosmic } from '@/lib/cosmic'

const movies = await cosmic.objects
  .find({ type: 'movies' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetch Featured Content
```typescript
const featuredContent = await cosmic.objects
  .find({ 
    type: 'movies',
    'metadata.featured': true 
  })
  .limit(5)
  .depth(1)
```

### Search Content
```typescript
const searchResults = await cosmic.objects
  .find({
    $or: [
      { type: 'movies' },
      { type: 'tv-shows' }
    ],
    title: { $regex: searchQuery, $options: 'i' }
  })
  .depth(1)
```

## 🎬 Cosmic CMS Integration

This application integrates with four main Cosmic object types:

### Movies
- Title, description, release year, duration
- Rating, genres, cast members
- Poster and background images
- Trailer videos and featured status

### TV Shows
- Title, description, first air date
- Status, seasons, rating
- Genres, cast members
- Episode information and featured status

### Cast Members
- Name, bio, birth date
- Profile photos and role types
- Connected to movies and TV shows

### Genres
- Name, description, color coding
- Connected to content for categorization

## 🚀 Deployment Options

### Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/your-repo/netflix-clone)

### Deploy to Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-repo/netflix-clone)

### Environment Variables for Production

Set these environment variables in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY` 
- `COSMIC_WRITE_KEY` (optional)

<!-- README_END -->