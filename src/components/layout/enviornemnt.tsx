"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"

export function Environment() {
  const envRef = useRef<Group>(null)

  useFrame((state) => {
    if (envRef.current) {
      envRef.current.rotation.y = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <group ref={envRef}>
      {/* Ceiling with recessed lighting */}
      <mesh position={[0, 12, 0]} rotation={[Math.PI, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>

      {/* Recessed ceiling lights */}
      {Array.from({ length: 9 }).map((_, i) => {
        const x = ((i % 3) - 1) * 15
        const z = (Math.floor(i / 3) - 1) * 15
        return (
          <group key={i} position={[x, 11.5, z]}>
            <mesh>
              <cylinderGeometry args={[1, 1, 0.2]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <pointLight position={[0, -0.5, 0]} color="#ffffff" intensity={0.8} distance={20} decay={2} />
          </group>
        )
      })}

      {/* Side walls with texture */}
      <mesh position={[-25, 6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[60, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      <mesh position={[25, 6, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[60, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Decorative columns */}
      {[-20, -10, 10, 20].map((x, i) => (
        <mesh key={i} position={[x, 6, -25]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 12]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} />
        </mesh>
      ))}
    </group>
  )
}
