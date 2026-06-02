'use client';

import { PageBanner } from '@/components/PageBanner';
import { SectionLabel } from '@/components/SectionLabel';
import { useQuote } from '@/components/QuoteContext';
import { IMGS, MANPOWER } from '@/lib/data';

const LEADERSHIP = [
  {
    name: 'Qaboos Al Khonji',
    title: 'Chairman',
    dept: 'Board & Ownership',
    resp: 'Group vision, ownership governance, and strategic stewardship of Al Binaa under the Al Khonji Group.',
  },
  {
    name: '',
    title: 'Chief Executive Officer',
    dept: 'Executive Leadership',
    resp: 'Business direction, key client relationships, and long-term growth across all construction divisions.',
  },
  {
    name: '',
    title: 'General Manager',
    dept: 'Operations & Delivery',
    resp: 'Day-to-day oversight of all active projects — engineering, commercial, safety, and on-time handover.',
  },
];

const CSR_PILLARS = [
  { title: 'Zero Harm', desc: 'Every site. Every day. Daily toolbox talks, mandatory PPE — no exceptions.' },
  { title: 'Ethical Conduct', desc: 'Transparent contracts, prompt payment, honest reporting to all stakeholders.' },
  { title: 'Omanisation', desc: 'Omani engineers and managers. Continuous investment in local talent.' },
  { title: 'Worker Welfare', desc: 'Compliant accommodation, fair wages — exceeding Omani Labour Law.' },
  { title: 'Environment', desc: 'Waste segregation, dust control, reduced carbon footprint on every site.' },
  { title: 'Vision 2040', desc: 'Local procurement and employment — contributing to Oman\'s future.' },
];

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.14em',
  textTransform: 'uppercase', fontWeight: 600, color: 'var(--red)', marginBottom: '0.5rem',
};

export default function AboutPage() {
  const { openQuote } = useQuote();
  const totalManpower = MANPOWER.reduce((a, m) => a + m.qty, 0);

  return (
    <main>
      <PageBanner
        title="About Al Binaa"
        subtitle="Thirty years. 20+ projects. Built in Oman — for Oman."
        img={IMGS.commercial1}
      />

      {/* ── STORY ── */}
      <section style={{ background: 'var(--section-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }} className="about-grid">
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 1.75rem', lineHeight: 1.05 }}>Built in Oman.<br />Built for Oman.</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15.5, color: 'var(--fg-muted)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
              Founded in 1997 under the Al Khonji Group. What began as civil construction has grown into Muscat's most recognised full-service contractor — 20+ landmark projects across residential, commercial, and hospitality.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15.5, color: 'var(--fg-muted)', lineHeight: 1.85, marginBottom: '2.5rem' }}>
              Every building carries our name. That's the standard — precision, safety, and trust, earned project by project over three decades.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '1.5rem', background: 'var(--alt-bg)', borderLeft: '3px solid var(--red)', marginBottom: '2.5rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--red)', lineHeight: 1 }}>1997</div>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--fg)', marginBottom: 3 }}>Est. under the Al Khonji Group</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-muted)' }}>C.R: 2693300 · 1212 Way 2708, Muscat 100, Oman</div>
              </div>
            </div>
            <button onClick={openQuote} style={{ background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, padding: '14px 32px', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              Start Your Project →
            </button>
          </div>

          {/* Right — stacked image pair */}
          <div style={{ display: 'grid', gridTemplateRows: '1fr auto', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <img src={IMGS.building1} alt="OFFICE 1991 — Muscat skyline" style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, background: 'var(--red)', padding: '1.5rem 2rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>20+</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>Projects Delivered</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <img src="/images/rimal-1-aerial.jpg" alt="Rimal I — 242-unit residential complex" style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
              <img src="/images/al-wadi-complex-aerial.jpg" alt="Al Wadi Complex — Muscat" style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section style={{ background: 'var(--alt-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }} className="about-grid">
          <div style={{ padding: '2.5rem', borderTop: '3px solid var(--red)' }}>
            <div style={labelStyle}>Mission</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--fg)', margin: '0 0 1.25rem', lineHeight: 1.1 }}>Excellence. Every Project.</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--fg-muted)', lineHeight: 1.8, margin: 0 }}>
              World-class construction — driven by quality, precision, and operational excellence. Every handover creates lasting value for Oman.
            </p>
          </div>
          <div style={{ padding: '2.5rem', borderTop: '3px solid var(--fg-muted)' }}>
            <div style={{ ...labelStyle, color: 'var(--fg-muted)' }}>Vision</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--fg)', margin: '0 0 1.25rem', lineHeight: 1.1 }}>Oman's Benchmark Contractor.</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--fg-muted)', lineHeight: 1.8, margin: 0 }}>
              The most trusted name in Oman construction — recognised for reliability, innovation, and the highest standards of technical delivery.
            </p>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section style={{ background: 'var(--section-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }} className="about-grid">
            <div>
              <SectionLabel>Leadership</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 1.25rem', lineHeight: 1.05 }}>Driven From<br />The Top.</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
                Senior leadership with deep roots in Oman's construction sector — setting the standard for every project we deliver.
              </p>
              <img src="/images/office-1991.jpg" alt="OFFICE 1991 — Al Binaa flagship commercial project" style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5px', background: 'var(--border-color)' }}>
              {LEADERSHIP.map((l, i) => (
                <div key={i} style={{ background: 'var(--card-bg)', padding: '2.25rem 2.5rem', borderTop: '3px solid var(--border-color)', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderTopColor = 'var(--red)')}
                  onMouseLeave={e => (e.currentTarget.style.borderTopColor = 'var(--border-color)')}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.13em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--red)', marginBottom: '0.5rem' }}>{l.dept}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.15 }}>{l.title}</div>
                  {l.name && <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)', marginTop: '0.3rem', marginBottom: '0.85rem' }}>{l.name}</div>}
                  {!l.name && <div style={{ marginBottom: '0.85rem' }} />}
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.65, margin: 0 }}>{l.resp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CSR & SAFETY ── */}
      <section style={{ background: 'var(--stats-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '5rem', alignItems: 'start' }} className="about-grid">
            <div>
              <SectionLabel>Responsibility</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 1.25rem', lineHeight: 1.05 }}>Safety, Ethics &<br />Community</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
                Not a policy document — embedded in how every site is run, every worker treated, every contract managed.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { n: 'Zero Harm', label: 'Safety target — every site, every day' },
                  { n: 'ISO', label: 'Certified quality management' },
                  { n: '100%', label: 'OSHA & Oman Labour Law compliance' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--red)', flexShrink: 0 }}>{item.n}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.5 }}>{item.label}</span>
                  </div>
                ))}
              </div>
              <img src="/images/al-qurm-hills-site.jpg" alt="Al Binaa active construction site" style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block', opacity: 0.8 }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5px', background: 'var(--border-color)' }}>
              {CSR_PILLARS.map((p, i) => (
                <div key={i} style={{ background: 'var(--card-bg)', padding: '2rem', borderTop: '2px solid var(--border-strong)', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,20,31,0.04)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--card-bg)')}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '0.65rem' }}>{p.title}</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MANPOWER ── */}
      <section style={{ background: 'var(--section-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start' }} className="about-grid">
            <div>
              <SectionLabel>Our Team</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 1.25rem', lineHeight: 1.05 }}>{totalManpower}+<br />Professionals.</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>Engineers, supervisors, and skilled trades — deployed on every Al Binaa site across Oman.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {[
                  { n: '25', label: 'Engineers' },
                  { n: '20', label: 'Supervisors' },
                  { n: '4',  label: 'Surveyors' },
                  { n: '42', label: 'Steel Fixers' },
                ].map(item => (
                  <div key={item.label} style={{ borderTop: '2px solid var(--border-color)', paddingTop: '1rem' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--fg)', lineHeight: 1 }}>{item.n}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--fg-muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ borderTop: '1px solid var(--border-color)' }}>
                {MANPOWER.map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 0', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg)' }}>{m.role}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--red)' }}>{m.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EQUIPMENT ── */}
      <section style={{ background: 'var(--alt-bg)', padding: 'clamp(3rem,5vw,5rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <SectionLabel>Equipment & Fleet</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 2.5rem', lineHeight: 1.05 }}>Infrastructure-Grade Capacity</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5px', background: 'var(--border-color)' }}>
            {[
              { qty: '6',        name: 'Tower Cranes' },
              { qty: '4',        name: 'Mobile Cranes' },
              { qty: '4',        name: 'Excavation Cranes' },
              { qty: '5+',       name: 'Heavy Transport Trucks' },
              { qty: '5,900 m²', name: 'Doka Formwork' },
              { qty: '15,000 m²',name: 'Heavy Scaffolding' },
            ].map((e, i) => (
              <div key={i} style={{ background: 'var(--alt-bg)', padding: '1.5rem 1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600, color: 'var(--fg)' }}>{e.name}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--red)', flexShrink: 0 }}>{e.qty}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
