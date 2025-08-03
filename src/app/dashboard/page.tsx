"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { VideoGrid } from "@/components/ui/video-grid"
import { VideoCarousel } from "@/components/ui/video-carousel"
import { VideoList } from "@/components/ui/video-list"
import { Header } from "@/components/ui/header"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Heart, Play, Download, Calendar } from "lucide-react"
import type { Video } from "@/lib/video"
import { mockVideos } from "@/lib/mock-videos"

export default function Dashboard() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<string[]>(["1", "3", "5"])
  const [borrowedVideos, setBorrowedVideos] = useState<string[]>(["2", "4"])
  const [watchlist, setWatchlist] = useState<string[]>(["6", "8", "10"])
  const [recentlyWatched, setRecentlyWatched] = useState<string[]>(["1", "3", "7", "9"])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredVideos = mockVideos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const getBorrowedVideos = () => mockVideos.filter(video => borrowedVideos.includes(video.id))
  const getFavoriteVideos = () => mockVideos.filter(video => favorites.includes(video.id))
  const getWatchlistVideos = () => mockVideos.filter(video => watchlist.includes(video.id))
  const getRecentlyWatchedVideos = () => mockVideos.filter(video => recentlyWatched.includes(video.id))

  const toggleFavorite = (videoId: string) => {
    setFavorites((prev) => (prev?.includes(videoId) ? prev.filter((id) => id !== videoId) : [...(prev || []), videoId]))
  }

  const handleVideoClick = (video: Video) => {
    router.push(`/videos/${video.id}`)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-black">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode="grid"
        onViewModeChange={() => {}}
        totalVideos={filteredVideos.length}
        totalFavorites={favorites.length}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-white">{borrowedVideos.length}</div>
                <div className="text-gray-400 text-sm">Currently Borrowed</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-400" />
              <div>
                <div className="text-2xl font-bold text-white">{favorites.length}</div>
                <div className="text-gray-400 text-sm">Favorites</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-white">{watchlist.length}</div>
                <div className="text-gray-400 text-sm">Watchlist</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3">
              <Play className="w-8 h-8 text-purple-400" />
              <div>
                <div className="text-2xl font-bold text-white">{recentlyWatched.length}</div>
                <div className="text-gray-400 text-sm">Recently Watched</div>
              </div>
            </div>
          </div>
        </div>

        {/* Currently Borrowed */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-green-400" />
              Currently Borrowed
            </h2>
            <Badge variant="secondary" className="bg-green-900/20 text-green-400 border-green-500/30">
              {borrowedVideos.length} videos
            </Badge>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            {getBorrowedVideos().length > 0 ? (
              <VideoGrid
                videos={getBorrowedVideos()}
                favorites={favorites}
                recentlyWatched={recentlyWatched}
                onVideoSelect={handleVideoClick}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No borrowed videos yet</p>
                <Button 
                  onClick={() => router.push('/')}
                  className="mt-4 bg-red-600 hover:bg-red-700"
                >
                  Browse Library
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Favorites */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-400" />
              Your Favorites
            </h2>
            <Badge variant="secondary" className="bg-red-900/20 text-red-400 border-red-500/30">
              {favorites.length} videos
            </Badge>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            {getFavoriteVideos().length > 0 ? (
              <VideoGrid
                videos={getFavoriteVideos()}
                favorites={favorites}
                recentlyWatched={recentlyWatched}
                onVideoSelect={handleVideoClick}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No favorite videos yet</p>
                <Button 
                  onClick={() => router.push('/')}
                  className="mt-4 bg-red-600 hover:bg-red-700"
                >
                  Browse Library
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Watchlist */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-400" />
              Your Watchlist
            </h2>
            <Badge variant="secondary" className="bg-blue-900/20 text-blue-400 border-blue-500/30">
              {watchlist.length} videos
            </Badge>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            {getWatchlistVideos().length > 0 ? (
              <VideoGrid
                videos={getWatchlistVideos()}
                favorites={favorites}
                recentlyWatched={recentlyWatched}
                onVideoSelect={handleVideoClick}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Your watchlist is empty</p>
                <Button 
                  onClick={() => router.push('/')}
                  className="mt-4 bg-red-600 hover:bg-red-700"
                >
                  Browse Library
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Recently Watched */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Play className="w-6 h-6 text-purple-400" />
              Recently Watched
            </h2>
            <Badge variant="secondary" className="bg-purple-900/20 text-purple-400 border-purple-500/30">
              {recentlyWatched.length} videos
            </Badge>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            {getRecentlyWatchedVideos().length > 0 ? (
              <VideoGrid
                videos={getRecentlyWatchedVideos()}
                favorites={favorites}
                recentlyWatched={recentlyWatched}
                onVideoSelect={handleVideoClick}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <div className="text-center py-8">
                <Play className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No recently watched videos</p>
                <Button 
                  onClick={() => router.push('/')}
                  className="mt-4 bg-red-600 hover:bg-red-700"
                >
                  Browse Library
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
