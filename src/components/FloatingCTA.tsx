'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useQuote } from '@/components/QuoteContext';

export function FloatingCTA() {
  const { openQuote } = useQuote();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Hide on contact page — user is already on the enquiry form
  const isContactPage = pathname?.includes('/contact');

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  if (isContactPage) return null;

  return (
    <button
      onClick={openQuote}
      tabIndex={-1}
      aria-hidden="true"
      className="btn-press"
      style={{
        position: 'fixed', bottom: '2rem', ...(isRTL ? { left: '2rem' } : { right: '2rem' }),
        zIndex: 190,
        background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer',
        fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.13em',
        textTransform: 'uppercase', fontWeight: 700,
        padding: '13px 22px',
        boxShadow: visible ? '0 6px 32px rgba(245,20,31,0.38)' : 'none',
        display: 'flex', alignItems: 'center', gap: 8,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
      onMouseLeave={e => (e.currentTarget.style.opacity = visible ? '1' : '0')}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      {isRTL ? 'ابدأ الحوار' : 'Get in Touch'}
    </button>
  );
}
