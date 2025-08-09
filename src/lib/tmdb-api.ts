// TMDb API integration
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// You need to get this API key from https://www.themoviedb.org/settings/api
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';

export interface TMDbMovie {
  id: number;
  title: string;
  overview: string;
  genre_ids: number[];
  release_date: string;
  runtime?: number;
  vote_average: number;
  popularity: number;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface TMDbGenre {
  id: number;
  name: string;
}

export interface TMDbMoviesResponse {
  results: TMDbMovie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export interface TMDbGenresResponse {
  genres: TMDbGenre[];
}

// Convert TMDb movie to your Video format
export function convertTMDbToVideo(tmdbMovie: TMDbMovie, genreMap: Record<number, string> = {}): import('./video').Video {
  // Map TMDb genres to your genre types
  const genreMapping: Record<string, import('./video').Genre> = {
    'Horror': 'horror',
    'Comedy': 'comedy',
    'Science Fiction': 'sci-fi',
    'Action': 'action',
    'Drama': 'drama',
  };

  const primaryGenre = tmdbMovie.genre_ids[0];
  const genreName = genreMap[primaryGenre] || 'drama';
  const mappedGenre = genreMapping[genreName] || 'drama';

  return {
    id: tmdbMovie.id.toString(),
    title: tmdbMovie.title,
    description: tmdbMovie.overview,
    genre: mappedGenre,
    year: new Date(tmdbMovie.release_date).getFullYear(),
    duration: tmdbMovie.runtime ? `${Math.floor(tmdbMovie.runtime / 60)}h ${tmdbMovie.runtime % 60}m` : '2h 0m',
    rating: Math.round(tmdbMovie.vote_average * 10) / 10,
    watchCount: Math.floor(tmdbMovie.popularity * 100),
    dateAdded: new Date().toISOString().split('T')[0],
    coverColor: '#1a1a1a', // Default color, you can generate based on poster
    thumbnailUrl: tmdbMovie.poster_path ? `${TMDB_IMAGE_BASE_URL}${tmdbMovie.poster_path}` : undefined,
    posterUrl: tmdbMovie.poster_path ? `${TMDB_IMAGE_BASE_URL}${tmdbMovie.poster_path}` : undefined,
    backdropUrl: tmdbMovie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${tmdbMovie.backdrop_path}` : undefined,
  };
}

// Fetch popular movies
export async function fetchPopularMovies(page: number = 1): Promise<import('./video').Video[]> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data: TMDbMoviesResponse = await response.json();
    
    // Fetch genres to map them
    const genresResponse = await fetch(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
    );
    const genresData: TMDbGenresResponse = await genresResponse.json();
    const genreMap = genresData.genres.reduce((acc: Record<number, string>, genre: TMDbGenre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {} as Record<number, string>);

    return data.results.map((movie: TMDbMovie) => convertTMDbToVideo(movie, genreMap));
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

// Search movies
export async function searchMovies(query: string, page: number = 1): Promise<import('./video').Video[]> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search movies');
    }

    const data: TMDbMoviesResponse = await response.json();
    
    // Fetch genres to map them
    const genresResponse = await fetch(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
    );
    const genresData: TMDbGenresResponse = await genresResponse.json();
    const genreMap = genresData.genres.reduce((acc: Record<number, string>, genre: TMDbGenre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {} as Record<number, string>);

    return data.results.map((movie: TMDbMovie) => convertTMDbToVideo(movie, genreMap));
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
}

// Get movie by ID
export async function fetchMovieById(id: string): Promise<import('./video').Video | null> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movie');
    }

    const movie: TMDbMovie = await response.json();
    
    // Fetch genres to map them
    const genresResponse = await fetch(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
    );
    const genresData: TMDbGenresResponse = await genresResponse.json();
    const genreMap = genresData.genres.reduce((acc: Record<number, string>, genre: TMDbGenre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {} as Record<number, string>);

    return convertTMDbToVideo(movie, genreMap);
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    return null;
  }
}

// Get movies by genre
export async function fetchMoviesByGenre(genreId: number, page: number = 1): Promise<import('./video').Video[]> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies by genre');
    }

    const data: TMDbMoviesResponse = await response.json();
    
    // Fetch genres to map them
    const genresResponse = await fetch(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
    );
    const genresData: TMDbGenresResponse = await genresResponse.json();
    const genreMap = genresData.genres.reduce((acc: Record<number, string>, genre: TMDbGenre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {} as Record<number, string>);

    return data.results.map((movie: TMDbMovie) => convertTMDbToVideo(movie, genreMap));
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return [];
  }
}