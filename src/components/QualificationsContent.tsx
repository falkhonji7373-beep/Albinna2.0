'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { PageBanner } from '@/components/PageBanner';
import { COMPLETED_PROJECTS, IMGS } from '@/lib/data';

export function QualificationsContent() {
  const locale = useLocale();
  const isRTL  = locale === 'ar';

  const CREDENTIALS = isRTL
    ? [
        {
          label: 'معيار نظام إدارة الجودة',
          value: 'ISO 9001:2015',
          detail: 'معتمد من Bureau Veritas — ينطبق على كافة مراحل الإنشاء: التصميم والتوريد والتنفيذ والتسليم.',
        },
        {
          label: 'السجل التجاري',
          value: '2693300',
          detail: 'مسجل لدى وزارة التجارة والصناعة وترويج الاستثمار (MOCIPI)، سلطنة عُمان.',
        },
        {
          label: 'سنة التأسيس',
          value: '1997',
          detail: 'تأسست بدعم من مجموعة الخنجي — تمتد عملياتها المتواصلة لأكثر من 28 عامًا.',
        },
        {
          label: 'حجم القوى العاملة',
          value: '600+ عضو',
          detail: 'موظفون مباشرون — مهندسون ومشرفون وحرفيون متخصصون. لا عمالة وكالات.',
        },
      ]
    : [
        {
          label: 'Quality Management Standard',
          value: 'ISO 9001:2015',
          detail: 'Certified by Bureau Veritas — applied across all construction phases: design, procurement, execution, and handover.',
        },
        {
          label: 'Commercial Registration',
          value: '2693300',
          detail: 'Registered with the Ministry of Commerce, Industry and Investment Promotion (MOCIPI), Sultanate of Oman.',
        },
        {
          label: 'Year Established',
          value: '1997',
          detail: 'Founded under Al Khonji Group — over 28 years of uninterrupted operations in the Sultanate.',
        },
        {
          label: 'Workforce Size',
          value: '600+ Members',
          detail: 'Direct employees — engineers, supervisors, and skilled tradespeople. No agency labour on any project.',
        },
      ];

  const DIVISIONS = isRTL
    ? [
        { num: '01', title: 'الهيكل الإنشائي', desc: 'أعمال الخرسانة المسلحة والأساسات والأعمال المدنية، إلى جانب الملاحق الخارجية وتشطيبات الواجهات.', href: `/${locale}/services/structure` },
        { num: '02', title: 'الميكانيكا والكهرباء والسباكة', desc: 'أنظمة HVAC والسباكة والصرف الصحي والكهرباء والإضاءة والأنظمة الضعيفة وشبكات الإطفاء.', href: `/${locale}/services/mep` },
        { num: '03', title: 'التشطيبات الداخلية والجودة', desc: 'الأعمال الجدارية والأسقف المستعارة والأرضيات وتركيب الزجاج والجوائز الداخلية والنجارة.', href: `/${locale}/services/finishing` },
      ]
    : [
        { num: '01', title: 'Structural & Civil', desc: 'Reinforced concrete frames, foundations, and civil works — plus external ancillaries and façade finishes.', href: `/${locale}/services/structure` },
        { num: '02', title: 'MEP Systems', desc: 'HVAC, plumbing and drainage, electrical and lighting, low-current systems, and firefighting networks.', href: `/${locale}/services/mep` },
        { num: '03', title: 'Interior Finishing', desc: 'Wall and ceiling systems, flooring, glazing, internal partitions, joinery, and thermal and acoustic works.', href: `/${locale}/services/finishing` },
      ];

  const featuredProjects = COMPLETED_PROJECTS.slice(0, 4);

  return (
    <main>
      <PageBanner
        title={isRTL ? 'المؤهلات والاعتمادات' : 'Qualifications & Credentials'}
        subtitle={isRTL
          ? 'منذ عام 1997، تعمل شركة البناء وفق معايير موثقة وتحت مسؤولية واحدة.'
          : 'Since 1997, Al Binaa has operated to documented standards and single-point accountability.'}
        img={IMGS.commercial1}
      />

      <section style={{ background: 'var(--section-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          {/* Official credentials */}
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600, marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <span style={{ display: 'inline-block', width: 28, height: 1.5, background: 'var(--red)' }} />
            {isRTL ? 'الاعتمادات الرسمية' : 'Official Credentials'}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5px', background: 'var(--border-color)', marginBottom: '5rem' }}>
            {CREDENTIALS.map((c, i) => (
              <div key={i} style={{ background: 'var(--card-bg)', padding: '2.5rem 2rem', textAlign: isRTL ? 'right' : 'left' }}>
                <div style={{ width: 36, height: 36, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', marginLeft: isRTL ? 'auto' : 0, marginRight: isRTL ? 0 : 'auto' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>{c.label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.75rem', lineHeight: 1.1 }}>{c.value}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--fg-muted)', lineHeight: 1.7, margin: 0 }}>{c.detail}</p>
              </div>
            ))}
          </div>

          {/* In-house divisions */}
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <span style={{ display: 'inline-block', width: 28, height: 1.5, background: 'var(--red)' }} />
            {isRTL ? 'الأقسام الداخلية' : 'In-House Divisions'}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px', background: 'var(--border-color)', marginBottom: '5rem' }} className="service-detail-grid">
            {DIVISIONS.map((d, i) => (
              <Link key={i} href={d.href}
                style={{ background: 'var(--card-bg)', padding: '2.5rem 2rem', display: 'block', textDecoration: 'none', textAlign: isRTL ? 'right' : 'left', transition: 'background 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--alt-bg)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--card-bg)'; }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--red)', opacity: 0.3, lineHeight: 1, marginBottom: '1.25rem' }}>{d.num}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.75rem', lineHeight: 1.2 }}>{d.title}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--fg-muted)', lineHeight: 1.7, margin: '0 0 1.5rem' }}>{d.desc}</p>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)', fontWeight: 600 }}>
                  {isRTL ? 'عرض التفاصيل ←' : 'View Details →'}
                </span>
              </Link>
            ))}
          </div>

          {/* Reference projects */}
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <span style={{ display: 'inline-block', width: 28, height: 1.5, background: 'var(--red)' }} />
            {isRTL ? 'سجل المشاريع المرجعية' : 'Reference Project Record'}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5px', background: 'var(--border-color)', marginBottom: '3rem' }} className="projects-grid">
            {featuredProjects.map(p => (
              <Link key={p.id} href={`/${locale}/projects/${p.id}`}
                style={{ background: 'var(--card-bg)', padding: '2rem', display: 'flex', gap: '1.5rem', textDecoration: 'none', alignItems: 'flex-start', flexDirection: isRTL ? 'row-reverse' : 'row', transition: 'background 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--alt-bg)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--card-bg)'; }}>
                <div style={{ width: 80, height: 60, flexShrink: 0, overflow: 'hidden' }}>
                  <img src={p.img} alt={isRTL ? ((p as any).titleAr ?? p.title) : p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, textAlign: isRTL ? 'right' : 'left' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.25rem' }}>
                    {isRTL ? ((p as any).titleAr ?? p.title) : p.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-muted)', marginBottom: '0.25rem' }}>
                    {isRTL ? ((p as any).locationAr ?? p.location) : p.location} — {p.year}
                  </div>
                  {p.cost && p.cost !== '—' && (
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--red)', fontWeight: 600 }}>
                      OMR {Number(p.cost).toLocaleString()}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: isRTL ? 'right' : 'left', marginBottom: '5rem' }}>
            <Link href={`/${locale}/projects`}
              style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600, textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--red)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-muted)'; }}>
              {isRTL ? 'عرض جميع المشاريع ←' : 'View All Projects →'}
            </Link>
          </div>

          {/* Company profile download placeholder */}
          <div style={{ background: 'var(--alt-bg)', padding: '2.5rem 3rem', borderInlineStart: '3px solid var(--red)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', fontWeight: 700, marginBottom: '0.5rem' }}>
                {isRTL ? 'ملف الشركة' : 'Company Profile'}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.5rem' }}>
                {isRTL ? 'ملف الشركة الكامل — PDF' : 'Full Company Profile — PDF'}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--fg-muted)', margin: 0, lineHeight: 1.6 }}>
                {isRTL
                  ? 'يتضمن الشهادات والتراخيص والمشاريع المرجعية. اطلبه عبر نموذج الاتصال.'
                  : 'Includes certifications, registrations, and reference project profiles. Request via the contact form.'}
              </p>
            </div>
            <Link href={`/${locale}/contact`}
              style={{ background: 'var(--red)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.14em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 700, padding: '14px 32px', textDecoration: 'none', whiteSpace: 'nowrap', display: 'inline-block', transition: 'opacity 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}>
              {isRTL ? 'طلب الملف' : 'Request Profile'}
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
