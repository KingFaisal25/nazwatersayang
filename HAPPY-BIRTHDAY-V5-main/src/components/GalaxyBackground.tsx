'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function StarParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2500;

  // Generate random positions and velocities for twinkling/moving
  const [positions, opacities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const op = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Create a spiral galaxy distribution
      const r = Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const spiral = (r * 0.1) + theta;
      
      // Add dispersion
      const x = Math.cos(spiral) * r + (Math.random() - 0.5) * 5;
      const y = (Math.random() - 0.5) * 4;
      const z = Math.sin(spiral) * r + (Math.random() - 0.5) * 5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      op[i] = Math.random();
    }
    return [pos, op];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Slow rotation of the galaxy
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      
      // Parallax rotation based on mouse position
      const targetX = (state.pointer.x * Math.PI) / 20;
      const targetY = (state.pointer.y * Math.PI) / 20;
      
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetY, 0.05);
      pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, targetX, 0.05);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Sparkle/twinkle effect overlay
function ShootingStar() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Shooting star movement: re-positions every few seconds
      const elapsed = state.clock.getElapsedTime();
      const cycle = elapsed % 6; // Move every 6 seconds
      
      if (cycle < 1) {
        // Active phase
        const t = cycle; // 0 to 1
        meshRef.current.position.x = -20 + t * 40;
        meshRef.current.position.y = 15 - t * 30;
        meshRef.current.position.z = -10;
        meshRef.current.scale.setScalar(t < 0.5 ? t * 2 : (1 - t) * 2);
      } else {
        // Offscreen/hidden phase
        meshRef.current.position.set(-999, -999, -999);
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshBasicMaterial color="#ffeb3b" transparent opacity={0.9} />
    </mesh>
  );
}

function HeartParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 30;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 30,
        y: -15 + Math.random() * 30,
        z: (Math.random() - 0.5) * 20,
        speed: 0.02 + Math.random() * 0.03,
        scale: 0.1 + Math.random() * 0.2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const p = particles[i];
        child.position.y += p.speed;
        child.rotation.y += p.rotSpeed;
        child.rotation.z += p.rotSpeed;
        
        // Wrap around bottom to top
        if (child.position.y > 15) {
          child.position.y = -15;
          child.position.x = (Math.random() - 0.5) * 30;
        }
      });
    }
  });

  // Create a heart shape geometry
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 5, y + 5);
    shape.bezierCurveTo(x + 5, y + 5, x + 4, y + 9, x, y + 9);
    shape.bezierCurveTo(x - 6, y + 9, x - 6, y + 4.5,x - 6, y + 4.5);
    shape.bezierCurveTo(x - 6, y + 1, x - 3, y - 3, x + 5, y - 7);
    shape.bezierCurveTo(x + 13, y - 3, x + 16, y + 1, x + 16, y + 4.5);
    shape.bezierCurveTo(x + 16, y + 4.5, x + 16, y + 9, x + 10, y + 9);
    shape.bezierCurveTo(x + 7, y + 9, x + 5, y + 5, x + 5, y + 5);
    return new THREE.ShapeGeometry(shape);
  }, []);

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh
          key={i}
          geometry={heartShape}
          position={[p.x, p.y, p.z]}
          scale={[p.scale * 0.1, p.scale * 0.1, p.scale * 0.1]}
          rotation={[Math.PI, 0, 0]}
        >
          <meshBasicMaterial
            color="#f43f5e"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function GalaxyBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#080510']} />
        <ambientLight intensity={0.5} />
        <fog attach="fog" args={['#080510', 10, 45]} />
        <StarParticles />
        <ShootingStar />
        <HeartParticles />
      </Canvas>
    </div>
  );
}
