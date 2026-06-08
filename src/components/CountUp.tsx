'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  delay?: number; // stagger delay in ms
}

// ease-out cubic: fast start, smooth deceleration to final value
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function CountUp({ end, suffix = '', duration = 1800, delay = 0 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref    = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    // Respect prefers-reduced-motion, show final value immediately, no counting
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setCount(end);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasRun.current) {
        hasRun.current = true;
        observer.disconnect();

        setTimeout(() => {
          const startTime = performance.now();

          function frame(now: number) {
            const elapsed  = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = easeOutCubic(progress);

            setCount(Math.round(eased * end));

            if (progress < 1) requestAnimationFrame(frame);
          }

          requestAnimationFrame(frame);
        }, delay);
      }
    }, { threshold: 0.3 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, delay]);

  return <span ref={ref}>{count}{suffix}</span>;
}
