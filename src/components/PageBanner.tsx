'use client';

import { useEffect, useRef } from 'react';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  img?: string;
}

export function PageBanner({ title, subtitle, img }: PageBannerProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const els = [lineRef.current, titleRef.current, subRef.current].filter(Boolean) as HTMLElement[];
    els.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
    });
    els.forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = 'opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 100 + 80);
    });
  }, [title]);

  return (
    <div style={{ position: 'relative', height: 'clamp(320px, 40vw, 500px)', overflow: 'hidden' }}>
      {img && (
        <img src={img} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', filter: 'brightness(0.28) saturate(0.7)',
        }} />
      )}
      {!img && <div style={{ position: 'absolute', inset: 0, background: 'var(--banner-bg)' }} />}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 100%)' }} />

      <div style={{
        position: 'absolute', right: '-1%', bottom: '-6%',
        fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem,16vw,15rem)',
        fontWeight: 700, color: 'rgba(255,255,255,0.025)', lineHeight: 1,
        pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.04em',
      }}>AB</div>

      <div style={{
        position: 'relative', zIndex: 1, height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: 'clamp(1.5rem,5vw,4rem)', paddingBottom: 'clamp(2.5rem,4vw,4rem)',
        maxWidth: 1400, margin: '0 auto',
      }}>
        <div ref={lineRef} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
          <div style={{ width: 36, height: 2, background: 'var(--red)' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--red)' }}>Al Binaa Construction</span>
        </div>
        <h1 ref={titleRef} style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem,5.5vw,4.5rem)',
          fontWeight: 700, color: '#fff', margin: 0, lineHeight: 0.98,
          letterSpacing: '-0.02em',
        }}>{title}</h1>
        {subtitle && (
          <p ref={subRef} style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(14px,1.3vw,16px)',
            color: 'rgba(255,255,255,0.58)', marginTop: '1.1rem', maxWidth: 560,
            lineHeight: 1.72, marginBottom: 0,
          }}>{subtitle}</p>
        )}
      </div>
    </div>
  );
}
