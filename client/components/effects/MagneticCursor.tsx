import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

export function MagneticCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const [cursorSpring, cursorApi] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    opacity: 0,
    config: { tension: 300, friction: 30 },
  }));

  const [trailSpring, trailApi] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 150, friction: 20 },
  }));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (!isVisible) {
        setIsVisible(true);
      }

      cursorApi.start({
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
      });

      // Delayed trail effect
      setTimeout(() => {
        trailApi.start({
          x: e.clientX,
          y: e.clientY,
        });
      }, 50);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      cursorApi.start({ opacity: 0 });
    };

    // Add magnetic effect to interactive elements
    const addMagneticEffect = () => {
      const magneticElements = document.querySelectorAll('[data-magnetic]');
      
      magneticElements.forEach((element) => {
        const el = element as HTMLElement;
        
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          cursorApi.start({ scale: 1.5 });
        });
        
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          cursorApi.start({ scale: 1 });
        });
        
        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          // Apply magnetic pull only to small interactive elements
          const isSmallElement = rect.width < 300 && rect.height < 200;
          const strength = isSmallElement ? 0.15 : 0.05;

          // Only apply strong magnetic effect to buttons and small elements
          if (el.tagName === 'BUTTON' || el.classList.contains('magnetic-button') || isSmallElement) {
            el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
          }
        });
        
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'translate(0px, 0px)';
        });
      });
    };

    // Initialize magnetic effects after a short delay
    setTimeout(addMagneticEffect, 100);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, cursorApi, trailApi]);

  return (
    <>
      {/* Main cursor */}
      <animated.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: cursorSpring.x.to(
            (x) => `translate(${x - 10}px, ${cursorSpring.y.get() - 10}px) scale(${cursorSpring.scale.get()})`
          ),
          opacity: cursorSpring.opacity,
        }}
      >
        <div 
          className={`w-5 h-5 rounded-full border-2 transition-colors duration-300 ${
            isHovering 
              ? 'border-primary bg-primary/20' 
              : 'border-white bg-white/10'
          }`}
        />
      </animated.div>

      {/* Trail cursor */}
      <animated.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          transform: trailSpring.x.to(
            (x) => `translate(${x - 2}px, ${trailSpring.y.get() - 2}px)`
          ),
          opacity: isVisible ? 0.6 : 0,
        }}
      >
        <div className="w-1 h-1 rounded-full bg-white" />
      </animated.div>
    </>
  );
}
