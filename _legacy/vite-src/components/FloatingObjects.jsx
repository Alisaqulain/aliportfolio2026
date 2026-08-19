import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

const FloatingBox = ({ position, color, speed }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed
      meshRef.current.rotation.y += 0.01 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
    }
  })

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  )
}

const FloatingSphere = ({ position, color, speed }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed
      meshRef.current.rotation.y += 0.01 * speed
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed) * 0.3
    }
  })

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <MeshDistortMaterial
          color={color}
          distort={0.2}
          speed={1.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  )
}

const FloatingObjects = () => {
  return (
    <>
      <FloatingBox position={[-3, 2, -2]} color="#00d4ff" speed={0.5} />
      <FloatingBox position={[3, -2, -3]} color="#7b2cbf" speed={0.7} />
      <FloatingSphere position={[-2, -1, -1]} color="#ff006e" speed={0.6} />
      <FloatingSphere position={[2, 1, -2]} color="#00d4ff" speed={0.8} />
      <FloatingBox position={[0, 3, -4]} color="#7b2cbf" speed={0.4} />
    </>
  )
}

export default FloatingObjects
