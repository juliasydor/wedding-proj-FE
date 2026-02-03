'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

interface FallingPetalsProps {
  count?: number;
  className?: string;
}

export function FallingPetals({ count = 20, className }: FallingPetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generatedPetals = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 8 + Math.random() * 16,
      rotation: Math.random() * 360,
    }));
    setPetals(generatedPetals);
  }, [count]);

  return (
    <div className={cn('pointer-events-none fixed inset-0 overflow-hidden', className)}>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-fall-petal opacity-60"
          style={{
            left: `${petal.x}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            transform: `rotate(${petal.rotation}deg)`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="text-tertiary"
            style={{
              width: `${petal.size}px`,
              height: `${petal.size}px`,
            }}
            fill="currentColor"
          >
            <ellipse cx="12" cy="12" rx="6" ry="10" />
          </svg>
        </div>
      ))}
    </div>
  );
}
