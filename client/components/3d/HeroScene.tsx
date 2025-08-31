import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Effects } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { ParticleField } from './ParticleField';
import { FloatingGeometry } from './FloatingGeometry';

export function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} />
          
          {/* Lighting Setup */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          <pointLight position={[-10, -10, -5]} intensity={0.3} color="#6366f1" />
          <pointLight position={[10, -5, -5]} intensity={0.3} color="#8b5cf6" />
          
          {/* Environment */}
          <Environment preset="city" />
          
          {/* Particle Field */}
          <ParticleField count={1500} radius={30} color="#6366f1" />
          
          {/* Floating Geometric Shapes */}
          <FloatingGeometry position={[-5, 2, -5]} color="#6366f1" speed={0.8} />
          <FloatingGeometry position={[3, -3, -8]} color="#8b5cf6" speed={1.2} />
          <FloatingGeometry position={[-2, -5, -10]} color="#06b6d4" speed={0.6} />
          <FloatingGeometry position={[6, 4, -12]} color="#10b981" speed={1.0} />
          <FloatingGeometry position={[-8, 1, -6]} color="#f59e0b" speed={0.9} />
          
          {/* Post-processing Effects */}
          <EffectComposer>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0.9}
              luminanceSmoothing={0.9}
              blendFunction={BlendFunction.SCREEN}
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={[0.0005, 0.0005]}
            />
            <Vignette
              offset={0.5}
              darkness={0.5}
              blendFunction={BlendFunction.NORMAL}
            />
          </EffectComposer>
          
          {/* Controls - disabled for performance and UX */}
          {/* <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
