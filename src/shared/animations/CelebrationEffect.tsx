'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  type: 'heart' | 'ring' | 'sparkle' | 'star' | 'dot';
  rotation: number;
}

const COLORS = ['#ea2e5b', '#F1557C', '#ff7a9c', '#ffb3c6', '#ffd700', '#ffffff'];

export function CelebrationEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate falling particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -20 - Math.random() * 100,
        size: 8 + Math.random() * 16,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        type: ['heart', 'ring', 'sparkle', 'star', 'dot'][Math.floor(Math.random() * 5)] as Particle['type'],
        rotation: Math.random() * 360,
      });
    }
    setParticles(newParticles);
  }, []);

  const renderParticle = (particle: Particle) => {
    switch (particle.type) {
      case 'heart':
        return (
          <svg viewBox="0 0 24 24" fill={particle.color} style={{ width: particle.size, height: particle.size }}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      case 'ring':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={particle.color} strokeWidth="2" style={{ width: particle.size, height: particle.size }}>
            <circle cx="12" cy="12" r="8" />
            <path d="M12 4 L10 1 M12 4 L14 1" strokeLinecap="round" />
          </svg>
        );
      case 'sparkle':
        return (
          <svg viewBox="0 0 24 24" fill={particle.color} style={{ width: particle.size, height: particle.size }}>
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        );
      case 'star':
        return (
          <svg viewBox="0 0 24 24" fill={particle.color} style={{ width: particle.size, height: particle.size }}>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        );
      case 'dot':
        return (
          <div
            style={{
              width: particle.size / 2,
              height: particle.size / 2,
              borderRadius: '50%',
              background: particle.color,
              boxShadow: `0 0 ${particle.size}px ${particle.color}`,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Radial glow background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-tertiary/15 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      {/* Falling confetti particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            transform: `rotate(${particle.rotation}deg)`,
          }}
        >
          {renderParticle(particle)}
        </div>
      ))}

      {/* Floating rings on sides */}
      <div className="absolute top-20 left-8 animate-float-slow">
        <svg viewBox="0 0 48 48" className="w-12 h-12 text-secondary/40">
          <circle cx="18" cy="24" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="30" cy="24" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      </div>
      <div className="absolute bottom-32 right-8 animate-float-slow" style={{ animationDelay: '2s' }}>
        <svg viewBox="0 0 48 48" className="w-10 h-10 text-tertiary/40">
          <circle cx="18" cy="24" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="30" cy="24" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      </div>

      {/* Sparkle stars in corners */}
      {[
        { top: '10%', left: '5%', delay: 0 },
        { top: '15%', right: '8%', delay: 0.5 },
        { bottom: '20%', left: '10%', delay: 1 },
        { bottom: '15%', right: '5%', delay: 1.5 },
        { top: '40%', left: '3%', delay: 2 },
        { top: '35%', right: '4%', delay: 2.5 },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute animate-twinkle"
          style={{
            ...pos,
            animationDelay: `${pos.delay}s`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="#ffd700" className="w-4 h-4" style={{ filter: 'drop-shadow(0 0 4px #ffd700)' }}>
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      ))}

      {/* Champagne bubbles */}
      <div className="absolute bottom-0 left-1/4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bubble-rise"
            style={{
              left: `${Math.random() * 40 - 20}px`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <div
              className="rounded-full bg-gradient-to-br from-white/40 to-white/10 border border-white/30"
              style={{
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 right-1/4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bubble-rise"
            style={{
              left: `${Math.random() * 40 - 20}px`,
              animationDelay: `${i * 0.5 + 0.2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <div
              className="rounded-full bg-gradient-to-br from-white/40 to-white/10 border border-white/30"
              style={{
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
