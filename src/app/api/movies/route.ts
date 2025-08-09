import { NextRequest, NextResponse } from 'next/server';
import { fetchPopularMovies, searchMovies, fetchMoviesByGenre } from '@/lib/tmdb-api';
import type { Video } from '@/lib/video';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const genre = searchParams.get('genre');
  const page = parseInt(searchParams.get('page') || '1');

  try {
    let movies: Video[];

    if (query) {
      // Search movies
      movies = await searchMovies(query, page);
    } else if (genre) {
      // Get movies by genre
      const genreMap: Record<string, number> = {
        'horror': 27,
        'comedy': 35,
        'sci-fi': 878,
        'action': 28,
        'drama': 18,
      };
      const genreId = genreMap[genre] || 18; // Default to drama
      movies = await fetchMoviesByGenre(genreId, page);
    } else {
      // Get popular movies
      movies = await fetchPopularMovies(page);
    }

    return NextResponse.json({ movies, success: true });
  } catch (error) {
    console.error('Error in movies API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movies', success: false },
      { status: 500 }
    );
  }
}