"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { DVDCase } from "./dvd-case"
import type { Video } from "@/lib/video"

interface CarouselViewProps {
  videos: Video[]
  favorites: string[]
  onVideoSelect: (video: Video) => void
  onToggleFavorite: (videoId: string) => void
}

export function CarouselView({ videos, favorites, onVideoSelect, onToggleFavorite }: CarouselViewProps) {
  const carouselRef = useRef<Group>(null)

  useFrame((state) => {
    if (carouselRef.current) {
      carouselRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  const radius = 12
  const angleStep = (Math.PI * 2) / videos.length

  return (
    <group ref={carouselRef} position={[0, 0, 0]}>
      {/* Carousel platform */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <cylinderGeometry args={[radius + 2, radius + 2, 0.5, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* DVD Cases arranged in circle */}
      {videos.map((video, index) => {
        const angle = index * angleStep
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <group key={video.id} position={[x, -1, z]} rotation={[0, -angle + Math.PI / 2, 0]}>
            <DVDCase
              video={video}
              position={[0, 0, 0]}
              isFavorite={favorites?.includes(video.id) || false}
              onSelect={() => onVideoSelect(video)}
              onToggleFavorite={() => onToggleFavorite(video.id)}
              enhanced
            />
          </group>
        )
      })}
    </group>
  )
}
