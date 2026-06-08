'use client';

import { useEffect, useRef } from 'react';

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Respect prefers-reduced-motion, hide bar entirely
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      bar.style.display = 'none';
      return;
    }

    // Write directly to the DOM, no React state, no re-render, no reconciliation.
    // scaleX() runs on the GPU compositor thread: zero layout, zero paint.
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? window.scrollY / total : 0;
      bar.style.transform = `scaleX(${pct})`;
    };

    // Passive listener: browser never waits for JS before scrolling
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialise on mount

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 72,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 98,
        pointerEvents: 'none',
      }}
    >
      <div
        ref={barRef}
        style={{
          height: '100%',
          background: 'var(--red)',
          /* scaleX from 0→1 instead of width 0→100%, stays on compositor thread */
          transform: 'scaleX(0)',
          transformOrigin: 'left center',
          /* Promote to GPU layer upfront so first scroll frame is instant */
          willChange: 'transform',
          /* Smooth micro-lag between scroll position and bar, feels silk */
          transition: 'transform 60ms linear',
        }}
      />
    </div>
  );
}
