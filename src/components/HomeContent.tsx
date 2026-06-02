'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { SectionLabel } from '@/components/SectionLabel';
import { CountUp } from '@/components/CountUp';
import { useQuote } from '@/components/QuoteContext';
import { useReveal } from '@/hooks/useReveal';
import { IMGS, COMPLETED_PROJECTS, SERVICES, TESTIMONIALS } from '@/lib/data';

export function HomeContent() {
  const t = useTranslations();
  const locale = useLocale();
  const { openQuote } = useQuote();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [heroReady, setHeroReady] = useState(false);

  const statsRef    = useReveal('reveal', 0.2);
  const trustRef    = useReveal('reveal', 0.1);
  const svcHdrRef   = useReveal('reveal', 0.1);
  const svcGridRef  = useRef<HTMLDivElement>(null);
  const projHdrRef  = useReveal('reveal', 0.1);
  const projGridRef = useRef<HTMLDivElement>(null);
  const testimRef   = useReveal('reveal', 0.15);
  const ctaRef      = useReveal('reveal', 0.12);

  // Staggered reveal for grid children
  useEffect(() => {
    const DELAYS = [0, 90, 180, 270];
    function observeGrid(gridRef: React.RefObject<HTMLDivElement>) {
      const el = gridRef.current;
      if (!el) return () => {};
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) return () => {};
      const children = Array.from(el.children) as HTMLElement[];
      children.forEach(child => { child.style.opacity = '0'; child.style.transform = 'scale(0.97)'; child.style.filter = 'blur(4px)'; child.style.transition = 'none'; });
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => {
              child.style.transition = 'opacity 0.78s cubic-bezier(0.16,1,0.3,1), transform 0.78s cubic-bezier(0.16,1,0.3,1), filter 0.78s cubic-bezier(0.16,1,0.3,1)';
              child.style.opacity = '1';
              child.style.transform = 'scale(1)';
              child.style.filter = 'blur(0px)';
            }, DELAYS[i] ?? i * 90);
          });
          obs.disconnect();
        }
      }, { threshold: 0.08 });
      obs.observe(el);
      return () => obs.disconnect();
    }
    const c1 = observeGrid(svcGridRef as React.RefObject<HTMLDivElement>);
    const c2 = observeGrid(projGridRef as React.RefObject<HTMLDivElement>);
    return () => { c1(); c2(); };
  }, []);

  useEffect(() => { const t = setTimeout(() => setHeroReady(true), 100); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const featuredProjects = COMPLETED_PROJECTS.slice(0, 3);

  const stats = [
    { n: 28,  suffix: '+', label: t('stats.years') },
    { n: 20, suffix: '+', label: t('stats.projects')  },
    { n: 3,   suffix: '',  label: t('stats.divisions')      },
    { n: 600, suffix: '+', label: t('stats.professionals') },
  ];

  const isRTL = locale === 'ar';

  const trustPillars = isRTL
    ? [
        { label: 'الجودة',     title: 'معتمد ISO',           sub: 'أنظمة إدارة الجودة وفق المعايير الدولية' },
        { label: 'الإرث',      title: 'إرث يمتد 28+ عاماً', sub: 'سجل حافل منذ 1997، مشروعاً تلو الآخر' },
        { label: 'التسليم',    title: 'تسليم شامل',           sub: 'من التصميم حتى التسليم — فريق واحد متكامل' },
        { label: 'الخبرة',     title: 'خبرة عمانية أولاً',   sub: 'معرفة محلية عميقة وعلاقات راسخة وإتقان تنظيمي' },
      ]
    : [
        { label: 'Established', title: 'Since 1997',       sub: 'Twenty-eight years of continuous operation across Oman — no restructuring, no ownership change, no gap in delivery.' },
        { label: 'Integrated',  title: 'One Contract',     sub: 'Structure, MEP, and Finishing executed in-house. One contract: one point of accountability, zero interface risk.' },
        { label: 'Certified',   title: 'ISO 9001:2015',    sub: 'Quality management systems independently audited since 2010. Certificate available on request.' },
        { label: 'Capacity',    title: '600+ Personnel',   sub: 'Civil engineers, MEP engineers, supervisors, and skilled tradespeople — employed directly, not agency-sourced.' },
      ];

  const heroIn = (delay: number): React.CSSProperties => ({
    opacity: heroReady ? 1 : 0,
    transform: heroReady ? 'translateY(0)' : 'translateY(20px)',
    filter: heroReady ? 'blur(0px)' : 'blur(7px)',
    transition: `opacity 0.95s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.95s cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 0.95s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <main>

      {/* ─────────── HERO — THE MASTHEAD ─────────── */}
      <section style={{ position: 'relative', minHeight: '100dvh', overflow: 'hidden' }}>

        {/* Full-bleed video — poster shows instantly before first frame */}
        <video autoPlay muted loop playsInline poster="/images/structure-hero.jpg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', background: '#000' }}>
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>


        {/* Gradient: minimal veil at top, heavy vignette at bottom */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 48%, rgba(0,0,0,0.72) 75%, rgba(0,0,0,0.92) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Masthead strip — bottom-anchored */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: 'clamp(2.5rem,4vw,4rem) clamp(2rem,5vw,5rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '2rem',
          flexWrap: 'wrap',
        }}>
          {/* Left — headline */}
          <div style={{ ...heroIn(120) }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: '1.25rem',
              flexDirection: isRTL ? 'row-reverse' : 'row',
            }}>
              <div style={{ width: 22, height: 1.5, background: 'var(--red)', flexShrink: 0 }} />
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: 9,
                letterSpacing: isRTL ? '0' : '0.22em',
                textTransform: isRTL ? 'none' : 'uppercase',
                color: 'rgba(245,240,232,0.55)', fontWeight: 500,
              }}>
                {isRTL ? 'البناء للإنشاءات والصناعة · مسقط' : 'Al Binaa Construction & Industry · Muscat'}
              </span>
            </div>
            {/* SEO H1 — keyword-rich, visually hidden */}
            <h1 className="sr-only">
              {isRTL
                ? 'مقاول عام في مسقط، عُمان — هيكل إنشائي وأنظمة MEP وتشطيبات داخلية منذ 1997'
                : 'General Contractor in Muscat, Oman — Civil, MEP & Interior Finishing Since 1997'}
            </h1>
            {/* Visual display headline */}
            <p aria-hidden="true" style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(3.2rem,6.5vw,7rem)',
              color: '#F5F0E8',
              margin: 0,
              lineHeight: 0.95,
              letterSpacing: isRTL ? '0' : '0.02em',
              textAlign: isRTL ? 'right' : 'left',
            }}>
              {isRTL
                ? (<>{t('hero.title').split('\n')[0]}<br /><span style={{ color: 'var(--red)' }}>{t('hero.title').split('\n')[1]}</span></>)
                : (<>Built to Last<br />in <span style={{ color: 'var(--red)' }}>Oman.</span></>)
              }
            </p>
          </div>

          {/* Right — trust badges + CTA */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: isRTL ? 'flex-start' : 'flex-end',
            gap: '1.25rem',
            ...heroIn(240),
          }}>
            {/* Primary CTA */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: isRTL ? 'flex-start' : 'flex-end' }}>
              <button onClick={openQuote} className="btn-press"
                style={{ background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.18em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 700, padding: '16px 32px', display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                {isRTL ? 'ابدأ الحوار' : 'Begin the Conversation'}
                <span style={{ fontSize: 14 }}>{isRTL ? '←' : '↗'}</span>
              </button>
              <Link href={`/${locale}/projects`} className="btn-press"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', color: '#F5F0E8', border: '1px solid rgba(245,240,232,0.25)', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.18em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 400, padding: '16px 28px', display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'background 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.18)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.1)'; }}>
                {t('hero.cta_primary')}
                <span style={{ fontSize: 14 }}>{isRTL ? '←' : '→'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip — immediately below hero */}
      <div ref={statsRef as React.RefObject<HTMLDivElement>}
        style={{
          background: 'rgba(14,11,9,0.96)',
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: 'clamp(1.1rem,1.8vw,1.5rem) 1rem',
            textAlign: 'center',
            borderInlineEnd: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem,1.6vw,1.45rem)', fontWeight: 700, color: i === 1 ? 'var(--red)' : '#F5F0E8', lineHeight: 1, marginBottom: '0.3rem' }}>
              <CountUp end={s.n} />{s.suffix}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.65)', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>


      {/* ─────────── TRUST PILLARS ─────────── */}
      <section style={{ background: 'var(--section-bg)', padding: 'clamp(1.5rem,2.5vw,2rem) clamp(1.5rem,5vw,4rem)', borderBottom: '1px solid rgba(26,22,18,0.12)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div ref={trustRef as React.RefObject<HTMLDivElement>}
            style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '1px', background: 'rgba(26,22,18,0.18)' }}
            className="trust-grid">

            {trustPillars.map((p, i) => (
              <div key={i} style={{ background: 'var(--section-bg)', padding: 'clamp(1.25rem,2vw,1.75rem) clamp(1.5rem,2.5vw,2.25rem)' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: isRTL ? '0' : '0.22em', color: 'var(--red)', marginBottom: '0.6rem', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600 }}>{p.label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.95rem,1.4vw,1.2rem)', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.5rem', lineHeight: 1.2, letterSpacing: isRTL ? '0' : '0.02em' }}>{p.title}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--fg-muted)', lineHeight: 1.7, fontWeight: 400 }}>{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─────────── CLIENTS STRIP — marquee ─────────── */}
      <section style={{ background: 'var(--alt-bg)', padding: 'clamp(2rem,3.5vw,2.75rem) 0', borderBottom: '1px solid rgba(26,22,18,0.1)', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-subtle)', marginBottom: '1.5rem', fontWeight: 600 }}>
          Trusted By
        </div>
        {/* Fade masks on left + right edges */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to right, var(--alt-bg), transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to left, var(--alt-bg), transparent)', zIndex: 2, pointerEvents: 'none' }} />
          {/* Track — duplicated for seamless loop */}
          <div className="marquee-track" style={{ display: 'flex', alignItems: 'center', gap: '5rem', width: 'max-content', background: 'var(--alt-bg)' }}>
            {[
              { src: '/images/clients/aqar-logo.png',           alt: 'AQAR — Al Khonji Real Estate',             multiply: false },
              { src: '/images/clients/oman-hotels-logo.svg',    alt: 'Oman Hotels',                              multiply: false },
              { src: '/images/clients/al-khonji-logo.svg',      alt: 'Al Khonji Group',                          multiply: false },
              { src: '/images/clients/logo-ministry-en.png',    alt: 'Ministry of Health — Sultanate of Oman',   multiply: true  },
              { src: '/images/clients/images.png',              alt: 'Moosa Abdul Rahman Hassan & Co. LLC',      multiply: true  },
              // duplicate set for seamless loop
              { src: '/images/clients/aqar-logo.png',           alt: 'AQAR — Al Khonji Real Estate',             multiply: false },
              { src: '/images/clients/oman-hotels-logo.svg',    alt: 'Oman Hotels',                              multiply: false },
              { src: '/images/clients/al-khonji-logo.svg',      alt: 'Al Khonji Group',                          multiply: false },
              { src: '/images/clients/logo-ministry-en.png',    alt: 'Ministry of Health — Sultanate of Oman',   multiply: true  },
              { src: '/images/clients/images.png',              alt: 'Moosa Abdul Rahman Hassan & Co. LLC',      multiply: true  },
            ].map((logo, i) => (
              <img
                key={`${logo.src}-${i}`}
                src={logo.src}
                alt={logo.alt}
                style={{
                  height: 48,
                  width: 'auto',
                  maxWidth: 180,
                  objectFit: 'contain',
                  flexShrink: 0,
                  opacity: 0.85,
                  mixBlendMode: logo.multiply ? 'multiply' : 'normal',
                  transition: 'opacity 0.22s',
                  display: 'block',
                }}
              />
            ))}
          </div>
        </div>
      </section>


      {/* ─────────── SERVICES ─────────── */}
      <section style={{ background: 'var(--section-bg)', padding: 'clamp(5rem,9vw,9rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div ref={svcHdrRef as React.RefObject<HTMLDivElement>}
            style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start', marginBottom: '3.5rem' }}
            className="svc-header-grid">
            <div>
              <SectionLabel>{t('services.label')}</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem,3.8vw,2.9rem)', fontWeight: 600, color: 'var(--fg)', margin: 0, lineHeight: 1.1, letterSpacing: '0.04em' }}>
                {t('services.heading').split('\n').map((line, i) => (
                  <span key={i}>{line}{i < t('services.heading').split('\n').length - 1 && <br />}</span>
                ))}
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', gap: '1.5rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--fg-muted)', lineHeight: 1.8, maxWidth: 520, fontWeight: 400 }}>
                {t('services.body')}
              </p>
              <div>
                <Link href={`/${locale}/services`} className="btn-press btn-outline" style={outlineBtn}>
                  {t('services.view_all')} {isRTL ? '←' : '→'}
                </Link>
              </div>
            </div>
          </div>

          <div ref={svcGridRef as React.RefObject<HTMLDivElement>}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: 'var(--border-color)' }}
            className="services-grid">
            {SERVICES.map((s, i) => (
              <article key={s.key} className="card-hover-wrap"
                onMouseEnter={() => setHoveredCard(`svc-${i}`)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ background: 'var(--card-bg)', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
                {/* Image */}
                <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
                  <img src={s.img} alt={s.title} className="card-img" loading={i === 0 ? 'eager' : 'lazy'} width={600} height={320} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,8,6,0.6) 0%, rgba(10,8,6,0.1) 50%, transparent 100%)', pointerEvents: 'none' }} />
                  {/* Number badge */}
                  <div style={{ position: 'absolute', top: '1.25rem', left: isRTL ? 'auto' : '1.5rem', right: isRTL ? '1.5rem' : 'auto', fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', background: 'rgba(0,0,0,0.3)', padding: '3px 9px', backdropFilter: 'blur(4px)' }}>{s.num}</div>
                  {/* Hover overlay */}
                  <div className="card-hover-overlay">
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '0.5rem' }}>{isRTL ? 'قسم' : 'Division'}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '0.75rem' }}>{isRTL ? s.titleAr : s.title}</div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', fontWeight: 600 }}>{t('common.learn_more')} {isRTL ? '←' : '→'}</span>
                  </div>
                </div>
                {/* Label */}
                <div style={{ padding: '1.5rem 1.75rem 1.75rem', borderTop: '2px solid var(--red)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: hoveredCard === `svc-${i}` ? 'var(--red)' : 'var(--fg)', margin: '0 0 0.4rem', lineHeight: 1.1, transition: 'color 0.22s', letterSpacing: isRTL ? '0' : '0.03em' }}>{isRTL ? s.titleAr : s.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.7, margin: 0, fontWeight: 400 }}>{isRTL ? s.taglineAr : s.tagline}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* ─────────── FEATURED PROJECTS ─────────── */}
      <section style={{ background: 'var(--alt-bg)', padding: 'clamp(5rem,9vw,9rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div ref={projHdrRef as React.RefObject<HTMLDivElement>}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <SectionLabel>{t('projects_section.label')}</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem,3.8vw,2.9rem)', fontWeight: 600, color: 'var(--fg)', margin: 0, lineHeight: 1.1, letterSpacing: '0.04em' }}>
                {t('projects_section.heading').split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h2>
            </div>
            <Link href={`/${locale}/projects`} className="btn-press btn-outline" style={outlineBtn}>
              {t('projects_section.view_all')} {isRTL ? '←' : '→'}
            </Link>
          </div>

          {/* Asymmetric grid: hero card left (2fr), two stacked cards right (1fr) */}
          <div ref={projGridRef as React.RefObject<HTMLDivElement>}
            style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2px', background: 'var(--border-color)' }}
            className="projects-grid">

            {/* Hero card — spans full height on the left */}
            {featuredProjects[0] && (() => { const p = featuredProjects[0]; const i = 0; return (
              <article key={p.id} className="card-hover-wrap"
                onMouseEnter={() => setHoveredCard(`proj-${i}`)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ background: 'var(--card-bg)', overflow: 'hidden', cursor: 'pointer', gridRow: '1 / 3', display: 'flex', flexDirection: 'column', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)' }}>
                <div style={{ position: 'relative', flex: 1, minHeight: 420, overflow: 'hidden' }}>
                  <img src={p.img} alt={`${p.title} — Al Binaa Construction`} className="card-img" loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.65s cubic-bezier(0.16,1,0.3,1)', transform: hoveredCard === `proj-${i}` ? 'scale(1.04)' : 'scale(1)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: '1.5rem', insetInlineStart: '1.5rem', background: 'var(--red)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: isRTL ? '0' : '0.15em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600, padding: '4px 11px' }}>
                    {isRTL ? ({ Residential: 'سكني', Commercial: 'تجاري', Hospitality: 'ضيافة' } as Record<string,string>)[p.category] ?? p.category : p.category}
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, insetInlineStart: 0, insetInlineEnd: 0, padding: '2rem 2rem 2rem' }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '0.5rem' }}>{isRTL ? (p as any).locationAr ?? p.location : p.location}</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,2.4vw,2rem)', fontWeight: 600, color: '#fff', margin: '0 0 0.6rem', lineHeight: 1.05, letterSpacing: isRTL ? '0' : '0.04em' }}>{p.title}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: '0 0 1.25rem', fontWeight: 400, maxWidth: '52ch' }}>{(isRTL ? ((p as any).descAr ?? p.desc) : p.desc).slice(0, 130)}…</p>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 9.5, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.year} · {isRTL ? (p as any).clientAr ?? p.client : p.client}</div>
                  </div>
                </div>
              </article>
            ); })()}

            {/* Two stacked cards on the right */}
            {featuredProjects.slice(1).map((p, idx) => { const i = idx + 1; return (
              <article key={p.id} className="card-hover-wrap"
                onMouseEnter={() => setHoveredCard(`proj-${i}`)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ background: 'var(--card-bg)', overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                  <img src={p.img} alt={`${p.title} — Al Binaa Construction`} className="card-img" loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.65s cubic-bezier(0.16,1,0.3,1)', transform: hoveredCard === `proj-${i}` ? 'scale(1.05)' : 'scale(1)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.58) 0%, transparent 55%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: '1rem', insetInlineStart: '1rem', background: 'var(--red)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 8.5, letterSpacing: isRTL ? '0' : '0.15em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600, padding: '3px 9px' }}>
                    {isRTL ? ({ Residential: 'سكني', Commercial: 'تجاري', Hospitality: 'ضيافة' } as Record<string,string>)[p.category] ?? p.category : p.category}
                  </div>
                  <div style={{ position: 'absolute', bottom: '0.75rem', insetInlineStart: '1rem', fontFamily: 'var(--font-body)', fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.year}</div>
                </div>
                <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--border-color)', textAlign: isRTL ? 'right' : 'left' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.12em', textTransform: isRTL ? 'none' : 'uppercase', color: 'var(--fg-muted)', marginBottom: '0.3rem', fontWeight: 500 }}>{isRTL ? (p as any).locationAr ?? p.location : p.location}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: hoveredCard === `proj-${i}` ? 'var(--red)' : 'var(--fg)', margin: '0 0 0.3rem', lineHeight: 1.2, transition: 'color 0.22s', letterSpacing: isRTL ? '0' : '0.04em' }}>{p.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--fg-muted)', lineHeight: 1.65, margin: 0, fontWeight: 400 }}>{(isRTL ? ((p as any).descAr ?? p.desc) : p.desc).slice(0, 70)}…</p>
                </div>
              </article>
            ); })}
          </div>
        </div>
      </section>


      {/* ─────────── HOW WE WORK ─────────── */}
      <section style={{ background: 'var(--section-bg)', padding: 'clamp(4.5rem,8vw,7rem) clamp(1.5rem,5vw,4rem)', borderTop: '1px solid rgba(26,22,18,0.09)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(2.5rem,4vw,4rem)', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <SectionLabel>{isRTL ? 'كيف نعمل' : 'How We Work'}</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 600, color: 'var(--fg)', margin: 0, lineHeight: 1.1, letterSpacing: '0.04em' }}>
                {isRTL ? 'من الفكرة إلى التسليم' : 'From Brief to Handover'}
              </h2>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--fg-muted)', maxWidth: 340, lineHeight: 1.75, margin: 0, fontWeight: 400 }}>
              {isRTL
                ? 'أربع مراحل واضحة. فريق واحد. لا فجوات في المسؤولية.'
                : 'Four clear phases. One team. No gaps in accountability.'}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(26,22,18,0.12)' }} className="stats-grid">
            {(isRTL ? [
              { n: '04', title: 'التسليم', desc: 'فحص الأعمال وإصلاح العيوب والتفتيش النهائي للجودة قبل تسليم المفاتيح.' },
              { n: '03', title: 'التنفيذ', desc: 'أقسامنا الثلاثة — الإنشاء وMEP والتشطيبات — تحت إدارة موقع واحدة.' },
              { n: '02', title: 'التصميم والتصاريح', desc: 'مهندسونا يُنتجون مخططات جاهزة للتصريح ويتولون تقديم الموافقات الرسمية.' },
              { n: '01', title: 'الاستشارة الأولية', desc: 'نزور الموقع ونقيّم النطاق ونضع خطة العمل قبل رسم أي مخطط.' },
            ] : [
              { n: '01', title: 'Brief & Site Assessment', desc: 'We visit the site, assess scope, and align on requirements before a drawing is made.' },
              { n: '02', title: 'Design & Permits',        desc: 'Our in-house engineers produce permit-ready drawings and manage all authority submissions.' },
              { n: '03', title: 'Build',                   desc: 'Our three divisions — Structure, MEP, and Finishing — work under one site team.' },
              { n: '04', title: 'Handover',                desc: 'Snagging, commissioning, and final quality inspection before keys are handed over.' },
            ]).map((step, i) => (
              <div key={step.n} style={{ background: 'var(--section-bg)', padding: 'clamp(1.75rem,2.5vw,2.5rem)', textAlign: isRTL ? 'right' : 'left' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--red)', opacity: 0.18, lineHeight: 1, marginBottom: '1.25rem', letterSpacing: '0.04em' }}>{step.n}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.95rem,1.4vw,1.1rem)', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.65rem', letterSpacing: '0.03em' }}>{step.title}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.75, fontWeight: 400 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─────────── TESTIMONIAL ─────────── */}
      <section ref={testimRef as React.RefObject<HTMLElement>}
        style={{ background: 'var(--testimonial-bg)', padding: 'clamp(5rem,10vw,9rem) clamp(1.5rem,5vw,4rem)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: '-2rem', left: 'clamp(1.5rem,5vw,4rem)', fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem,19vw,16rem)', fontWeight: 700, color: 'var(--quote-mark-color)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: '0.02em' }}>"</div>
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem' }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} aria-label={`Testimonial ${i + 1}`}
                style={{
                  position: 'relative', overflow: 'hidden',
                  width: i === activeTestimonial ? 36 : 8, height: 2.5,
                  background: 'var(--border-strong)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'width 0.38s cubic-bezier(0.16,1,0.3,1)',
                  flexShrink: 0,
                }}>
                {i === activeTestimonial && (
                  <span key={`fill-${activeTestimonial}`} style={{
                    position: 'absolute', inset: 0,
                    background: 'var(--red)',
                    transformOrigin: 'left center',
                    animation: 'testimonialProgress 4s linear forwards',
                  }} />
                )}
              </button>
            ))}
          </div>
          <blockquote style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.05rem,1.85vw,1.45rem)', fontWeight: 400, color: 'var(--testimonial-fg)', lineHeight: 1.8, margin: '0 0 2.5rem', fontStyle: 'italic', letterSpacing: '0.01em' }}>
            &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
          </blockquote>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 36, height: 1.5, background: 'var(--red)', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--testimonial-fg)', marginBottom: 3 }}>{TESTIMONIALS[activeTestimonial].author}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-muted)', fontWeight: 400 }}>{TESTIMONIALS[activeTestimonial].title}, {TESTIMONIALS[activeTestimonial].company}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 9.5, letterSpacing: '0.12em', color: 'var(--red)', marginTop: 4, textTransform: 'uppercase', fontWeight: 500 }}>{TESTIMONIALS[activeTestimonial].project} · {TESTIMONIALS[activeTestimonial].year}</div>
            </div>
          </div>
        </div>
      </section>


      {/* ─────────── CTA BAND ─────────── */}
      <section ref={ctaRef as React.RefObject<HTMLElement>}
        style={{ background: '#2C2318', padding: 'clamp(4.5rem,9vw,8rem) clamp(1.5rem,5vw,4rem)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', right: '-3%', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem,22vw,19rem)', fontWeight: 700, color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none', letterSpacing: '0.06em' }}>{isRTL ? 'بناء' : 'BUILD'}</div>
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 640 }}>
            <SectionLabel inverted>{isRTL ? 'عقد واحد' : 'One Contract'}</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem,4.2vw,3.25rem)', fontWeight: 600, color: '#F5F0E8', margin: '0 0 1.25rem', lineHeight: 1.1, letterSpacing: '0.04em' }}>
              {isRTL
                ? <>معظم المشاريع تفشل عند<br />نقاط التقاء المقاولين.<br /><span style={{ color: 'var(--red)' }}>مشاريعنا لا.</span></>
                : <>Most projects fail where<br />contractors hand off to each other.<br /><span style={{ color: 'var(--red)' }}>Ours don&apos;t.</span></>}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'rgba(245,240,232,0.80)', margin: '0 0 2.75rem', lineHeight: 1.8, maxWidth: 500, fontWeight: 400 }}>
              {isRTL ? 'لا تسليم بين جهات. لا فجوات في المساءلة. أخبرنا عن مشروعك.' : 'No handoffs. No coordination gaps. Tell us about your project.'}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={openQuote} className="btn-press btn-white-on-red" style={{ background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, padding: '15px 28px 15px 34px', transition: 'opacity 0.22s', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                {isRTL ? 'ابدأ الحوار' : 'Begin the Conversation'}
                <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>
                  {isRTL ? '←' : '↗'}
                </span>
              </button>
              <Link href={`/${locale}/projects`} className="btn-press btn-outline-inv" style={{ background: 'transparent', color: 'rgba(245,240,232,0.8)', border: '1px solid rgba(245,240,232,0.22)', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, padding: '15px 28px 15px 34px', display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'border-color 0.22s, background 0.22s' }}>
                {t('projects_section.view_all')}
                <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>
                  {isRTL ? '←' : '→'}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

/* ── Style constants ── */
const outlineBtn: React.CSSProperties = {
  background: 'none', border: '1px solid var(--border-strong)', color: 'var(--fg)',
  textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: 10.5,
  letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500,
  padding: '12px 24px', display: 'inline-block', transition: 'all 0.22s', whiteSpace: 'nowrap',
  cursor: 'pointer',
};
