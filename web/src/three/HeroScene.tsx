import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Lightformer, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function GoldKnot() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.12
    meshRef.current.rotation.y += delta * 0.18
  })
  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.1}>
      <mesh ref={meshRef} scale={1.5}>
        <torusKnotGeometry args={[1, 0.32, 220, 32]} />
        <MeshDistortMaterial
          color="#d4af37"
          metalness={1}
          roughness={0.22}
          distort={0.12}
          speed={1.2}
          envMapIntensity={1.4}
        />
      </mesh>
    </Float>
  )
}

function OrbitRing() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.z += delta * 0.06
  })
  return (
    <mesh ref={ref} rotation={[1.1, 0.3, 0]}>
      <torusGeometry args={[3.1, 0.008, 16, 200]} />
      <meshStandardMaterial color="#f3e6bd" metalness={1} roughness={0.3} emissive="#8f6a24" emissiveIntensity={0.3} />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={80} color="#fbf6e9" />
        <pointLight position={[-6, -3, -4]} intensity={40} color="#d4af37" />
        <GoldKnot />
        <OrbitRing />
        <Sparkles count={60} scale={7} size={2.4} speed={0.25} color="#f3e6bd" opacity={0.6} />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={4} color="#fbf6e9" position={[4, 3, 2]} scale={[4, 3, 1]} />
          <Lightformer form="rect" intensity={2.5} color="#d4af37" position={[-4, -2, 3]} scale={[3, 4, 1]} />
          <Lightformer form="ring" intensity={2} color="#f3e6bd" position={[0, 4, -4]} scale={6} />
        </Environment>
      </Suspense>
    </Canvas>
  )
}
