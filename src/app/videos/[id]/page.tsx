"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Play, Heart, Download, Share2, Calendar, Clock, Star, Eye, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockVideos } from "@/lib/mock-videos"
import { fetchMovieById } from "@/lib/tmdb-api"
import type { Video } from "@/lib/video"

export default function VideoDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [video, setVideo] = useState<Video | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isBorrowed, setIsBorrowed] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadVideo = async () => {
      setIsLoading(true)
      
      try {
        // First try to get from API if we have an API key
        if (process.env.NEXT_PUBLIC_TMDB_API_KEY) {
          const apiVideo = await fetchMovieById(params.id as string)
          if (apiVideo) {
            setVideo(apiVideo)
            setIsLoading(false)
            return
          }
        }
        
        // Fallback to mock data
        const foundVideo = mockVideos.find(v => v.id === params.id)
        if (foundVideo) {
          setVideo(foundVideo)
        }
      } catch (error) {
        console.error('Error loading video:', error)
        // Fallback to mock data on error
        const foundVideo = mockVideos.find(v => v.id === params.id)
        if (foundVideo) {
          setVideo(foundVideo)
        }
      }
      
      setIsLoading(false)
    }

    loadVideo()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading video...</div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Video not found</div>
      </div>
    )
  }

  const handleBorrow = () => {
    if (isBorrowed) {
      // Stream the video
      console.log("Streaming video:", video.title)
    } else {
      // Borrow the video
      setIsBorrowed(true)
      console.log("Borrowed video:", video.title)
    }
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleToggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="relative h-96 overflow-hidden">
        {/* Background Image/Color */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: video.coverColor }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>

        {/* Navigation */}
        <div className="relative z-10 p-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Library
          </button>
        </div>

        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{video.title}</h1>
            
            <div className="flex items-center gap-6 text-gray-300 mb-6">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {video.year}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {video.duration}
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                {video.rating}
              </span>
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                {video.watchCount.toLocaleString()} views
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                onClick={handleBorrow}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold"
              >
                <Play className="w-5 h-5 mr-2" />
                {isBorrowed ? "Stream Now" : "Borrow Video"}
              </Button>
              
              <Button 
                onClick={handleToggleWatchlist}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </Button>

              <Button 
                onClick={handleToggleFavorite}
                variant="outline"
                className={`border-white/30 hover:bg-white/10 ${
                  isFavorite ? "text-red-400 border-red-400" : "text-white"
                }`}
              >
                <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{video.description}</p>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Details</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <span className="text-gray-500">Genre:</span>
                    <Badge variant="secondary" className="ml-2 capitalize">
                      {video.genre}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-500">Release Year:</span>
                    <span className="ml-2">{video.year}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Duration:</span>
                    <span className="ml-2">{video.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Rating:</span>
                    <span className="ml-2 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      {video.rating}/10
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Views:</span>
                    <span className="ml-2">{video.watchCount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Added:</span>
                    <span className="ml-2">{new Date(video.dateAdded).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Borrow Status */}
            {isBorrowed && (
              <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-2">Currently Borrowed</h3>
                <p className="text-gray-300 text-sm mb-4">You can stream this video until the due date.</p>
                <div className="text-sm text-gray-400">
                  <div>Due Date: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>
                  <div>Days Remaining: 7</div>
                </div>
              </div>
            )}

            {/* Watchlist Status */}
            {isInWatchlist && (
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">In Your Watchlist</h3>
                <p className="text-gray-300 text-sm">This video is saved in your watchlist for later viewing.</p>
              </div>
            )}

            {/* Actions */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
              <div className="space-y-3">
                <Button 
                  onClick={handleBorrow}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isBorrowed ? "Stream Now" : "Borrow Video"}
                </Button>
                
                <Button 
                  onClick={handleToggleWatchlist}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                </Button>
                
                <Button 
                  onClick={handleToggleFavorite}
                  variant="outline"
                  className={`w-full ${
                    isFavorite 
                      ? "border-red-500 text-red-400 hover:bg-red-500/10" 
                      : "border-gray-600 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
                
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 