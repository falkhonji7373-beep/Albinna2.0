'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageBanner } from '@/components/PageBanner';
import { SectionLabel } from '@/components/SectionLabel';
import { useQuote } from '@/components/QuoteContext';
import { IMGS, SERVICES } from '@/lib/data';

function ServicesInner() {
  const { openQuote } = useQuote();
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get('section');
  const [open, setOpen] = useState<number | null>(sectionParam !== null ? parseInt(sectionParam) : 0);

  useEffect(() => {
    if (sectionParam !== null) {
      const idx = parseInt(sectionParam);
      setOpen(idx);
      setTimeout(() => {
        const el = document.getElementById(`svc-${idx}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, [sectionParam]);

  return (
    <main>
      <PageBanner
        title="Our Services"
        subtitle="Structural engineering, MEP systems, and premium interior finishing, all under one roof."
        img={IMGS.commercial1}
      />

      {/* ── ACCORDION ── */}
      <section style={{ background: 'var(--section-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {SERVICES.map((s, i) => (
            <div key={s.key} id={`svc-${i}`} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '2rem 0', display: 'flex', alignItems: 'center', gap: '2rem', textAlign: 'left' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 700, color: 'var(--red)', minWidth: 56, opacity: 0.35 }}>{s.num}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem,2.5vw,1.9rem)', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.1 }}>{s.title}</div>
                  {open !== i && <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--fg-muted)', marginTop: 3, fontStyle: 'italic' }}>{s.tagline}</div>}
                </div>
                <span style={{ color: 'var(--red)', fontSize: '1.4rem', transition: 'transform 0.3s', transform: open === i ? 'rotate(45deg)' : 'none', lineHeight: 1, flexShrink: 0 }}>+</span>
              </button>

              {open === i && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', paddingBottom: '3.5rem' }} className="service-detail-grid">
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 15.5, color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>{s.desc}</p>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--red)', marginBottom: '1rem' }}>Scope of Work</div>
                    {s.scope.map((sc, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                        <div style={{ width: 5, height: 5, background: 'var(--red)', marginTop: 7, flexShrink: 0 }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.65 }}>{sc}</span>
                      </div>
                    ))}
                    <button onClick={openQuote} style={{
                      marginTop: '2rem', background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer',
                      fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.14em',
                      textTransform: 'uppercase', fontWeight: 600, padding: '12px 28px',
                      transition: 'opacity 0.2s',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.opacity='0.85')}
                      onMouseLeave={e => (e.currentTarget.style.opacity='1')}>
                      Request a Quote →
                    </button>
                  </div>
                  <div>
                    <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
                      <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY AL BINAA ── */}
      <section style={{ background: 'var(--alt-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <SectionLabel>Why Al Binaa</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 3rem', lineHeight: 1.05, maxWidth: '20ch' }}>Trusted by Oman's Leading Developers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { n: '200+', label: 'Projects Delivered', desc: 'Residential, commercial, hospitality, and renovation projects across the Sultanate.' },
              { n: '3',    label: 'In-house Divisions', desc: 'Structure, MEP, and Finishing, fully co-ordinated under one team.' },
              { n: '1,000+', label: 'Team Members',       desc: 'Engineers, supervisors, skilled tradespeople and logistical support on every project.' },
              { n: '100%', label: 'Oman Compliant',     desc: 'All works adhere to Municipality, MONE, and OSHA standards as a baseline.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '2rem', borderTop: '3px solid var(--red)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.5rem', lineHeight: 1 }}>{item.n}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--red)', marginBottom: '0.75rem' }}>{item.label}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--fg-muted)', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CtaBand openQuote={openQuote} />
    </main>
  );
}

function CtaBand({ openQuote }: { openQuote: () => void }) {
  return (
    <section style={{ background: 'var(--stats-bg)', padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.5rem' }}>Have a project in mind?</div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)', margin: 0 }}>Tell us about it, we respond within 48 hours.</p>
        </div>
        <button onClick={openQuote} style={{
          background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.14em',
          textTransform: 'uppercase', fontWeight: 600, padding: '14px 32px', whiteSpace: 'nowrap',
          transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity='0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity='1')}>
          Begin the Conversation
        </button>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return <Suspense fallback={null}><ServicesInner /></Suspense>;
}
