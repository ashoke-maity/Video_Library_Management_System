// Client-side API functions for fetching data from your API routes
import type { Video } from './video';

const API_BASE = '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface MoviesApiResponse {
  movies: Video[];
  success: boolean;
  error?: string;
}

interface MovieApiResponse {
  movie: Video;
  success: boolean;
  error?: string;
}

// Fetch movies from your API routes
export async function fetchMovies(params: {
  query?: string;
  genre?: string;
  page?: number;
} = {}): Promise<Video[]> {
  try {
    const searchParams = new URLSearchParams();
    
    if (params.query) searchParams.append('query', params.query);
    if (params.genre && params.genre !== 'all') searchParams.append('genre', params.genre);
    if (params.page) searchParams.append('page', params.page.toString());

    const response = await fetch(`${API_BASE}/movies?${searchParams.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data: MoviesApiResponse = await response.json();
    return data.movies || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

// Fetch single movie by ID
export async function fetchMovieById(id: string): Promise<Video | null> {
  try {
    const response = await fetch(`${API_BASE}/movies/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch movie');
    }

    const data: MovieApiResponse = await response.json();
    return data.movie || null;
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    return null;
  }
}

// Search movies
export async function searchMovies(query: string, page: number = 1): Promise<Video[]> {
  return fetchMovies({ query, page });
}

// Get movies by genre
export async function fetchMoviesByGenre(genre: string, page: number = 1): Promise<Video[]> {
  return fetchMovies({ genre, page });
}

// Get popular movies
export async function fetchPopularMovies(page: number = 1): Promise<Video[]> {
  return fetchMovies({ page });
}