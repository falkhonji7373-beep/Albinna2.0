'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageBanner } from '@/components/PageBanner';
import { SectionLabel } from '@/components/SectionLabel';
import { useQuote } from '@/components/QuoteContext';
import { IMGS, COMPLETED_PROJECTS, ONGOING_PROJECTS } from '@/lib/data';

type Tab = 'completed' | 'ongoing';
type Category = 'All' | 'Residential' | 'Commercial' | 'Hospitality';
const CATEGORIES: Category[] = ['All', 'Residential', 'Commercial', 'Hospitality'];

function ProjectsInner() {
  const { openQuote } = useQuote();
  const searchParams = useSearchParams();
  const filterParam = searchParams.get('filter');
  const [tab, setTab] = useState<Tab>(filterParam === 'Ongoing' ? 'ongoing' : 'completed');
  const [cat, setCat] = useState<Category>(
    filterParam && filterParam !== 'Ongoing' ? filterParam as Category : 'All'
  );
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    if (filterParam === 'Ongoing') { setTab('ongoing'); setCat('All'); }
    else if (filterParam) { setTab('completed'); setCat(filterParam as Category); }
  }, [filterParam]);

  const projects = tab === 'completed' ? COMPLETED_PROJECTS : ONGOING_PROJECTS;
  const visible = cat === 'All' ? projects : projects.filter(p => p.category === cat);

  return (
    <main>
      <PageBanner
        title="Our Projects"
        subtitle="150+ completed projects across Oman. Ongoing developments delivering the next generation of spaces."
        img={IMGS.residential2}
      />

      <section style={{ background: 'var(--section-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          {/* ── Tab selector ── */}
          <div style={{ display: 'flex', gap: '1.5px', marginBottom: '2.5rem', background: 'var(--border-color)', width: 'fit-content' }}>
            {(['completed','ongoing'] as Tab[]).map(t => (
              <button key={t} onClick={() => { setTab(t); setCat('All'); }}
                style={{
                  background: tab === t ? 'var(--red)' : 'var(--card-bg)',
                  color: tab === t ? '#fff' : 'var(--fg-muted)',
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.14em',
                  textTransform: 'uppercase', fontWeight: 600, padding: '12px 28px',
                  transition: 'all 0.2s',
                }}>
                {t === 'completed' ? `Completed (${COMPLETED_PROJECTS.length})` : `Ongoing (${ONGOING_PROJECTS.length})`}
              </button>
            ))}
          </div>

          {/* Ongoing notice */}
          {tab === 'ongoing' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem', padding: '0.875rem 1.25rem', background: 'var(--alt-bg)', borderLeft: '3px solid var(--red)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--fg-muted)' }}>Images shown are architectural concept renders. Project sites are under active construction.</span>
            </div>
          )}

          {/* Category filters */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                background: cat === c ? 'var(--red)' : 'none',
                color: cat === c ? '#fff' : 'var(--fg-muted)',
                border: `1px solid ${cat === c ? 'var(--red)' : 'var(--border-color)'}`,
                cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11,
                letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500,
                padding: '8px 18px', transition: 'all 0.2s',
              }}>{c}</button>
            ))}
          </div>

          {/* Grid */}
          {visible.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', borderTop: '1px solid var(--border-color)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)' }}>No projects found in this category.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px', background: 'var(--border-color)' }} className="projects-grid">
              {visible.map((p) => (
                <article key={p.id}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ background: 'var(--card-bg)', overflow: 'hidden', cursor: 'pointer' }}>
                  <div style={{ position: 'relative', height: 270, overflow: 'hidden' }}>
                    <img src={p.img} alt={p.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.65s', transform: hovered === p.id ? 'scale(1.06)' : 'scale(1)',
                        filter: tab === 'ongoing' ? 'brightness(0.78) saturate(0.45) contrast(1.08) hue-rotate(195deg)' : 'none',
                      }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />

                    {/* Category badge */}
                    <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', background: 'var(--red)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, padding: '4px 9px' }}>{p.category}</div>

                    {/* CONCEPT RENDER badge */}
                    {tab === 'ongoing' && (
                      <div style={{
                        position: 'absolute', top: '1.25rem', right: '1.25rem',
                        background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body)',
                        fontSize: 8.5, letterSpacing: '0.15em', textTransform: 'uppercase',
                        fontWeight: 600, padding: '4px 9px', display: 'flex', alignItems: 'center', gap: 5,
                      }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#f0a500', animation: 'pulse 2s infinite' }} />
                        Concept Render
                      </div>
                    )}

                    <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem', fontFamily: 'var(--font-body)', fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{p.year}</div>
                  </div>
                  <div style={{ padding: '1.5rem 2rem' }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '0.35rem' }}>{p.location}</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--fg)', margin: '0 0 0.35rem', lineHeight: 1.1 }}>{p.title}</h3>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--fg-muted)', marginBottom: '0.75rem', fontStyle: 'italic' }}>{p.client}</div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.65, margin: '0 0 1rem' }}>{p.desc.slice(0, 110)}…</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button onClick={openQuote} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)', fontWeight: 600, padding: 0, marginLeft: 'auto' }}>
                        {tab === 'ongoing' ? 'Enquire →' : 'Enquire →'}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div style={{ marginTop: '4rem', padding: '2.5rem 3rem', background: 'var(--alt-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <SectionLabel>Work With Us</SectionLabel>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, color: 'var(--fg)', margin: 0 }}>Have a Project in Mind?</h3>
            </div>
            <button onClick={openQuote} style={{ background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, padding: '14px 32px', whiteSpace: 'nowrap', transition: 'opacity 0.2s' }}
              onMouseEnter={e=>(e.currentTarget.style.opacity='0.85')} onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
              Begin the Conversation
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ProjectsPage() {
  return <Suspense fallback={null}><ProjectsInner /></Suspense>;
}
