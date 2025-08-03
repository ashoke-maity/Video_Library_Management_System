"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { VideoCard } from "./video-card"
import type { Video } from "@/lib/video"

interface VideoCarouselProps {
  videos: Video[]
  favorites: string[]
  recentlyWatched: string[]
  onVideoSelect: (video: Video) => void
  onToggleFavorite: (videoId: string) => void
}

export function VideoCarousel({
  videos,
  favorites,
  recentlyWatched,
  onVideoSelect,
  onToggleFavorite,
}: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const itemsPerView = 5
  const maxIndex = Math.max(0, videos.length - itemsPerView)

  const scroll = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentIndex(Math.max(0, currentIndex - 1))
    } else {
      setCurrentIndex(Math.min(maxIndex, currentIndex + 1))
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Featured Collection</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={currentIndex >= maxIndex}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-out gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {videos.map((video, index) => (
            <div key={video.id} className="flex-shrink-0" style={{ width: `${100 / itemsPerView}%` }}>
              <VideoCard
                video={video}
                isFavorite={favorites?.includes(video.id) || false}
                isRecentlyWatched={recentlyWatched?.includes(video.id) || false}
                onSelect={() => onVideoSelect(video)}
                onToggleFavorite={() => onToggleFavorite(video.id)}
                animationDelay={index * 0.1}
                variant="carousel"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex ? "bg-red-500 w-8" : "bg-gray-600 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
