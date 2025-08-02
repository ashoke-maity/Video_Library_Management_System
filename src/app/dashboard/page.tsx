"use client"

import { useState, useEffect } from "react"
import { VideoGrid } from "@/components/ui/video-grid"
import { VideoCarousel } from "@/components/ui/video-carousel"
import { VideoList } from "@/components/ui/video-list"
import { Header } from "@/components/ui/header"
import { GenreSelector } from "@/components/layout/genre-selector"
import { VideoModal } from "@/components/ui/video-modal"
import { LoadingScreen } from "@/components/ui/loading-screen"
import type { Video, Genre, ViewMode } from "@/lib/video"
import { mockVideos } from "@/lib/mock-videos"

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState<Genre>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [favorites, setFavorites] = useState<string[]>([])
  const [recentlyWatched, setRecentlyWatched] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const filteredVideos = mockVideos.filter((video) => {
    const matchesGenre = selectedGenre === "all" || video.genre === selectedGenre
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesGenre && matchesSearch
  })

  const toggleFavorite = (videoId: string) => {
    setFavorites((prev) => (prev?.includes(videoId) ? prev.filter((id) => id !== videoId) : [...(prev || []), videoId]))
  }

  const addToRecentlyWatched = (videoId: string) => {
    setRecentlyWatched((prev) => [videoId, ...prev.filter((id) => id !== videoId)].slice(0, 5))
  }

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video)
    addToRecentlyWatched(video.id)
  }

  const getGenreTheme = (genre: Genre) => {
    switch (genre) {
      case "horror":
        return "bg-gradient-to-br from-red-900/20 via-black to-red-950/30"
      case "comedy":
        return "bg-gradient-to-br from-yellow-900/20 via-black to-pink-900/20"
      case "sci-fi":
        return "bg-gradient-to-br from-blue-900/20 via-black to-cyan-900/30"
      case "action":
        return "bg-gradient-to-br from-orange-900/20 via-black to-red-900/20"
      case "drama":
        return "bg-gradient-to-br from-purple-900/20 via-black to-indigo-900/30"
      default:
        return "bg-gradient-to-br from-gray-900 via-black to-gray-900"
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 ${getGenreTheme(selectedGenre)}`}>
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalVideos={filteredVideos.length}
          totalFavorites={favorites.length}
        />

        <div className="px-6 pb-6">
          <GenreSelector selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />

          <div className="mt-8">
            {viewMode === "grid" && (
              <VideoGrid
                videos={filteredVideos}
                favorites={favorites}
                recentlyWatched={recentlyWatched}
                onVideoSelect={handleVideoSelect}
                onToggleFavorite={toggleFavorite}
              />
            )}
            {viewMode === "carousel" && (
              <VideoCarousel
                videos={filteredVideos}
                favorites={favorites}
                recentlyWatched={recentlyWatched}
                onVideoSelect={handleVideoSelect}
                onToggleFavorite={toggleFavorite}
              />
            )}
            {viewMode === "list" && (
              <VideoList
                videos={filteredVideos}
                favorites={favorites}
                recentlyWatched={recentlyWatched}
                onVideoSelect={handleVideoSelect}
                onToggleFavorite={toggleFavorite}
              />
            )}
          </div>
        </div>
      </div>

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          isFavorite={favorites?.includes(selectedVideo.id) || false}
          onClose={() => setSelectedVideo(null)}
          onToggleFavorite={() => toggleFavorite(selectedVideo.id)}
        />
      )}
    </div>
  )
}
