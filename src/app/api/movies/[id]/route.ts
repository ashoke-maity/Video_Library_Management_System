import { NextRequest, NextResponse } from 'next/server';
import { fetchMovieById } from '@/lib/tmdb-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const movie = await fetchMovieById(params.id);

    if (!movie) {
      return NextResponse.json(
        { error: 'Movie not found', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ movie, success: true });
  } catch (error) {
    console.error('Error fetching movie:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movie', success: false },
      { status: 500 }
    );
  }
}