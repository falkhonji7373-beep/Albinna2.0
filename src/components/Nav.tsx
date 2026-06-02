'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from './ThemeProvider';
import { useQuote } from './QuoteContext';
import { MEGA_MENUS } from '@/lib/data';

export function Nav() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [dropdown, setDropdown]     = useState<string | null>(null);
  const [hoveredImg, setHoveredImg] = useState<string | null>(null);
  const closeTimer                  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isDark }                  = useTheme();
  const { openQuote }               = useQuote();
  const pathname                    = usePathname();
  const router                      = useRouter();
  const t                           = useTranslations('nav');

  // ── Derive locale from URL, e.g. /ar/about → 'ar'
  const locale      = pathname?.split('/')[1] === 'ar' ? 'ar' : 'en';
  const isRTL       = locale === 'ar';
  const otherLocale = isRTL ? 'en' : 'ar';

  // Build the same path in the other locale
  const switchLocalePath = () => {
    const segments = pathname?.split('/') ?? [];
    if (segments[1] === 'en' || segments[1] === 'ar') {
      segments[1] = otherLocale;
    } else {
      segments.splice(1, 0, otherLocale);
    }
    return segments.join('/') || `/${otherLocale}`;
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const dropBg    = isDark ? '#111' : '#fff';
  const dropFg    = isDark ? '#fff' : '#111';
  const navBg     = scrolled ? (isDark ? 'rgba(10,10,10,0.97)' : 'rgba(255,255,255,0.97)') : 'transparent';
  const textColor = scrolled ? (isDark ? '#fff' : '#1c1611') : '#fff';
  const borderBottom = scrolled
    ? `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(28,22,17,0.1)'}`
    : '1px solid transparent';

  const openDD      = (key: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setDropdown(key); };
  const scheduleClose = () => { closeTimer.current = setTimeout(() => { setDropdown(null); setHoveredImg(null); }, 150); };

  const links = [
    { label: t('about'),    href: `/${locale}/about`,    key: 'about'    },
    { label: t('services'), href: `/${locale}/services`, key: 'services' },
    { label: t('projects'), href: `/${locale}/projects`, key: 'projects' },
    { label: t('contact'),  href: `/${locale}/contact`,  key: 'contact'  },
  ];

  const nav = (href: string, search?: string) => {
    router.push(search ? `${href}?${search}` : href);
    setDropdown(null);
    setMenuOpen(false);
  };

  // The mega-menu image side is decorative; keep it on the LTR side
  const megaMenuFlex: React.CSSProperties = isRTL
    ? { flexDirection: 'row-reverse' }
    : {};

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: navBg, borderBottom,
      backdropFilter: scrolled ? 'blur(14px) saturate(180%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(180%)' : 'none',
      transition: 'background 0.35s ease, border-color 0.35s ease',
      padding: '0 clamp(1.25rem, 5vw, 4rem)',
    }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72,
      }}>

        {/* Logo */}
        <Link href={`/${locale}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          onClick={() => { setMenuOpen(false); setDropdown(null); }}>
          <img
            src={scrolled && !isDark ? '/images/logo.png' : '/images/logo-dark.png'}
            alt="Al Binaa Construction & Industry"
            style={{
              height: 44, width: 'auto', display: 'block',
              transition: 'opacity 0.3s, filter 0.35s',
              filter: scrolled ? 'none' : 'drop-shadow(0 1px 6px rgba(0,0,0,0.55))',
            }}
          />
        </Link>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{
          display: 'flex', gap: '2rem', alignItems: 'center', height: '100%',
        }}>
          {links.map(({ label, href, key }) => {
            const hasMM = key === 'services' || key === 'projects';
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <div key={key}
                style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
                onMouseEnter={() => hasMM ? openDD(key) : setDropdown(null)}
                onMouseLeave={hasMM ? scheduleClose : undefined}>
                <Link href={href} onClick={() => setDropdown(null)} style={{
                  textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer',
                  color: active ? 'var(--red)' : textColor,
                  fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: isRTL ? '0' : '0.1em',
                  textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 500,
                  padding: '4px 0', display: 'flex', alignItems: 'center', gap: 4,
                  borderBottom: active ? '1px solid var(--red)' : '1px solid transparent',
                  transition: 'all 0.2s',
                }}>
                  {label}
                  {hasMM && <span style={{ fontSize: 7, opacity: 0.55, marginTop: 1 }}>▾</span>}
                </Link>

                {hasMM && dropdown === key && (
                  <div onMouseEnter={() => openDD(key)} onMouseLeave={scheduleClose} style={{
                    position: 'absolute',
                    top: '100%',
                    ...(isRTL ? { right: '50%', transform: 'translateX(50%)' }
                               : { left: '50%', transform: 'translateX(-50%)' }),
                    background: dropBg,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    minWidth: 520, display: 'flex', borderTop: '2px solid var(--red)',
                    animation: 'dropIn 0.18s ease',
                    ...megaMenuFlex,
                  }}>
                    <div style={{ flex: 1, padding: '1rem 0' }}>
                      {MEGA_MENUS[key as 'services' | 'projects'].items.map((item, i) => {
                        const search = 'section' in item
                          ? `section=${item.section}`
                          : 'filter' in item
                            ? `filter=${(item as { filter: string }).filter}`
                            : '';
                        return (
                          <button key={i} onClick={() => nav(`/${locale}${item.href.startsWith('/') ? '' : '/'}${item.href.replace(/^\//, '')}`, search)} style={{
                            display: 'block', width: '100%',
                            textAlign: isRTL ? 'right' : 'left',
                            background: 'none', border: 'none', cursor: 'pointer',
                            padding: '0.65rem 1.25rem',
                            borderLeft: isRTL ? 'none' : '2px solid transparent',
                            borderRight: isRTL ? '2px solid transparent' : 'none',
                            transition: 'all 0.15s',
                          }}
                            onMouseEnter={e => {
                              e.currentTarget.style[isRTL ? 'borderRightColor' : 'borderLeftColor'] = 'var(--red)';
                              e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)';
                              if ('img' in item && item.img) setHoveredImg(item.img as string);
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style[isRTL ? 'borderRightColor' : 'borderLeftColor'] = 'transparent';
                              e.currentTarget.style.background = 'none';
                              setHoveredImg(null);
                            }}>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600, color: dropFg, marginBottom: 1 }}>{item.title}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: dropFg, opacity: 0.68 }}>{item.desc}</div>
                          </button>
                        );
                      })}
                      {'cta' in MEGA_MENUS[key as 'projects'] && (
                        <div style={{
                          padding: '0.65rem 1.25rem',
                          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
                          marginTop: '0.2rem',
                          textAlign: isRTL ? 'right' : 'left',
                        }}>
                          <Link href={`/${locale}${href.replace(`/${locale}`, '')}`} onClick={() => setDropdown(null)}
                            style={{ color: 'var(--red)', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
                            {(MEGA_MENUS.projects as typeof MEGA_MENUS.projects).cta} {isRTL ? '←' : '→'}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Phone number — high-intent users */}
          {!isRTL && (
            <a href="tel:+96824693300" style={{
              color: textColor, textDecoration: 'none',
              fontFamily: 'var(--font-body)', fontSize: 11.5, fontWeight: 500,
              letterSpacing: '0.04em', opacity: 0.75,
              transition: 'opacity 0.2s', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.75')}>
              +968 24 693300
            </a>
          )}

          {/* Language switcher */}
          <button
            onClick={() => router.push(switchLocalePath())}
            title={isRTL ? 'Switch to English' : 'التبديل إلى العربية'}
            style={{
              background: 'none',
              border: `1px solid ${scrolled
                ? (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(28,22,17,0.2)')
                : 'rgba(255,255,255,0.3)'}`,
              cursor: 'pointer',
              color: textColor,
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              letterSpacing: '0.06em',
              fontWeight: 600,
              padding: '6px 14px',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = scrolled
                ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(28,22,17,0.06)')
                : 'rgba(255,255,255,0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'none';
            }}>
            {isRTL ? 'English' : 'العربية'}
          </button>

          {/* Get a Quote CTA */}
          <button onClick={openQuote} style={{
            background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontSize: 11,
            letterSpacing: isRTL ? '0' : '0.14em',
            textTransform: isRTL ? 'none' : 'uppercase',
            fontWeight: 600, padding: '10px 22px', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            {t('quote')}
          </button>
        </div>

        {/* Hamburger — mobile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Mobile language switcher */}
          <button
            onClick={() => router.push(switchLocalePath())}
            className="mobile-nav-btn"
            style={{
              background: 'none', border: `1px solid ${scrolled ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.3)'}`,
              cursor: 'pointer', color: textColor,
              fontFamily: 'var(--font-body)', fontSize: 10.5, fontWeight: 600,
              padding: '5px 11px', display: 'none',
            }}>
            {isRTL ? 'EN' : 'AR'}
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-nav-btn" style={{
            background: 'none', border: 'none', cursor: 'pointer', display: 'none',
            flexDirection: 'column', gap: 5, padding: 4,
          }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 1.5, background: textColor, transition: 'all 0.3s', transformOrigin: 'center',
                transform: menuOpen ? (i === 0 ? 'translateY(6.5px) rotate(45deg)' : i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'scaleX(0)') : 'none',
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          background: isDark ? '#0f0f0f' : '#fff',
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(28,22,17,0.08)'}`,
          padding: '1.5rem clamp(1.25rem,5vw,4rem)',
          textAlign: isRTL ? 'right' : 'left',
        }}>
          {links.map(({ label, href }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', textDecoration: 'none', color: isDark ? '#fff' : '#1c1611',
              fontFamily: 'var(--font-body)', fontSize: 14,
              letterSpacing: isRTL ? '0' : '0.08em',
              textTransform: isRTL ? 'none' : 'uppercase',
              fontWeight: 500,
              padding: '13px 0', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(28,22,17,0.06)'}`,
            }}>{label}</Link>
          ))}
          <button onClick={() => { openQuote(); setMenuOpen(false); }} style={{
            marginTop: '1.5rem', width: '100%', background: 'var(--red)', color: '#fff', border: 'none',
            cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 12,
            letterSpacing: isRTL ? '0' : '0.14em',
            textTransform: isRTL ? 'none' : 'uppercase',
            fontWeight: 600, padding: '14px',
          }}>{t('quote')}</button>
        </div>
      )}
    </nav>
  );
}
