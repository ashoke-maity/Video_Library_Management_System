# Movie API Integration Setup Guide

## Overview
This guide shows how to integrate real movie/video APIs into your Video Library Management System. The system supports **TMDb (The Movie Database)** as the primary API with fallback to mock data.

## 🚀 Quick Setup

### 1. Get TMDb API Key (FREE)
1. Go to [TMDb Website](https://www.themoviedb.org/)
2. Create a free account
3. Go to **Settings > API**
4. Request an API key (choose "Developer" option)
5. Copy your API key

### 2. Configure Environment Variables
1. Copy the example environment file:
   ```bash
   Copy-Item .env.local.example .env.local
   ```
2. Edit `.env.local` and add your API key:
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_actual_api_key_here
   ```

### 3. Install and Run
```bash
npm install
npm run dev
```

## 📁 Files Created/Modified

### New API Files:
- `src/lib/tmdb-api.ts` - TMDb API integration functions
- `src/lib/api-client.ts` - Client-side API utility functions
- `src/app/api/movies/route.ts` - Server-side API route for movies list
- `src/app/api/movies/[id]/route.ts` - Server-side API route for single movie

### Modified Files:
- `src/app/videos/[id]/page.tsx` - Updated to use API with fallback to mock data

## 🔄 How It Works

### Data Flow:
1. **Client requests data** → API Client functions
2. **API Client** → Next.js API Routes (server-side)
3. **API Routes** → TMDb API (external)
4. **Fallback** → Mock data if API fails or no key provided

### Automatic Fallback:
- If no API key is provided, uses mock data
- If API request fails, falls back to mock data
- Seamless user experience regardless of API availability

## 🎯 Usage Examples

### Get Popular Movies:
```typescript
import { fetchPopularMovies } from '@/lib/api-client';

const movies = await fetchPopularMovies();
```

### Search Movies:
```typescript
import { searchMovies } from '@/lib/api-client';

const results = await searchMovies('Inception');
```

### Get Movie by ID:
```typescript
import { fetchMovieById } from '@/lib/api-client';

const movie = await fetchMovieById('12345');
```

## 🔧 Updating Other Pages

### Main Page (src/app/page.tsx)
Replace mock data usage with API calls:

```typescript
// OLD (using mock data):
const filteredVideos = mockVideos.filter(...)

// NEW (using API):
import { fetchMovies, fetchPopularMovies } from '@/lib/api-client';

const [videos, setVideos] = useState<Video[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const loadVideos = async () => {
    setIsLoading(true);
    const data = searchQuery 
      ? await fetchMovies({ query: searchQuery, genre: selectedGenre })
      : await fetchPopularMovies();
    setVideos(data);
    setIsLoading(false);
  };
  
  loadVideos();
}, [searchQuery, selectedGenre]);
```

### Component Updates:
Replace `mockVideos` imports with API calls in:
- Video grid components
- Search components
- Filter components

## 🎛️ API Configuration Options

### TMDb API Features Available:
- ✅ Popular movies
- ✅ Movie search
- ✅ Movies by genre
- ✅ Movie details
- ✅ High-quality posters/thumbnails
- ✅ Comprehensive metadata (rating, year, duration, etc.)

### Rate Limits:
- **Free Tier**: 40 requests/10 seconds, 1,000 requests/day
- **Paid Tier**: Higher limits available

## 🚨 Important Notes

### Security:
- API key is exposed client-side (NEXT_PUBLIC_*)
- For production, consider server-side only API calls
- Current setup is suitable for development/demo

### Performance:
- API responses are not cached by default
- Consider adding caching for production use
- Images are served from TMDb CDN

### Genre Mapping:
The system maps TMDb genres to your custom genres:
- Horror (27) → 'horror'
- Comedy (35) → 'comedy' 
- Science Fiction (878) → 'sci-fi'
- Action (28) → 'action'
- Drama (18) → 'drama'

## 🔄 Alternative APIs

If you prefer other APIs, you can easily swap TMDb for:

### OMDb API (http://www.omdbapi.com/)
- 1,000 requests/day free
- Focus on movie metadata
- IMDb integration

### TVMaze API (https://www.tvmaze.com/api)
- Completely free, no limits
- Excellent for TV shows
- Simple REST API

### Implementation:
1. Create new API integration file (similar to `tmdb-api.ts`)
2. Update the API client functions
3. Modify the conversion functions for your Video interface

## 🐛 Troubleshooting

### Common Issues:
1. **"Video not found"** → Check API key configuration
2. **No images showing** → Verify CORS and image URLs
3. **API rate limits** → Implement caching or upgrade plan
4. **Missing data** → Check API response format and conversion function

### Debug Steps:
1. Check browser console for API errors
2. Verify `.env.local` file exists and has correct key
3. Test API key directly: `https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY`
4. Check Network tab in browser dev tools

## 📚 Next Steps

1. **Set up your API key** following step 1-2 above
2. **Test the integration** by visiting a video detail page
3. **Update main page** to use API data instead of mock data
4. **Add caching** for better performance
5. **Consider server-side rendering** for SEO benefits

The system is designed to work seamlessly with or without the API integration!