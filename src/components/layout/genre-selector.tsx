"use client"

import type { Genre } from "@/lib/video"

interface GenreSelectorProps {
  selectedGenre: Genre
  onGenreChange: (genre: Genre) => void
}

const genres: { value: Genre; label: string; color: string; hoverColor: string }[] = [
  { value: "all", label: "All", color: "bg-gray-600", hoverColor: "hover:bg-gray-500" },
  { value: "horror", label: "Horror", color: "bg-red-600", hoverColor: "hover:bg-red-500" },
  { value: "comedy", label: "Comedy", color: "bg-yellow-500", hoverColor: "hover:bg-yellow-400" },
  { value: "sci-fi", label: "Sci-Fi", color: "bg-blue-500", hoverColor: "hover:bg-blue-400" },
  { value: "action", label: "Action", color: "bg-orange-500", hoverColor: "hover:bg-orange-400" },
  { value: "drama", label: "Drama", color: "bg-purple-600", hoverColor: "hover:bg-purple-500" },
]

export function GenreSelector({ selectedGenre, onGenreChange }: GenreSelectorProps) {
  return (
    <div className="flex gap-3 flex-wrap">
      {genres.map((genre) => (
        <button
          key={genre.value}
          onClick={() => onGenreChange(genre.value)}
          className={`
            px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105
            ${
              selectedGenre === genre.value
                ? `${genre.color} text-white shadow-lg shadow-${genre.color}/25 scale-105`
                : `bg-gray-800 text-gray-300 ${genre.hoverColor} hover:text-white`
            }
          `}
        >
          {genre.label}
        </button>
      ))}
    </div>
  )
}
