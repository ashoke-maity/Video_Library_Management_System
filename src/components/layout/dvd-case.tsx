"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import type { Mesh, Vector3 } from "three"
import type { Video } from "@/lib/video"

interface DVDCaseProps {
  video: Video
  position: Vector3 | [number, number, number]
  isFavorite?: boolean
  onSelect: () => void
  onToggleFavorite?: () => void
  enhanced?: boolean
}

export function DVDCase({
  video,
  position,
  isFavorite = false,
  onSelect,
  onToggleFavorite,
  enhanced = false,
}: DVDCaseProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Enhanced animation with more effects
  useFrame((state) => {
    if (meshRef.current) {
      const targetY = hovered ? (enhanced ? 0.5 : 0.3) : 0
      const targetRotationY = hovered ? Math.sin(state.clock.elapsedTime * 2) * 0.15 : 0
      const targetRotationX = hovered ? Math.sin(state.clock.elapsedTime * 1.5) * 0.05 : 0

      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.1
      meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.1
      meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.1

      if (clicked) {
        meshRef.current.scale.setScalar(1.2)
        setClicked(false)
      } else {
        const targetScale = hovered ? (enhanced ? 1.1 : 1.05) : 1
        meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale } as any, 0.1)
      }
    }
  })

  const handleClick = () => {
    setClicked(true)
    onSelect()
  }

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.8, 2.4, 0.2]} />
        <meshStandardMaterial
          color={video.coverColor}
          roughness={hovered ? 0.05 : 0.1}
          metalness={hovered ? 0.9 : 0.8}
          emissive={hovered ? video.coverColor : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>

      {/* Favorite indicator */}
      {isFavorite && (
        <mesh position={[0.7, 1, 0.11]}>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.5} />
        </mesh>
      )}

      {/* Enhanced glow effect */}
      {hovered && enhanced && (
        <mesh position={[0, 0, -0.1]}>
          <boxGeometry args={[2.2, 2.8, 0.1]} />
          <meshStandardMaterial
            color={video.coverColor}
            transparent
            opacity={0.3}
            emissive={video.coverColor}
            emissiveIntensity={0.5}
          />
        </mesh>
      )}

      {/* Enhanced DVD Case Label with more details */}
      <Html
        position={[0, 0, 0.11]}
        transform
        occlude
        style={{
          width: "140px",
          height: "180px",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div className="w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-sm p-2 flex flex-col justify-between text-white text-xs border border-gray-700">
          <div>
            <h3 className="font-bold text-sm mb-1 leading-tight">{video.title}</h3>
            <p className="text-gray-300 text-xs mb-1">{video.year}</p>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-yellow-400">★</span>
              <span className="text-xs">{video.rating}</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-right">
              <span
                className={`px-1 py-0.5 rounded text-xs ${
                  video.genre === "horror"
                    ? "bg-red-600"
                    : video.genre === "comedy"
                      ? "bg-yellow-600"
                      : video.genre === "sci-fi"
                        ? "bg-blue-600"
                        : video.genre === "action"
                          ? "bg-orange-600"
                          : "bg-purple-600"
                }`}
              >
                {video.genre.toUpperCase()}
              </span>
            </div>
            {isFavorite && (
              <div className="text-right">
                <span className="text-yellow-400 text-xs">♥ FAVORITE</span>
              </div>
            )}
          </div>
        </div>
      </Html>

      {/* Enhanced hover info with more interactive elements */}
      {hovered && (
        <Html position={[0, 3.5, 0]} center>
          <div className="bg-black/95 text-white p-4 rounded-xl max-w-xs backdrop-blur-md border border-gray-600 shadow-2xl">
            <h3 className="font-bold text-lg mb-2 text-center">{video.title}</h3>
            <p className="text-sm text-gray-300 mb-3 leading-relaxed">{video.description}</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-3">
              <div>Duration: {video.duration}</div>
              <div>Rating: ★ {video.rating}</div>
              <div>Year: {video.year}</div>
              <div>Views: {video.watchCount.toLocaleString()}</div>
            </div>
            {onToggleFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFavorite()
                }}
                className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  isFavorite
                    ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                }`}
              >
                {isFavorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
              </button>
            )}
          </div>
        </Html>
      )}
    </group>
  )
}
