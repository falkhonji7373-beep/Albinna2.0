'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { PageBanner } from '@/components/PageBanner';
import { useQuote } from '@/components/QuoteContext';
import { SERVICES, COMPLETED_PROJECTS, SERVICE_FAQ } from '@/lib/data';

interface Props {
  slug: string;
}

export function ServiceDetailContent({ slug }: Props) {
  const locale = useLocale();
  const isRTL  = locale === 'ar';
  const { openQuote } = useQuote();

  const service = SERVICES.find(s => s.key === slug);

  if (!service) {
    return (
      <main>
        <PageBanner title={isRTL ? 'خدمة غير موجودة' : 'Service Not Found'} />
        <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
          <Link href={`/${locale}/services`} style={{ color: 'var(--red)', fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
            {isRTL ? '← جميع الخدمات' : '← All Services'}
          </Link>
        </section>
      </main>
    );
  }

  const title    = isRTL ? service.titleAr    : service.title;
  const tagline  = isRTL ? service.taglineAr  : service.tagline;
  const desc     = isRTL ? service.descAr     : service.desc;
  const scope    = isRTL ? service.scopeAr    : service.scope;

  // Related projects, filter by matching category
  const categoryMap: Record<string, string> = {
    structure: 'Residential',
    mep: 'Commercial',
    finishing: 'Hospitality',
  };
  const related = COMPLETED_PROJECTS.filter(p =>
    slug === 'structure' ? ['Residential', 'Commercial'].includes(p.category)
    : slug === 'mep'      ? true
    : p.category === 'Hospitality'
  ).slice(0, 3);

  return (
    <main>
      <PageBanner title={title} subtitle={tagline} img={service.img} />

      <section style={{ background: 'var(--section-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" style={{ marginBottom: '3rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <Link href={`/${locale}/services`} style={{ fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 500 }}>
              {isRTL ? 'الخدمات' : 'Services'}
            </Link>
            <span style={{ color: 'var(--fg-subtle)', fontSize: 12 }}>/</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg)', fontWeight: 600 }}>
              {title}
            </span>
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '5rem', alignItems: 'start' }} className="service-detail-grid">

            {/* Left, description + scope */}
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--red)', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <span style={{ display: 'inline-block', width: 28, height: 1.5, background: 'var(--red)' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-subtle)', fontWeight: 600 }}>
                  {isRTL ? `القسم ${service.num}` : `Division ${service.num}`}
                </span>
              </div>

              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem,3vw,2.5rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 1.75rem', lineHeight: 1.1, letterSpacing: '0.02em', textAlign: isRTL ? 'right' : 'left' }}>
                {title}
              </h2>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px,1.3vw,16.5px)', color: 'var(--fg-muted)', lineHeight: 1.85, marginBottom: '2.5rem', textAlign: isRTL ? 'right' : 'left' }}>
                {desc}
              </p>

              {/* Scope of work */}
              <div style={{ marginBottom: '3rem' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600, marginBottom: '1.25rem', textAlign: isRTL ? 'right' : 'left' }}>
                  {isRTL ? 'نطاق العمل' : 'Scope of Work'}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: isRTL ? 'right' : 'left' }}>
                  {scope.map((item: string, i: number) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--fg)', lineHeight: 1.65, flexDirection: isRTL ? 'row-reverse' : 'row', padding: '0.7rem 0', borderBottom: '1px solid var(--border-color)' }}>
                      <span style={{ flexShrink: 0, marginTop: 6, width: 6, height: 6, background: 'var(--red)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* One contract advantage */}
              <div style={{ background: 'var(--alt-bg)', padding: '2rem 2.25rem', borderInlineStart: '3px solid var(--red)', textAlign: isRTL ? 'right' : 'left' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', fontWeight: 700, marginBottom: '0.75rem' }}>
                  {isRTL ? 'ميزة عقد واحد' : 'The One-Contract Advantage'}
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--fg)', lineHeight: 1.8, margin: 0 }}>
                  {isRTL
                    ? 'هذا القسم لا يعمل بمعزل عن غيره، بل ينسق مع الأقسام الأخرى في البناء تحت إدارة واحدة. عقد واحد يعني مسؤولية واحدة، ومعيار واحد للجودة، وجهة اتصال واحدة.'
                    : 'This division does not work in isolation, it co-ordinates with Al Binaa\'s other divisions under single management. One contract means one accountability, one quality standard, one point of contact.'}
                </p>
              </div>
            </div>

            {/* Right, sidebar */}
            <aside style={{ position: 'sticky', top: '2rem' }}>
              <div style={{ border: '1px solid var(--border-color)', background: 'var(--card-bg)', marginBottom: '2rem' }}>
                <div style={{ background: 'var(--red)', padding: '0.75rem 1.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', fontWeight: 700 }}>
                    {isRTL ? 'نظرة سريعة' : 'Quick Facts'}
                  </span>
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: 0, textAlign: isRTL ? 'right' : 'left' }}>
                  {[
                    { label: isRTL ? 'القسم' : 'Division', value: service.num },
                    { label: isRTL ? 'التوظيف' : 'Staffing', value: isRTL ? 'مباشر، لا عمالة وكالات' : 'Direct, no agency labour' },
                    { label: isRTL ? 'النموذج' : 'Model', value: isRTL ? 'تحت إدارة واحدة' : 'Single management' },
                    { label: isRTL ? 'التوافر' : 'Availability', value: isRTL ? 'كجزء من عقد متكامل أو مستقل' : 'As part of full contract or standalone' },
                  ].map(({ label, value }, i, arr) => (
                    <div key={i} style={{ padding: '0.9rem 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border-color)' : 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-subtle)', fontWeight: 600 }}>{label}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg)', fontWeight: 600 }}>{value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '0 1.5rem 1.5rem' }}>
                  <button onClick={openQuote}
                    style={{ width: '100%', background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, padding: '14px 20px', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}>
                    {isRTL ? 'طلب عرض سعر' : 'Request a Quote'}
                  </button>
                </div>
              </div>

              {/* Other services */}
              <div style={{ border: '1px solid var(--border-color)', background: 'var(--card-bg)', padding: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600, marginBottom: '1rem', textAlign: isRTL ? 'right' : 'left' }}>
                  {isRTL ? 'الأقسام الأخرى' : 'Other Divisions'}
                </div>
                {SERVICES.filter(s => s.key !== slug).map(s => (
                  <Link key={s.key} href={`/${locale}/services/${s.key}`}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)', textDecoration: 'none', flexDirection: isRTL ? 'row-reverse' : 'row', textAlign: isRTL ? 'right' : 'left' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--red)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'inherit'; }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--fg-subtle)' }}>{s.num}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--fg)', fontWeight: 600 }}>{isRTL ? s.titleAr : s.title}</span>
                  </Link>
                ))}
              </div>
            </aside>
          </div>

          {/* FAQ (AEO/GEO) */}
          {SERVICE_FAQ[slug] && (
            <div style={{ marginTop: '5rem', maxWidth: 820 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <span style={{ display: 'inline-block', width: 28, height: 1.5, background: 'var(--red)' }} />
                {isRTL ? 'أسئلة شائعة' : 'Common Questions'}
              </div>
              {(isRTL ? SERVICE_FAQ[slug].ar : SERVICE_FAQ[slug].en).map((item, i) => (
                <div key={i} style={{ padding: '1.5rem 0', borderTop: '1px solid var(--border-color)', textAlign: isRTL ? 'right' : 'left' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem,1.5vw,1.2rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 0.6rem', lineHeight: 1.3 }}>
                    {item.q}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--fg-muted)', lineHeight: 1.8, margin: 0 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Related Projects */}
          {related.length > 0 && (
            <div style={{ marginTop: '5rem' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <span style={{ display: 'inline-block', width: 28, height: 1.5, background: 'var(--red)' }} />
                {isRTL ? 'مشاريع ذات صلة' : 'Related Projects'}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px', background: 'var(--border-color)' }} className="projects-grid">
                {related.map(p => (
                  <Link key={p.id} href={`/${locale}/projects/${p.id}`} style={{ textDecoration: 'none', background: 'var(--card-bg)', overflow: 'hidden', display: 'block' }}>
                    <div style={{ height: 200, overflow: 'hidden' }}>
                      <img src={p.img} alt={isRTL ? ((p as any).titleAr ?? p.title) : p.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', display: 'block' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                      />
                    </div>
                    <div style={{ padding: '1.25rem 1.5rem', textAlign: isRTL ? 'right' : 'left' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--fg)', margin: '0 0 0.25rem', lineHeight: 1.2 }}>
                        {isRTL ? ((p as any).titleAr ?? p.title) : p.title}
                      </h3>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, color: 'var(--fg-muted)' }}>
                        {isRTL ? ((p as any).locationAr ?? p.location) : p.location}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
