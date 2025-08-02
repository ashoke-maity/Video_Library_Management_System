"use client"

import { DVDCase } from "./dvd-case"
import type { Video } from "@/lib/video"

interface WallViewProps {
  videos: Video[]
  favorites: string[]
  onVideoSelect: (video: Video) => void
  onToggleFavorite: (videoId: string) => void
}

export function WallView({ videos, favorites, onVideoSelect, onToggleFavorite }: WallViewProps) {
  const columns = 6
  const rows = Math.ceil(videos.length / columns)

  return (
    <group position={[0, 2, -5]}>
      {/* Wall background */}
      <mesh position={[0, 0, -0.5]} receiveShadow>
        <planeGeometry args={[20, 15]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
      </mesh>

      {/* DVD Cases on wall */}
      {videos.map((video, index) => {
        const col = index % columns
        const row = Math.floor(index / columns)
        const x = (col - (columns - 1) / 2) * 3
        const y = (rows / 2 - row) * 2.8

        return (
          <DVDCase
            key={video.id}
            video={video}
            position={[x, y, 0]}
            isFavorite={favorites?.includes(video.id) || false}
            onSelect={() => onVideoSelect(video)}
            onToggleFavorite={() => onToggleFavorite(video.id)}
            enhanced
          />
        )
      })}
    </group>
  )
}
