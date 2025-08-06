"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { VideoGrid } from "@/components/layout/video-grid"
import { VideoCarousel } from "@/components/layout/video-carousel"
import { VideoList } from "@/components/ui/video-list"
import { Header } from "@/components/ui/header"
import { LoadingScreen } from "@/components/shared/loading-screen"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Heart, Play, Download, Calendar, User as UserIcon } from "lucide-react"
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

  // Get user info from localStorage
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null)
  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) setUser(JSON.parse(userData))
  }, [])

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
    <div className="min-h-screen bg-gradient-to-br from-[#18122B] via-[#393053] to-[#443C68]">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode="grid"
        onViewModeChange={() => {}}
        totalVideos={filteredVideos.length}
        totalFavorites={favorites.length}
      />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
            Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-lg text-gray-300">Your personal video dashboard</p>
        </div>

        {/* User Profile Card */}
        <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md border border-violet-400/30 rounded-2xl p-8 mb-12 shadow-2xl">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white text-4xl font-extrabold ring-4 ring-violet-400/40">
            {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : user?.email?.[0].toUpperCase() || <UserIcon className="w-12 h-12" />}
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">{user?.name || 'User Name'}</div>
            <div className="text-gray-300 text-lg">{user?.email || 'user@email.com'}</div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-green-400/30 flex flex-col items-center shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <BookOpen className="w-10 h-10 text-green-400 mb-3" />
            <div className="text-3xl font-extrabold text-white">{borrowedVideos.length}</div>
            <div className="text-gray-300 text-base">Borrowed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-red-400/30 flex flex-col items-center shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <Heart className="w-10 h-10 text-red-400 mb-3" />
            <div className="text-3xl font-extrabold text-white">{favorites.length}</div>
            <div className="text-gray-300 text-base">Favorites</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-blue-400/30 flex flex-col items-center shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <Clock className="w-10 h-10 text-blue-400 mb-3" />
            <div className="text-3xl font-extrabold text-white">{watchlist.length}</div>
            <div className="text-gray-300 text-base">Watchlist</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-purple-400/30 flex flex-col items-center shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <Play className="w-10 h-10 text-purple-400 mb-3" />
            <div className="text-3xl font-extrabold text-white">{recentlyWatched.length}</div>
            <div className="text-gray-300 text-base">Recently Watched</div>
          </div>
        </div>

        {/* Section Divider */}
        <hr className="border-t border-violet-400/20 mb-12" />

        {/* Video Sections */}
        <div className="space-y-16">
          {/* Currently Borrowed */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-7 h-7 text-green-400" />
                Currently Borrowed
              </h2>
              <Badge variant="secondary" className="bg-green-900/20 text-green-400 border-green-500/30">
                {borrowedVideos.length} videos
              </Badge>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-green-400/20">
              {getBorrowedVideos().length > 0 ? (
                <VideoGrid
                  videos={getBorrowedVideos()}
                  favorites={favorites}
                  recentlyWatched={recentlyWatched}
                  onVideoSelect={handleVideoClick}
                  onToggleFavorite={toggleFavorite}
                />
              ) : (
                <div className="text-center py-10">
                  <BookOpen className="w-14 h-14 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No borrowed videos yet</p>
                  <Button 
                    onClick={() => router.push('/')} className="mt-6 bg-red-600 hover:bg-red-700">
                    Browse Library
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Favorites */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Heart className="w-7 h-7 text-red-400" />
                Your Favorites
              </h2>
              <Badge variant="secondary" className="bg-red-900/20 text-red-400 border-red-500/30">
                {favorites.length} videos
              </Badge>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-red-400/20">
              {getFavoriteVideos().length > 0 ? (
                <VideoGrid
                  videos={getFavoriteVideos()}
                  favorites={favorites}
                  recentlyWatched={recentlyWatched}
                  onVideoSelect={handleVideoClick}
                  onToggleFavorite={toggleFavorite}
                />
              ) : (
                <div className="text-center py-10">
                  <Heart className="w-14 h-14 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No favorite videos yet</p>
                  <Button 
                    onClick={() => router.push('/')} className="mt-6 bg-red-600 hover:bg-red-700">
                    Browse Library
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Watchlist */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Clock className="w-7 h-7 text-blue-400" />
                Your Watchlist
              </h2>
              <Badge variant="secondary" className="bg-blue-900/20 text-blue-400 border-blue-500/30">
                {watchlist.length} videos
              </Badge>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-blue-400/20">
              {getWatchlistVideos().length > 0 ? (
                <VideoGrid
                  videos={getWatchlistVideos()}
                  favorites={favorites}
                  recentlyWatched={recentlyWatched}
                  onVideoSelect={handleVideoClick}
                  onToggleFavorite={toggleFavorite}
                />
              ) : (
                <div className="text-center py-10">
                  <Clock className="w-14 h-14 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Your watchlist is empty</p>
                  <Button 
                    onClick={() => router.push('/')} className="mt-6 bg-red-600 hover:bg-red-700">
                    Browse Library
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Recently Watched */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Play className="w-7 h-7 text-purple-400" />
                Recently Watched
              </h2>
              <Badge variant="secondary" className="bg-purple-900/20 text-purple-400 border-purple-500/30">
                {recentlyWatched.length} videos
              </Badge>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-purple-400/20">
              {getRecentlyWatchedVideos().length > 0 ? (
                <VideoGrid
                  videos={getRecentlyWatchedVideos()}
                  favorites={favorites}
                  recentlyWatched={recentlyWatched}
                  onVideoSelect={handleVideoClick}
                  onToggleFavorite={toggleFavorite}
                />
              ) : (
                <div className="text-center py-10">
                  <Play className="w-14 h-14 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No recently watched videos</p>
                  <Button 
                    onClick={() => router.push('/')} className="mt-6 bg-red-600 hover:bg-red-700">
                    Browse Library
                  </Button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
