"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { Points } from "three"
import type { Genre } from "@/lib/video"

interface ParticleFieldProps {
  genre: Genre
}

export function ParticleField({ genre }: ParticleFieldProps) {
  const pointsRef = useRef<Points>(null)

  const particleCount = 1000
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return positions
  }, [])

  const getParticleColor = (genre: Genre) => {
    switch (genre) {
      case "horror":
        return "#ff0000"
      case "comedy":
        return "#ffff00"
      case "sci-fi":
        return "#00ffff"
      case "action":
        return "#ff8c00"
      case "drama":
        return "#9370db"
      default:
        return "#ffffff"
    }
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={getParticleColor(genre)}
        size={0.05}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
