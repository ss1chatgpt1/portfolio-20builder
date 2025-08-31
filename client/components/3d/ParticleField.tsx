import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  radius?: number;
  color?: string;
}

export function ParticleField({ count = 2000, radius = 50, color = '#ffffff' }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorObj = new THREE.Color(color);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Distribute particles in a sphere
      const spherical = new THREE.Spherical(
        radius * Math.random(),
        Math.acos(2 * Math.random() - 1),
        Math.random() * Math.PI * 2
      );
      const position = new THREE.Vector3().setFromSpherical(spherical);
      
      positions[i3] = position.x;
      positions[i3 + 1] = position.y;
      positions[i3 + 2] = position.z;

      // Random colors with slight variation
      const hue = (colorObj.getHSL({ h: 0, s: 0, l: 0 }).h + Math.random() * 0.1) % 1;
      const saturation = 0.3 + Math.random() * 0.4;
      const lightness = 0.5 + Math.random() * 0.3;
      
      const particleColor = new THREE.Color().setHSL(hue, saturation, lightness);
      colors[i3] = particleColor.r;
      colors[i3 + 1] = particleColor.g;
      colors[i3 + 2] = particleColor.b;
    }

    return [positions, colors];
  }, [count, radius, color]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Gentle wave motion
      positions[i3 + 1] += Math.sin(time * 0.5 + positions[i3] * 0.01) * 0.002;
      positions[i3] += Math.cos(time * 0.3 + positions[i3 + 2] * 0.01) * 0.001;
      
      // Mouse interaction
      const mouseInfluence = 0.5;
      const mouseX = (state.mouse.x * mouseInfluence) * 5;
      const mouseY = (state.mouse.y * mouseInfluence) * 5;
      
      positions[i3] += (mouseX - positions[i3]) * 0.0001;
      positions[i3 + 1] += (mouseY - positions[i3 + 1]) * 0.0001;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += 0.0005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.8}
        transparent
        opacity={0.6}
        vertexColors
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
}
