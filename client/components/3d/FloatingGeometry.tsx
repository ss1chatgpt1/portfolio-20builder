import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingGeometryProps {
  position: [number, number, number];
  color: string;
  speed?: number;
}

export function FloatingGeometry({ position, color, speed = 1 }: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    const geometries = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1, 0),
    ];
    return geometries[Math.floor(Math.random() * geometries.length)];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    meshRef.current.rotation.x += 0.01 * speed;
    meshRef.current.rotation.y += 0.015 * speed;
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.01;
  });

  return (
    <Float
      speed={speed}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh
        ref={meshRef}
        position={position}
        geometry={geometry}
        scale={0.8}
      >
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.6}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}
