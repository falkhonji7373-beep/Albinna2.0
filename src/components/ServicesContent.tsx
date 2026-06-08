'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { PageBanner } from '@/components/PageBanner';
import { SectionLabel } from '@/components/SectionLabel';
import { useQuote } from '@/components/QuoteContext';
import { IMGS, SERVICES } from '@/lib/data';

export function ServicesContent() {
  const { openQuote } = useQuote();
  const t             = useTranslations('services');
  const tc            = useTranslations('common');
  const locale        = useLocale();
  const isRTL         = locale === 'ar';
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    if (section != null) {
      const idx = parseInt(section);
      setOpen(idx);
      setTimeout(() => {
        const el = document.getElementById(`svc-${idx}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, []);

  const WHY_ITEMS = isRTL
    ? [
        { n: '200+', label: 'مشروع مُسلَّم',    desc: 'مشاريع سكنية وتجارية وضيافة وصحية وصناعية وتجديد عبر السلطنة.' },
        { n: '3',    label: 'أقسام داخلية',    desc: 'الهيكل الإنشائي وأنظمة MEP والتشطيبات، منسقة بالكامل تحت فريق واحد.' },
        { n: '1,000+', label: 'عضو في الفريق',    desc: 'مهندسون ومشرفون وحرفيون مهرة ودعم لوجستي في كل مشروع.' },
        { n: '100%', label: 'امتثال عُماني',    desc: 'جميع الأعمال تلتزم بمعايير البلدية وOSHA كحد أدنى.' },
      ]
    : [
        { n: '200+', label: 'Projects Delivered',  desc: 'Residential, commercial, hospitality, health, industrial, and renovation projects across the Sultanate.' },
        { n: '3',    label: 'In-house Divisions',   desc: 'Structure, MEP, and Finishing, fully co-ordinated under one team.' },
        { n: '1,000+', label: 'Directly Employed',   desc: 'Engineers, supervisors, skilled tradespeople and logistical support on every project.' },
        { n: '100%', label: 'Oman Compliant',        desc: 'All works adhere to Municipality, MONE, and OSHA standards as a baseline.' },
      ];

  return (
    <main>
      <PageBanner
        title={isRTL ? 'قدراتنا' : 'Our Capabilities'}
        subtitle={isRTL
          ? 'ثلاثة تخصصات. عقد واحد. لا واجهات بين مقاولين، ولا فجوات في المساءلة.'
          : 'Three disciplines. One contract. No interfaces between contractors, no gaps in accountability.'}
        img={IMGS.commercial1}
      />

      {/* Answer-first lead (AEO) */}
      <section style={{ background: 'var(--section-bg)', padding: 'clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,4rem) 0' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.05rem,1.6vw,1.3rem)', color: 'var(--fg)', lineHeight: 1.7, margin: 0, textAlign: isRTL ? 'right' : 'left', fontWeight: 400 }}>
            {isRTL
              ? 'شركة البناء مقاول عام يعمل بنظام العقد الواحد في مسقط، عُمان، ينفّذ الهيكل الإنشائي وأنظمة MEP والتشطيبات الداخلية بفريق داخلي تحت إدارة واحدة. ثلاثة تخصصات وعقد واحد ومسؤولية واحدة.'
              : 'Al Binaa is a single-contract general contractor in Muscat, Oman that delivers structural, MEP, and interior finishing with one in-house team under one management. Three disciplines, one contract, one point of accountability.'}
          </p>
        </div>
      </section>

      {/* ── ACCORDION ── */}
      <section style={{ background: 'var(--section-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {SERVICES.map((s, i) => (
            <div key={s.key} id={`svc-${i}`} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '2rem 0', display: 'flex', alignItems: 'center', gap: '2rem', textAlign: isRTL ? 'right' : 'left', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 700, color: 'var(--red)', minWidth: 56, opacity: 0.35 }}>{s.num}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem,2.5vw,1.9rem)', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.1 }}>{isRTL ? s.titleAr : s.title}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--fg-muted)', marginTop: 3, fontStyle: 'italic', opacity: open !== i ? 1 : 0, maxHeight: open !== i ? '2rem' : '0', overflow: 'hidden', transition: open !== i ? 'opacity 0.25s ease 0.1s, max-height 0.3s ease' : 'opacity 0.15s ease, max-height 0.2s ease' }}>{isRTL ? s.taglineAr : s.tagline}</div>
                </div>
                <span style={{ color: 'var(--red)', fontSize: '1.4rem', transition: 'transform 0.3s', transform: open === i ? 'rotate(45deg)' : 'none', lineHeight: 1, flexShrink: 0 }}>+</span>
              </button>

              {/* Animated accordion content, always mounted, height animated */}
              <div style={{
                maxHeight: open === i ? '4000px' : '0',
                opacity: open === i ? 1 : 0,
                overflow: 'hidden',
                transition: open === i
                  ? 'max-height 0.65s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease 0.05s'
                  : 'max-height 0.38s cubic-bezier(0.4,0,1,1), opacity 0.18s ease',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', paddingBottom: '3.5rem' }} className="service-detail-grid">
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 15.5, color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>{isRTL ? s.descAr : s.desc}</p>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: isRTL ? '0' : '0.14em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 700, color: 'var(--red)', marginBottom: '1rem' }}>
                      {isRTL ? 'نطاق العمل' : 'Scope of Work'}
                    </div>
                    {(isRTL ? s.scopeAr : s.scope).map((sc, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <div style={{ width: 5, height: 5, background: 'var(--red)', marginTop: 7, flexShrink: 0 }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.65 }}>{sc}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <button onClick={openQuote} style={{
                        background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer',
                        fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.14em',
                        textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600, padding: '12px 28px',
                        transition: 'opacity 0.2s',
                      }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                        {isRTL ? '← طلب عرض سعر' : 'Request a Quote →'}
                      </button>
                      <Link href={`/${locale}/services/${s.key}`}
                        style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.12em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600, color: 'var(--fg-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, padding: '12px 0' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-muted)'; }}>
                        {isRTL ? 'التفاصيل الكاملة ←' : 'Full Details →'}
                      </Link>
                    </div>
                  </div>
                  <div>
                    <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
                      <img src={s.img} alt={isRTL ? s.titleAr : s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY AL BINAA ── */}
      <section style={{ background: 'var(--alt-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <SectionLabel>{isRTL ? 'لماذا البناء؟' : 'Why Al Binaa'}</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 3rem', lineHeight: 1.05, maxWidth: '20ch' }}>
            {isRTL ? 'موثوق من أبرز المطورين في عُمان' : "Trusted by Oman's Leading Developers"}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {WHY_ITEMS.map((item, i) => (
              <div key={i} style={{ padding: '2rem', borderBlockStart: '3px solid var(--red)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.5rem', lineHeight: 1 }}>{item.n}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.1em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600, color: 'var(--red)', marginBottom: '0.75rem' }}>{item.label}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--fg-muted)', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--stats-bg)', padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.5rem' }}>
              {isRTL ? 'لديك مشروع في ذهنك؟' : 'Have a project in mind?'}
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)', margin: 0 }}>
              {isRTL ? 'أخبرنا عنه، نرد خلال 48 ساعة.' : 'Tell us about it, we respond within 48 hours.'}
            </p>
          </div>
          <button onClick={openQuote} style={{
            background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.14em',
            textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600, padding: '14px 32px', whiteSpace: 'nowrap',
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            {tc('get_free_quote')}
          </button>
        </div>
      </section>
    </main>
  );
}

