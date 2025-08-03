"use client"

import { VideoCard } from "./video-card"
import type { Video } from "@/lib/video"

interface VideoGridProps {
  videos: Video[]
  favorites: string[]
  recentlyWatched: string[]
  onVideoSelect: (video: Video) => void
  onToggleFavorite: (videoId: string) => void
}

export function VideoGrid({ videos, favorites, recentlyWatched, onVideoSelect, onToggleFavorite }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
      {videos.map((video, index) => (
        <VideoCard
          key={video.id}
          video={video}
          isFavorite={favorites?.includes(video.id) || false}
          isRecentlyWatched={recentlyWatched?.includes(video.id) || false}
          onSelect={() => onVideoSelect(video)}
          onToggleFavorite={() => onToggleFavorite(video.id)}
          animationDelay={index * 0.1}
        />
      ))}
    </div>
  )
}
