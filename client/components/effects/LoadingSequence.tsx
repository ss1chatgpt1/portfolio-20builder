import { useEffect, useState } from 'react';
import { useSpring, animated, useChain, useSpringRef } from '@react-spring/web';
import { gsap } from 'gsap';

interface LoadingSequenceProps {
  onComplete: () => void;
}

export function LoadingSequence({ onComplete }: LoadingSequenceProps) {
  const [loadingText, setLoadingText] = useState('Initializing');
  const [progress, setProgress] = useState(0);

  // Animation refs
  const logoRef = useSpringRef();
  const progressRef = useSpringRef();
  const textRef = useSpringRef();
  const exitRef = useSpringRef();

  // Springs
  const logoSpring = useSpring({
    ref: logoRef,
    from: { opacity: 0, scale: 0.5, rotateY: 180 },
    to: { opacity: 1, scale: 1, rotateY: 0 },
    config: { tension: 300, friction: 20 },
  });

  const progressSpring = useSpring({
    ref: progressRef,
    from: { width: '0%' },
    to: { width: `${progress}%` },
    config: { tension: 100, friction: 20 },
  });

  const textSpring = useSpring({
    ref: textRef,
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 25 },
  });

  const exitSpring = useSpring({
    ref: exitRef,
    from: { opacity: 1, scale: 1 },
    to: { opacity: 0, scale: 0.8 },
    config: { tension: 200, friction: 20 },
  });

  // Chain animations
  useChain([logoRef, textRef, progressRef], [0, 0.5, 1]);

  useEffect(() => {
    const loadingSteps = [
      { text: 'Initializing', progress: 15 },
      { text: 'Loading 3D Environment', progress: 35 },
      { text: 'Preparing Animations', progress: 55 },
      { text: 'Optimizing Performance', progress: 75 },
      { text: 'Finalizing Experience', progress: 95 },
      { text: 'Welcome', progress: 100 },
    ];

    let currentStep = 0;

    const updateLoading = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setLoadingText(step.text);
        setProgress(step.progress);
        
        if (step.progress === 100) {
          setTimeout(() => {
            exitRef.start();
            setTimeout(onComplete, 800);
          }, 1000);
        } else {
          setTimeout(updateLoading, 600 + Math.random() * 400);
        }
        
        currentStep++;
      }
    };

    setTimeout(updateLoading, 1000);
  }, [exitRef, onComplete]);

  return (
    <animated.div 
      style={exitSpring}
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
    >
      <div className="text-center space-y-8">
        {/* Animated Logo */}
        <animated.div 
          style={logoSpring}
          className="mx-auto w-24 h-24 relative"
        >
          <div className="w-full h-full bg-gradient-to-br from-primary via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <div className="text-white font-bold text-2xl">S</div>
          </div>
          
          {/* Orbiting particles */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full animate-spin"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: `${30 + i * 10}px center`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${2 + i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </animated.div>

        {/* Loading Text */}
        <animated.div style={textSpring} className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            {loadingText}
          </h2>
          
          {/* Progress Bar */}
          <div className="w-64 mx-auto">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <animated.div 
                style={progressSpring}
                className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
              />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {progress}%
            </div>
          </div>
        </animated.div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </animated.div>
  );
}
