/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

interface LanyardProps {
  position?: [number, number, number]
  gravity?: [number, number, number]
  fov?: number
  transparent?: boolean
}

export default function Lanyard({
  position = [0, 0, 20],
  fov = 26,
  transparent = true,
}: LanyardProps) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position, fov }}
        dpr={[1, 2]}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-3, 2, 4]} intensity={0.8} color="#A9C8E6" />
        <Badge />
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        </Environment>
      </Canvas>
    </div>
  )
}

// Simple verlet-style rope point
interface RopePoint {
  pos: THREE.Vector3
  prev: THREE.Vector3
  pinned: boolean
}

function Badge() {
  const cardRef = useRef<THREE.Group>(null!)
  const strapRef = useRef<THREE.Mesh>(null!)

  const logoTexture = useTexture('/img/logo.png')

  // Rope simulation points (top to bottom)
  const ropeLen = 6
  const segLen = 0.65
  const gravity = -12
  const damping = 0.97

  const points = useRef<RopePoint[]>([])
  const [dragged, setDragged] = useState(false)
  const [hovered, setHovered] = useState(false)
  const dragOffset = useRef(new THREE.Vector3())

  // Initialize rope
  useMemo(() => {
    const pts: RopePoint[] = []
    for (let i = 0; i < ropeLen; i++) {
      const y = 4 - i * segLen
      pts.push({
        pos: new THREE.Vector3(0, y, 0),
        prev: new THREE.Vector3(0, y, 0),
        pinned: i === 0,
      })
    }
    points.current = pts
  }, [])

  // Strap curve
  const curve = useMemo(() => new THREE.CatmullRomCurve3(
    Array.from({ length: ropeLen }, () => new THREE.Vector3())
  ), [])

  // Strap texture: blue with game jam text
  const strapTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 64
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#6B9FCC'
    ctx.fillRect(0, 0, 512, 64)
    ctx.fillStyle = '#4A7BA8'
    for (let i = 0; i < 512; i += 24) {
      ctx.fillRect(i, 0, 12, 64)
    }
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 18px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (let i = 0; i < 512; i += 160) {
      ctx.fillText('GAME JAM 2026', i + 80, 32)
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    return tex
  }, [])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => { document.body.style.cursor = 'auto' }
    }
  }, [hovered, dragged])

  const onPointerDown = useCallback((e: any) => {
    e.stopPropagation()
    e.target.setPointerCapture(e.pointerId)
    setDragged(true)
    // Store offset between click point and card position
    const last = points.current[points.current.length - 1]
    dragOffset.current.copy(e.point).sub(last.pos)
  }, [])

  const onPointerUp = useCallback((e: any) => {
    e.stopPropagation()
    e.target.releasePointerCapture(e.pointerId)
    setDragged(false)
  }, [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.033) // Cap at ~30fps delta
    const pts = points.current
    if (!pts.length) return

    // If dragged, move last point toward mouse
    if (dragged) {
      const vec = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5)
        .unproject(state.camera)
      const dir = vec.clone().sub(state.camera.position).normalize()
      const dist = state.camera.position.length()
      vec.copy(state.camera.position).add(dir.multiplyScalar(dist))
      const last = pts[pts.length - 1]
      last.pos.copy(vec).sub(dragOffset.current)
      last.prev.copy(last.pos)
    }

    // Verlet integration
    for (const p of pts) {
      if (p.pinned) continue
      const vel = p.pos.clone().sub(p.prev).multiplyScalar(damping)
      p.prev.copy(p.pos)
      p.pos.add(vel)
      p.pos.y += gravity * dt * dt
    }

    // Constraint relaxation
    for (let iter = 0; iter < 8; iter++) {
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i]
        const b = pts[i + 1]
        const diff = b.pos.clone().sub(a.pos)
        const dist = diff.length()
        if (dist === 0) continue
        const error = (dist - segLen) / dist
        const correction = diff.multiplyScalar(error * 0.5)
        if (!a.pinned) a.pos.add(correction)
        if (!b.pinned) b.pos.sub(correction)
      }
    }

    // Update strap curve
    for (let i = 0; i < pts.length; i++) {
      curve.points[i].copy(pts[i].pos)
    }
    if (strapRef.current) {
      strapRef.current.geometry.dispose()
      strapRef.current.geometry = new THREE.TubeGeometry(curve, 32, 0.06, 8, false)
    }

    // Update card position/rotation at end of rope
    if (cardRef.current && pts.length >= 2) {
      const last = pts[pts.length - 1]
      const prev = pts[pts.length - 2]
      cardRef.current.position.copy(last.pos)

      // Orient card along rope direction
      const dir = last.pos.clone().sub(prev.pos).normalize()
      const angle = Math.atan2(dir.x, -dir.y)
      cardRef.current.rotation.z = angle
      // Subtle swing on x based on velocity
      const vel = last.pos.clone().sub(last.prev)
      cardRef.current.rotation.y = THREE.MathUtils.lerp(
        cardRef.current.rotation.y,
        vel.x * 2,
        0.1
      )
    }
  })

  // Card dimensions
  const cardW = 1.6
  const cardH = 2.2
  const clipH = 0.18

  return (
    <>
      {/* Strap / rope */}
      <mesh ref={strapRef}>
        <tubeGeometry args={[curve, 32, 0.06, 8, false]} />
        <meshStandardMaterial map={strapTexture} />
      </mesh>

      {/* Card group */}
      <group ref={cardRef}>
        {/* Metal clip at top */}
        <mesh position={[0, cardH / 2 + clipH / 2, 0]}>
          <boxGeometry args={[0.3, clipH, 0.06]} />
          <meshStandardMaterial color="#999" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Card body - dark background */}
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <roundedRectGeometry args={[cardW, cardH, 0.08]} />
          <meshPhysicalMaterial
            color="#111118"
            roughness={0.4}
            metalness={0.1}
            clearcoat={0.6}
            clearcoatRoughness={0.2}
          />
        </mesh>

        {/* Logo on front face */}
        <mesh position={[0, 0.15, 0.045]}>
          <planeGeometry args={[cardW * 0.8, cardW * 0.8]} />
          <meshBasicMaterial map={logoTexture} transparent />
        </mesh>

        {/* "GAME JAM" text at bottom of card */}
        <mesh position={[0, -0.75, 0.045]}>
          <planeGeometry args={[cardW * 0.7, 0.25]} />
          <meshBasicMaterial color="#A9C8E6" transparent opacity={0.9} />
        </mesh>

        {/* Orange accent border at top */}
        <mesh position={[0, cardH / 2 - 0.06, 0.045]}>
          <planeGeometry args={[cardW * 0.92, 0.08]} />
          <meshBasicMaterial color="#DB551C" />
        </mesh>

        {/* Card back side */}
        <mesh rotation={[0, Math.PI, 0]}>
          <roundedRectGeometry args={[cardW, cardH, 0.08]} />
          <meshPhysicalMaterial
            color="#0d0d14"
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
      </group>
    </>
  )
}

// Custom rounded rectangle geometry
class RoundedRectGeometry extends THREE.ExtrudeGeometry {
  constructor(width = 1, height = 1, radius = 0.1) {
    const shape = new THREE.Shape()
    const w = width / 2
    const h = height / 2
    const r = Math.min(radius, w, h)
    shape.moveTo(-w + r, -h)
    shape.lineTo(w - r, -h)
    shape.quadraticCurveTo(w, -h, w, -h + r)
    shape.lineTo(w, h - r)
    shape.quadraticCurveTo(w, h, w - r, h)
    shape.lineTo(-w + r, h)
    shape.quadraticCurveTo(-w, h, -w, h - r)
    shape.lineTo(-w, -h + r)
    shape.quadraticCurveTo(-w, -h, -w + r, -h)
    super(shape, { depth: 0.04, bevelEnabled: false })
    this.translate(0, 0, -0.02)
  }
}

// Register custom geometry so JSX <roundedRectGeometry /> works
declare module '@react-three/fiber' {
  interface ThreeElements {
    roundedRectGeometry: any
  }
}

import { extend } from '@react-three/fiber'
extend({ RoundedRectGeometry })
