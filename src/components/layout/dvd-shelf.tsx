"use client"

import { useRef } from "react"
import type { Group, Vector3 } from "three"
import { DVDCase } from "./dvd-case"
import type { Video } from "@/lib/video"

interface DVDShelfProps {
  videos: Video[]
  position: Vector3 | [number, number, number]
  favorites: string[]
  recentlyWatched: string[]
  onVideoSelect: (video: Video) => void
  onToggleFavorite: (videoId: string) => void
}

export function DVDShelf({
  videos,
  position,
  favorites,
  recentlyWatched,
  onVideoSelect,
  onToggleFavorite,
}: DVDShelfProps) {
  const shelfRef = useRef<Group>(null)

  return (
    <group ref={shelfRef} position={position}>
      {/* Enhanced shelf with LED strip effect */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <boxGeometry args={[16, 0.2, 3]} />
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.2}
          metalness={0.8}
          emissive="#333333"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* LED strip under shelf */}
      <mesh position={[0, -0.7, 1.4]}>
        <boxGeometry args={[15, 0.05, 0.1]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} transparent opacity={0.8} />
      </mesh>

      {/* DVD Cases */}
      {videos.map((video, index) => {
        const xPosition = (index - (videos.length - 1) / 2) * 2.5
        const isRecent = recentlyWatched?.includes(video.id) || false

        return (
          <group key={video.id}>
            <DVDCase
              video={video}
              position={[xPosition, 0, 0]}
              isFavorite={favorites?.includes(video.id) || false}
              onSelect={() => onVideoSelect(video)}
              onToggleFavorite={() => onToggleFavorite(video.id)}
              enhanced
            />
            {/* Recently watched indicator */}
            {isRecent && (
              <mesh position={[xPosition, -1.2, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.05]} />
                <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.8} />
              </mesh>
            )}
          </group>
        )
      })}
    </group>
  )
}
