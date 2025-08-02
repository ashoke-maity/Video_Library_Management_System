"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { DVDShelf } from "./dvd-shelf"
import { GenreLighting } from "./genre-lightning"
import { CarouselView } from "./carousel-view"
import { WallView } from "./wall-view"
import { ParticleField } from "./particle-field"
import { Environment } from "./enviornemnt"
import type { Video, Genre } from "@/lib/video"

interface CinematicLibraryProps {
  videos: Video[]
  selectedGenre: Genre
  viewMode: "shelves" | "carousel" | "wall"
  favorites: string[]
  recentlyWatched: string[]
  onVideoSelect: (video: Video) => void
  onToggleFavorite: (videoId: string) => void
}

export function CinematicLibrary({
  videos,
  selectedGenre,
  viewMode,
  favorites,
  recentlyWatched,
  onVideoSelect,
  onToggleFavorite,
}: CinematicLibraryProps) {
  const groupRef = useRef<Group>(null)

  // Organize videos into shelves (6 videos per shelf)
  const shelves = useMemo(() => {
    const shelfSize = 6
    const shelfArray = []
    for (let i = 0; i < videos.length; i += shelfSize) {
      shelfArray.push(videos.slice(i, i + shelfSize))
    }
    return shelfArray
  }, [videos])

  // Enhanced animation with view mode transitions
  useFrame((state) => {
    if (groupRef.current) {
      const targetRotation =
        viewMode === "carousel" ? state.clock.elapsedTime * 0.1 : Math.sin(state.clock.elapsedTime * 0.1) * 0.05
      groupRef.current.rotation.y += (targetRotation - groupRef.current.rotation.y) * 0.05
    }
  })

  const renderContent = () => {
    switch (viewMode) {
      case "carousel":
        return (
          <CarouselView
            videos={videos}
            favorites={favorites}
            onVideoSelect={onVideoSelect}
            onToggleFavorite={onToggleFavorite}
          />
        )
      case "wall":
        return (
          <WallView
            videos={videos}
            favorites={favorites}
            onVideoSelect={onVideoSelect}
            onToggleFavorite={onToggleFavorite}
          />
        )
      default:
        return (
          <>
            {shelves.map((shelfVideos, shelfIndex) => (
              <DVDShelf
                key={shelfIndex}
                videos={shelfVideos}
                position={[0, 4 - shelfIndex * 3, 0]}
                favorites={favorites}
                recentlyWatched={recentlyWatched}
                onVideoSelect={onVideoSelect}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </>
        )
    }
  }

  return (
    <group ref={groupRef}>
      {/* Enhanced lighting with fog */}
      <GenreLighting genre={selectedGenre} />
      <fog attach="fog" args={["#000000", 15, 35]} />

      {/* Particle effects */}
      <ParticleField genre={selectedGenre} />

      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />

      {/* Content based on view mode */}
      {renderContent()}

      {/* Enhanced environment */}
      <Environment />
    </group>
  )
}
