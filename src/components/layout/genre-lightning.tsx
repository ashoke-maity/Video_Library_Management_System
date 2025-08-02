"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { PointLight, SpotLight } from "three"
import type { Genre } from "@/lib/video"

interface GenreLightingProps {
  genre: Genre
}

export function GenreLighting({ genre }: GenreLightingProps) {
  const light1Ref = useRef<PointLight>(null)
  const light2Ref = useRef<PointLight>(null)
  const spotLightRef = useRef<SpotLight>(null)

  // Animated lighting
  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(time * 0.5) * 8
      light1Ref.current.position.z = Math.cos(time * 0.5) * 8
    }

    if (light2Ref.current) {
      light2Ref.current.position.x = Math.cos(time * 0.3) * 6
      light2Ref.current.position.z = Math.sin(time * 0.3) * 6
    }
  })

  const getLightingConfig = (genre: Genre) => {
    switch (genre) {
      case "horror":
        return {
          color1: "#ff0000",
          color2: "#8b0000",
          intensity: 2,
          spotColor: "#ff4444",
        }
      case "comedy":
        return {
          color1: "#ffff00",
          color2: "#ff69b4",
          intensity: 3,
          spotColor: "#ffd700",
        }
      case "sci-fi":
        return {
          color1: "#00ffff",
          color2: "#0066ff",
          intensity: 2.5,
          spotColor: "#66ccff",
        }
      case "action":
        return {
          color1: "#ff8c00",
          color2: "#ff4500",
          intensity: 2.8,
          spotColor: "#ff6600",
        }
      case "drama":
        return {
          color1: "#9370db",
          color2: "#4b0082",
          intensity: 1.8,
          spotColor: "#8a2be2",
        }
      default:
        return {
          color1: "#ffffff",
          color2: "#cccccc",
          intensity: 1.5,
          spotColor: "#ffffff",
        }
    }
  }

  const config = getLightingConfig(genre)

  return (
    <>
      {/* Main atmospheric lights */}
      <pointLight
        ref={light1Ref}
        position={[8, 6, 8]}
        color={config.color1}
        intensity={config.intensity}
        distance={20}
        decay={2}
        castShadow
      />

      <pointLight
        ref={light2Ref}
        position={[-6, 4, 6]}
        color={config.color2}
        intensity={config.intensity * 0.8}
        distance={18}
        decay={2}
      />

      {/* Spotlight for dramatic effect */}
      <spotLight
        ref={spotLightRef}
        position={[0, 10, 5]}
        color={config.spotColor}
        intensity={config.intensity * 0.5}
        angle={Math.PI / 4}
        penumbra={0.5}
        distance={25}
        castShadow
      />

      {/* Rim lighting */}
      <directionalLight position={[-10, 5, -10]} color={config.color1} intensity={0.5} />
    </>
  )
}
