"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Play, Heart, Star, Clock, Eye } from "lucide-react"
import type { Video } from "@/lib/video"

interface VideoCardProps {
  video: Video
  isFavorite: boolean
  isRecentlyWatched: boolean
  onSelect: () => void
  onToggleFavorite: () => void
  animationDelay?: number
  variant?: "default" | "carousel"
}

export function VideoCard({
  video,
  isFavorite,
  isRecentlyWatched,
  onSelect,
  onToggleFavorite,
  animationDelay = 0,
  variant = "default",
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/videos/${video.id}`)
  }

  return (
    <div
      className="group relative animate-fade-in-up"
      style={{ animationDelay: `${animationDelay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
        {/* Poster */}
        <div
          className="aspect-[2/3] relative overflow-hidden"
          style={{ backgroundColor: video.coverColor }}
          onClick={handleCardClick}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

          {/* Recently watched indicator */}
          {isRecentlyWatched && (
            <div className="absolute top-2 left-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          )}

          {/* Favorite indicator */}
          {isFavorite && (
            <div className="absolute top-2 right-2 text-yellow-400">
              <Heart className="w-5 h-5 fill-current" />
            </div>
          )}

          {/* Play button overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isHovered ? "bg-black/50" : "bg-transparent"
            }`}
          >
            <div
              className={`w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 ${
                isHovered ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">{video.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span>{video.year}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400" />
                {video.rating}
              </span>
            </div>
          </div>
        </div>

        {/* Info section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                video.genre === "horror"
                  ? "bg-red-600/20 text-red-400"
                  : video.genre === "comedy"
                    ? "bg-yellow-600/20 text-yellow-400"
                    : video.genre === "sci-fi"
                      ? "bg-blue-600/20 text-blue-400"
                      : video.genre === "action"
                        ? "bg-orange-600/20 text-orange-400"
                        : "bg-purple-600/20 text-purple-400"
              }`}
            >
              {video.genre.toUpperCase()}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite()
              }}
              className={`p-1 rounded-full transition-all duration-200 ${
                isFavorite ? "text-red-500 hover:text-red-400" : "text-gray-400 hover:text-red-400"
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {video.duration}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {video.watchCount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Hover description */}
        {isHovered && variant === "default" && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4 transform translate-y-0 transition-transform duration-300">
            <p className="text-gray-300 text-sm line-clamp-3 mb-3">{video.description}</p>
            <button
              onClick={handleCardClick}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
