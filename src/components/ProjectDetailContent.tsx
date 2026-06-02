'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { PageBanner } from '@/components/PageBanner';
import { useQuote } from '@/components/QuoteContext';
import { COMPLETED_PROJECTS } from '@/lib/data';

interface Props {
  slug: string;
}

export function ProjectDetailContent({ slug }: Props) {
  const locale  = useLocale();
  const isRTL   = locale === 'ar';
  const { openQuote } = useQuote();

  const project = COMPLETED_PROJECTS.find(p => p.id === slug);

  if (!project) {
    return (
      <main>
        <PageBanner title={isRTL ? 'مشروع غير موجود' : 'Project Not Found'} />
        <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--fg-muted)', marginBottom: '2rem' }}>
            {isRTL ? 'لم يتم العثور على هذا المشروع.' : 'This project could not be found.'}
          </p>
          <Link href={`/${locale}/projects`} style={{ color: 'var(--red)', fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
            {isRTL ? '← جميع المشاريع' : '← All Projects'}
          </Link>
        </section>
      </main>
    );
  }

  const title    = isRTL ? ((project as any).titleAr  ?? project.title)    : project.title;
  const subtitle = isRTL ? ((project as any).subtitleAr ?? project.subtitle) : project.subtitle;
  const desc     = isRTL ? ((project as any).descAr   ?? project.desc)     : project.desc;
  const location = isRTL ? ((project as any).locationAr ?? project.location) : project.location;
  const client   = isRTL ? ((project as any).clientAr  ?? project.client)   : project.client;

  return (
    <main>
      <PageBanner title={title} subtitle={subtitle} img={project.img} />

      <section style={{ background: 'var(--section-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" style={{ marginBottom: '3rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <Link href={`/${locale}/projects`} style={{ fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 500 }}>
              {isRTL ? 'المشاريع' : 'Projects'}
            </Link>
            <span style={{ color: 'var(--fg-subtle)', fontSize: 12 }}>/</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg)', fontWeight: 600 }}>
              {title}
            </span>
          </nav>

          {/* Main content grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '5rem', alignItems: 'start' }} className="service-detail-grid">

            {/* Left — case study */}
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--red)', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <span style={{ display: 'inline-block', width: 28, height: 1.5, background: 'var(--red)' }} />
                {isRTL ? 'تفاصيل المشروع' : 'Project Overview'}
              </div>

              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem,3vw,2.5rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 1.75rem', lineHeight: 1.1, letterSpacing: '0.02em', textAlign: isRTL ? 'right' : 'left' }}>
                {title}
              </h2>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px,1.3vw,16.5px)', color: 'var(--fg-muted)', lineHeight: 1.85, marginBottom: '2rem', textAlign: isRTL ? 'right' : 'left' }}>
                {desc}
              </p>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600, marginBottom: '1rem' }}>
                    {isRTL ? 'أبرز ما يميزه' : 'Key Highlights'}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {project.highlights.map((h: string, i: number) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg)', lineHeight: 1.6, flexDirection: isRTL ? 'row-reverse' : 'row', textAlign: isRTL ? 'right' : 'left' }}>
                        <span style={{ flexShrink: 0, marginTop: 4, width: 6, height: 6, borderRadius: '50%', background: 'var(--red)' }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gallery */}
              {project.imgs && project.imgs.length > 1 && (
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600, marginBottom: '1rem' }}>
                    {isRTL ? 'معرض الصور' : 'Gallery'}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1px', background: 'var(--border-color)' }}>
                    {project.imgs.map((src: string, i: number) => (
                      <div key={i} style={{ height: 180, overflow: 'hidden' }}>
                        <img src={src} alt={`${title} — ${i + 1}`} loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', display: 'block' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right — project stats */}
            <aside style={{ position: 'sticky', top: '2rem' }}>
              <div style={{ border: '1px solid var(--border-color)', background: 'var(--card-bg)' }}>
                {/* Category badge */}
                <div style={{ background: 'var(--red)', padding: '0.75rem 1.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', fontWeight: 700 }}>
                    {project.category}
                  </span>
                </div>

                {/* Stats */}
                <div style={{ padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {[
                    { label: isRTL ? 'الموقع' : 'Location',       value: location },
                    { label: isRTL ? 'العميل' : 'Client',         value: client },
                    { label: isRTL ? 'سنة التسليم' : 'Year',      value: String(project.year) },
                    ...(project.cost && project.cost !== '—' ? [{ label: isRTL ? 'قيمة العقد' : 'Contract Value', value: `OMR ${Number(project.cost).toLocaleString()}` }] : []),
                    ...(project.area && project.area !== '—' ? [{ label: isRTL ? 'المساحة الإجمالية' : 'Area', value: project.area }] : []),
                  ].map(({ label, value }, i, arr) => (
                    <div key={i} style={{
                      display: 'flex', flexDirection: 'column', gap: 3,
                      padding: '1.1rem 0',
                      borderBottom: i < arr.length - 1 ? '1px solid var(--border-color)' : 'none',
                      textAlign: isRTL ? 'right' : 'left',
                    }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-subtle)', fontWeight: 600 }}>{label}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--fg)', fontWeight: 600, lineHeight: 1.4 }}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ padding: '0 1.5rem 1.75rem' }}>
                  <button onClick={openQuote}
                    style={{ width: '100%', background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, padding: '14px 20px', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}>
                    {isRTL ? 'استفسر عن مشروع مشابه' : 'Enquire About a Similar Project'}
                  </button>
                </div>
              </div>

              {/* Back link */}
              <div style={{ marginTop: '1.5rem', textAlign: isRTL ? 'right' : 'left' }}>
                <Link href={`/${locale}/projects`} style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  {isRTL ? 'جميع المشاريع ←' : '← All Projects'}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom CTA band */}
      <section style={{ background: 'var(--dark-bg)', padding: 'clamp(3rem,5vw,5rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontWeight: 600, marginBottom: '0.75rem' }}>
              {isRTL ? 'التالي' : 'Next Step'}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem,2.5vw,2.2rem)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.1, letterSpacing: '0.02em' }}>
              {isRTL ? 'لديك مشروع مشابه؟' : 'Have a Similar Project?'}
            </h3>
          </div>
          <button onClick={openQuote}
            style={{ background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, padding: '16px 36px', transition: 'opacity 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}>
            {isRTL ? 'ابدأ الحوار' : 'Begin the Conversation'}
          </button>
        </div>
      </section>
    </main>
  );
}
