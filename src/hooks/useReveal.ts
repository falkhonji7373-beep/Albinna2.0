import { useEffect, useRef } from 'react';

export function useReveal(className = 'reveal', threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the user prefers reduced motion, show the element immediately —
    // no class, no animation, no IntersectionObserver overhead.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    el.classList.add(className);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in');
          // Disconnect after triggering — each element only needs one reveal
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [className, threshold]);

  return ref;
}
