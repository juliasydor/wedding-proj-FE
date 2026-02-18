'use client';

import { useEffect, useRef } from 'react';

interface Heart {
  x: number;
  y: number;
  id: number;
  scale: number;
  opacity: number;
}

export function HeartCursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const idCounterRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createHeart = (x: number, y: number) => {
      const heart: Heart = {
        x,
        y,
        id: idCounterRef.current++,
        scale: 0.5 + Math.random() * 0.5,
        opacity: 1,
      };
      heartsRef.current.push(heart);

      const element = document.createElement('div');
      element.className = 'heart-cursor-trail';
      element.id = `heart-${heart.id}`;
      element.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor" style="width: ${16 * heart.scale}px; height: ${16 * heart.scale}px;">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      `;
      element.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 9999;
        color: #ea2e5b;
        transform: translate(-50%, -50%) scale(${heart.scale});
        opacity: 1;
        transition: none;
      `;
      container.appendChild(element);

      // Animate and remove (faster fade out)
      let opacity = 1;
      let scale = heart.scale;
      let posY = y;

      const animate = () => {
        opacity -= 0.06;
        scale += 0.015;
        posY -= 1.5;

        if (opacity <= 0) {
          element.remove();
          heartsRef.current = heartsRef.current.filter((h) => h.id !== heart.id);
          return;
        }

        element.style.opacity = String(opacity);
        element.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${(1 - opacity) * 30}deg)`;
        element.style.top = `${posY}px`;

        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { x: lastX, y: lastY } = lastPositionRef.current;

      // Calculate distance moved
      const distance = Math.sqrt(
        Math.pow(clientX - lastX, 2) + Math.pow(clientY - lastY, 2)
      );

      // Create heart if moved enough distance (smaller = more hearts, closer together)
      if (distance > 12) {
        createHeart(clientX, clientY);
        lastPositionRef.current = { x: clientX, y: clientY };
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Create multiple hearts on click
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const offsetX = (Math.random() - 0.5) * 40;
          const offsetY = (Math.random() - 0.5) * 40;
          createHeart(e.clientX + offsetX, e.clientY + offsetY);
        }, i * 50);
      }
    };

    // Only add mouse interactions on desktop (non-touch devices)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('click', handleClick);
    }

    return () => {
      if (!isTouchDevice) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', handleClick);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[9999]" />;
}
