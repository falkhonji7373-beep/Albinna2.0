'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { PageBanner } from '@/components/PageBanner';
import { SectionLabel } from '@/components/SectionLabel';
import { useQuote } from '@/components/QuoteContext';
import { IMGS, COMPLETED_PROJECTS, ONGOING_PROJECTS } from '@/lib/data';

type Tab      = 'completed' | 'ongoing';
type Category = 'All' | 'Residential' | 'Private Villas' | 'Commercial' | 'Hospitality';
const CATEGORIES: Category[] = ['All', 'Residential', 'Private Villas', 'Commercial', 'Hospitality'];

export function ProjectsContent() {
  const { openQuote } = useQuote();
  const tc            = useTranslations('common');
  const locale        = useLocale();
  const isRTL         = locale === 'ar';

  const [tab,     setTab]     = useState<Tab>('completed');
  const [cat,     setCat]     = useState<Category>('All');
  const [hovered, setHovered] = useState<string | null>(null);

  // Animated clip-path tab bar (AnimatedTabs pattern from 21st.dev)
  const tabContainerRef  = useRef<HTMLDivElement>(null);
  const completedBtnRef  = useRef<HTMLButtonElement>(null);
  const ongoingBtnRef    = useRef<HTMLButtonElement>(null);
  const [clipPath, setClipPath] = useState('inset(0 50% 0 0%)');

  useEffect(() => {
    const container = tabContainerRef.current;
    const activeBtn = tab === 'completed' ? completedBtnRef.current : ongoingBtnRef.current;
    if (!container || !activeBtn) return;
    const cRect = container.getBoundingClientRect();
    const bRect = activeBtn.getBoundingClientRect();
    const clipL = ((bRect.left  - cRect.left)  / cRect.width) * 100;
    const clipR = 100 - ((bRect.right - cRect.left) / cRect.width) * 100;
    setClipPath(`inset(0 ${clipR.toFixed(2)}% 0 ${clipL.toFixed(2)}%)`);
  }, [tab]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get('filter');
    if (filter === 'Ongoing')  { setTab('ongoing');   setCat('All'); }
    else if (filter)           { setTab('completed'); setCat(filter as Category); }
  }, []);

  const projects = tab === 'completed' ? COMPLETED_PROJECTS : ONGOING_PROJECTS;
  const visible  = cat === 'All' ? projects : projects.filter(p => p.category === cat);

  const CAT_LABELS: Record<Category, string> = isRTL
    ? { All: 'الكل', Residential: 'سكني', 'Private Villas': 'فلل خاصة', Commercial: 'تجاري', Hospitality: 'ضيافة' }
    : { All: 'All', Residential: 'Residential', 'Private Villas': 'Private Villas', Commercial: 'Commercial', Hospitality: 'Hospitality' };

  return (
    <main>
      <PageBanner
        title={isRTL ? 'مشاريعنا' : 'Our Projects'}
        img={IMGS.residential2}
      />

      <section style={{ background: 'var(--section-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          {/* Animated clip-path tab selector (AnimatedTabs pattern — no external libs) */}
          <div style={{ position: 'relative', display: 'inline-flex', marginBottom: '2.5rem', flexDirection: isRTL ? 'row-reverse' : 'row' }} ref={tabContainerRef}>
            {/* Active overlay layer — clips to show only the active tab in red */}
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0,
              background: 'var(--red)',
              clipPath,
              transition: 'clip-path 0.32s cubic-bezier(0.16,1,0.3,1)',
              pointerEvents: 'none',
              zIndex: 1,
              display: 'flex',
              flexDirection: isRTL ? 'row-reverse' : 'row',
            }}>
              {(['completed', 'ongoing'] as Tab[]).map(t => (
                <div key={t} style={{
                  color: '#fff',
                  fontFamily: 'var(--font-body)', fontSize: 11,
                  letterSpacing: isRTL ? '0' : '0.14em',
                  textTransform: isRTL ? 'none' : 'uppercase',
                  fontWeight: 600, padding: '12px 28px', whiteSpace: 'nowrap',
                  userSelect: 'none',
                }}>
                  {isRTL
                    ? (t === 'completed' ? `مكتملة (${COMPLETED_PROJECTS.length})` : `جارية (${ONGOING_PROJECTS.length})`)
                    : (t === 'completed' ? `Completed (${COMPLETED_PROJECTS.length})` : `Ongoing (${ONGOING_PROJECTS.length})`)}
                </div>
              ))}
            </div>
            {/* Base clickable layer */}
            {(['completed', 'ongoing'] as Tab[]).map(t => (
              <button key={t}
                ref={t === 'completed' ? completedBtnRef : ongoingBtnRef}
                onClick={() => { setTab(t); setCat('All'); }}
                style={{
                  position: 'relative', zIndex: 0,
                  background: 'var(--card-bg)',
                  color: 'var(--fg-muted)',
                  border: '1px solid var(--border-color)', cursor: 'pointer',
                  fontFamily: 'var(--font-body)', fontSize: 11,
                  letterSpacing: isRTL ? '0' : '0.14em',
                  textTransform: isRTL ? 'none' : 'uppercase',
                  fontWeight: 600, padding: '12px 28px', whiteSpace: 'nowrap',
                }}>
                {isRTL
                  ? (t === 'completed' ? `مكتملة (${COMPLETED_PROJECTS.length})` : `جارية (${ONGOING_PROJECTS.length})`)
                  : (t === 'completed' ? `Completed (${COMPLETED_PROJECTS.length})` : `Ongoing (${ONGOING_PROJECTS.length})`)}
              </button>
            ))}
          </div>

          {/* Ongoing notice */}
          {tab === 'ongoing' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem', padding: '0.875rem 1.25rem', background: 'var(--alt-bg)', borderInlineStart: '3px solid var(--red)', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--fg-muted)' }}>
                {isRTL
                  ? 'الصور المعروضة هي مخططات معمارية مفاهيمية. مواقع المشاريع تحت الإنشاء النشط.'
                  : 'Images shown are architectural concept renders. Project sites are under active construction.'}
              </span>
            </div>
          )}

          {/* Category filter pills */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem', flexWrap: 'wrap', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                background: cat === c ? 'var(--red)' : 'none',
                color: cat === c ? '#fff' : 'var(--fg-muted)',
                border: `1px solid ${cat === c ? 'var(--red)' : 'var(--border-strong)'}`,
                cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11,
                letterSpacing: isRTL ? '0' : '0.12em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 500,
                padding: '7px 18px',
                transition: 'background 0.22s ease, color 0.22s ease, border-color 0.22s ease, transform 0.15s ease',
                transform: cat === c ? 'scale(1)' : 'scale(1)',
              }}
              onMouseEnter={e => { if (cat !== c) { e.currentTarget.style.borderColor = 'var(--fg-muted)'; e.currentTarget.style.color = 'var(--fg)'; } }}
              onMouseLeave={e => { if (cat !== c) { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--fg-muted)'; } }}
              >{CAT_LABELS[c]}</button>
            ))}
          </div>

          {/* Grid */}
          {visible.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', borderTop: '1px solid var(--border-color)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)' }}>
                {isRTL ? 'لا توجد مشاريع في هذه الفئة.' : 'No projects found in this category.'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px', background: 'var(--border-color)' }} className="projects-grid">
              {visible.map((p) => (
                <article key={p.id}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ background: 'var(--card-bg)', overflow: 'hidden', position: 'relative', cursor: tab === 'completed' ? 'pointer' : 'default' }}>
                  {tab === 'completed' && (
                    <Link href={`/${locale}/projects/${p.id}`} aria-label={p.title}
                      style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
                  )}
                  <div style={{ position: 'relative', height: 270, overflow: 'hidden' }}>
                    <img src={p.img} alt={p.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.65s', transform: hovered === p.id ? 'scale(1.06)' : 'scale(1)',
                        filter: tab === 'ongoing' ? 'brightness(0.78) saturate(0.45) contrast(1.08) hue-rotate(195deg)' : 'none',
                      }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />

                    <div style={{ position: 'absolute', top: '1.25rem', insetInlineStart: '1.25rem', background: 'var(--red)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 9.5, letterSpacing: isRTL ? '0' : '0.1em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600, padding: '4px 9px' }}>{isRTL ? CAT_LABELS[p.category as keyof typeof CAT_LABELS] : p.category}</div>

                    {tab === 'ongoing' && (
                      <div style={{ position: 'absolute', top: '1.25rem', insetInlineEnd: '1.25rem', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body)', fontSize: 8.5, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, padding: '4px 9px', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#f0a500', animation: 'pulse 2s infinite' }} />
                        {isRTL ? 'تصور مفاهيمي' : 'Concept Render'}
                      </div>
                    )}

                    <div style={{ position: 'absolute', bottom: '1rem', insetInlineStart: '1.25rem', fontFamily: 'var(--font-body)', fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{p.year}</div>
                  </div>
                  <div style={{ padding: '1.5rem 2rem', textAlign: isRTL ? 'right' : 'left' }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: isRTL ? '0' : '0.12em', textTransform: isRTL ? 'none' : 'uppercase', color: 'var(--fg-muted)', marginBottom: '0.35rem' }}>{isRTL ? (p as any).locationAr ?? p.location : p.location}</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--fg)', margin: '0 0 0.35rem', lineHeight: 1.1 }}>{p.title}</h3>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--fg-muted)', marginBottom: '0.75rem', fontStyle: 'italic' }}>{isRTL ? (p as any).clientAr ?? p.client : p.client}</div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.65, margin: '0 0 1rem' }}>{(isRTL ? ((p as any).descAr ?? p.desc) : p.desc).slice(0, 110)}…</p>
                    <div style={{ display: 'flex', justifyContent: isRTL ? 'flex-start' : 'flex-end' }}>
                      <button onClick={openQuote} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: isRTL ? 'none' : 'uppercase', color: 'var(--red)', fontWeight: 600, padding: 0 }}>
                        {tc('enquire')}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div style={{ marginTop: '4rem', padding: '2.5rem 3rem', background: 'var(--alt-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <div>
              <SectionLabel>{isRTL ? 'اعمل معنا' : 'Work With Us'}</SectionLabel>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, color: 'var(--fg)', margin: 0 }}>
                {isRTL ? 'لديك مشروع في ذهنك؟' : 'Have a Project in Mind?'}
              </h3>
            </div>
            <button onClick={openQuote} style={{ background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.14em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600, padding: '14px 32px', whiteSpace: 'nowrap', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              {tc('get_free_quote')}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

