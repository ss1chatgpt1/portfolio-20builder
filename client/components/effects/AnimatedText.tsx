import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

interface AnimatedTextProps {
  children: string;
  className?: string;
  animation?: 'reveal' | 'typewriter' | 'wave' | 'split' | 'morphing';
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function AnimatedText({ 
  children, 
  className = '', 
  animation = 'reveal',
  delay = 0,
  duration = 1,
  stagger = 0.02
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!textRef.current || !inView) return;

    const element = textRef.current;
    const text = children;

    // Clear previous content
    element.innerHTML = '';

    switch (animation) {
      case 'reveal':
        // Split text into words
        const words = text.split(' ').map(word => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`);
        element.innerHTML = words.join(' ');
        
        gsap.set(element.querySelectorAll('span span'), { y: '100%' });
        gsap.to(element.querySelectorAll('span span'), {
          y: '0%',
          duration,
          ease: 'power3.out',
          stagger,
          delay,
        });
        break;

      case 'typewriter':
        const chars = text.split('').map(char => `<span class="opacity-0">${char === ' ' ? '&nbsp;' : char}</span>`);
        element.innerHTML = chars.join('');
        
        gsap.to(element.querySelectorAll('span'), {
          opacity: 1,
          duration: 0.05,
          stagger: 0.03,
          delay,
          ease: 'none',
        });
        break;

      case 'wave':
        const waveChars = text.split('').map(char => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`);
        element.innerHTML = waveChars.join('');
        
        gsap.set(element.querySelectorAll('span'), { y: 20, opacity: 0 });
        gsap.to(element.querySelectorAll('span'), {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)',
          stagger: 0.02,
          delay,
        });
        break;

      case 'split':
        const splitWords = text.split(' ').map(word => 
          `<span class="inline-block">${word.split('').map(char => 
            `<span class="inline-block">${char}</span>`
          ).join('')}</span>`
        );
        element.innerHTML = splitWords.join(' ');
        
        gsap.set(element.querySelectorAll('span span'), { 
          rotationX: 90, 
          transformOrigin: 'center bottom',
          opacity: 0 
        });
        gsap.to(element.querySelectorAll('span span'), {
          rotationX: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.02,
          delay,
        });
        break;

      case 'morphing':
        // Create scrambled text that morphs into real text
        const realChars = text.split('');
        const scrambledChars = realChars.map(() => 
          String.fromCharCode(65 + Math.floor(Math.random() * 26))
        );
        
        const morphSpans = scrambledChars.map((char, i) => 
          `<span data-original="${realChars[i]}">${char}</span>`
        );
        element.innerHTML = morphSpans.join('');
        
        element.querySelectorAll('span').forEach((span, i) => {
          const originalChar = span.getAttribute('data-original') || '';
          
          gsap.to(span, {
            duration: 0.1,
            repeat: 3,
            delay: delay + i * 0.03,
            onRepeat: () => {
              span.textContent = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            },
            onComplete: () => {
              span.textContent = originalChar;
              gsap.from(span, {
                scale: 1.2,
                duration: 0.2,
                ease: 'back.out(1.7)',
              });
            }
          });
        });
        break;
    }
  }, [inView, children, animation, delay, duration, stagger]);

  return (
    <div 
      ref={(node) => {
        textRef.current = node;
        inViewRef(node);
      }}
      className={className}
    />
  );
}
