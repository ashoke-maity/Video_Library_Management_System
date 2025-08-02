"use client"

import { Play, Heart, Clock, Star, Calendar } from "lucide-react"
import type { Video } from "@/lib/video"

interface VideoListProps {
  videos: Video[]
  favorites: string[]
  recentlyWatched: string[]
  onVideoSelect: (video: Video) => void
  onToggleFavorite: (videoId: string) => void
}

export function VideoList({ videos, favorites, recentlyWatched, onVideoSelect, onToggleFavorite }: VideoListProps) {
  return (
    <div className="space-y-4">
      {videos.map((video, index) => (
        <div
          key={video.id}
          className="group bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:bg-gray-800/50"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="flex items-center gap-4">
            {/* Thumbnail */}
            <div
              className="w-24 h-16 rounded-lg flex items-center justify-center text-white font-bold text-sm relative overflow-hidden group-hover:scale-105 transition-transform duration-300"
              style={{ backgroundColor: video.coverColor }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
              <Play className="w-6 h-6 relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              {recentlyWatched?.includes(video.id) && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors duration-200 truncate">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">{video.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {video.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {video.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      {video.rating}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
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
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleFavorite(video.id)
                    }}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      favorites?.includes(video.id)
                        ? "text-red-500 bg-red-500/20 hover:bg-red-500/30"
                        : "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorites?.includes(video.id) ? "fill-current" : ""}`} />
                  </button>
                  <button
                    onClick={() => onVideoSelect(video)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Watch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
