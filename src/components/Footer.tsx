'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useQuote } from './QuoteContext';

const colLink: React.CSSProperties = {
  display: 'block', fontFamily: 'var(--font-body)', fontSize: 14.5,
  color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
  padding: '0.42rem 0', lineHeight: 1, transition: 'color 0.18s',
};

export function Footer() {
  const { openQuote } = useQuote();
  const pathname      = usePathname();
  const t             = useTranslations('footer');
  const tc            = useTranslations('common');

  const locale = pathname?.split('/')[1] === 'ar' ? 'ar' : 'en';
  const isRTL  = locale === 'ar';

  const SERVICE_LINKS = [
    { label: isRTL ? 'الهيكل الإنشائي' : 'Structure',          href: `/${locale}/services?section=0` },
    { label: isRTL ? 'أنظمة MEP'        : 'MEP Systems',        href: `/${locale}/services?section=1` },
    { label: isRTL ? 'تشطيبات داخلية'   : 'Interior Finishing', href: `/${locale}/services?section=2` },
  ];

  const PROJECT_LINKS = [
    { label: isRTL ? 'مشاريع مكتملة'  : 'Completed Projects', href: `/${locale}/projects` },
    { label: isRTL ? 'مشاريع جارية'   : 'Ongoing Projects',   href: `/${locale}/projects?filter=Ongoing` },
    { label: isRTL ? 'سكني'            : 'Residential',        href: `/${locale}/projects?filter=Residential` },
    { label: isRTL ? 'تجاري'           : 'Commercial',         href: `/${locale}/projects?filter=Commercial` },
    { label: isRTL ? 'ضيافة'           : 'Hospitality',        href: `/${locale}/projects?filter=Hospitality` },
  ];

  const NAV_LINKS = [
    { label: isRTL ? 'من نحن'           : 'About',          href: `/${locale}/about`          },
    { label: t('services'),                                   href: `/${locale}/services`       },
    { label: t('projects'),                                   href: `/${locale}/projects`       },
    { label: isRTL ? 'لماذا شركة البناء' : 'Why Al Binaa',   href: `/${locale}/why-al-binaa`   },
    { label: isRTL ? 'المؤهلات'          : 'Qualifications', href: `/${locale}/qualifications` },
    { label: t('contact'),                                    href: `/${locale}/contact`        },
  ];

  const contactInfo = [
    { label: t('address_label'), value: t('address').replace('\\n', '\n') },
    { label: t('phone_label'),   value: '+968 24 693300'                    },
    { label: t('email_label'),   value: 'info@albinaa-om.com'              },
    { label: t('hours_label'),   value: t('hours')                         },
  ];

  return (
    <footer style={{ background: 'var(--footer-bg)', color: 'var(--footer-fg)' }}>

      {/* Main grid */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(3rem,5vw,4.5rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.3fr', gap: '3rem 2.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }} className="footer-grid">

          {/* Brand col */}
          <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <img
                src="/images/logo-dark.png"
                alt="Al Binaa Construction & Industry SAOC"
                style={{ height: 52, width: 'auto', display: 'block', marginInlineStart: isRTL ? 'auto' : 0, marginInlineEnd: isRTL ? 0 : 'auto' }}
              />
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.68)', marginBottom: '2rem', maxWidth: 310, marginInlineStart: isRTL ? 'auto' : 0 }}>
              {t('tagline')}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
              {[{ k: 'C.R. No.', v: '2693300' }].map(item => (
                <div key={item.k} style={{ padding: '0.5rem 0.85rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.50)', marginBottom: 2 }}>{item.k}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'rgba(255,255,255,0.72)', fontWeight: 500 }}>{item.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Services col */}
          <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.14em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 700, color: 'rgba(255,255,255,0.52)', marginBottom: '1.1rem' }}>
              {t('services')}
            </div>
            {SERVICE_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} style={colLink}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
                {label}
              </Link>
            ))}
          </div>

          {/* Projects col */}
          <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.14em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 700, color: 'rgba(255,255,255,0.52)', marginBottom: '1.1rem' }}>
              {t('projects')}
            </div>
            {PROJECT_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} style={colLink}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
                {label}
              </Link>
            ))}
          </div>

          {/* Contact col */}
          <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.14em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 700, color: 'rgba(255,255,255,0.52)', marginBottom: '1.1rem' }}>
              {t('contact')}
            </div>
            {contactInfo.map(item => (
              <div key={item.label} style={{ marginBottom: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.1em', textTransform: isRTL ? 'none' : 'uppercase', color: 'rgba(255,255,255,0.52)', marginBottom: 3, fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, whiteSpace: 'pre-line' }}>{item.value}</div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 14, marginTop: '1.25rem', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/albinaa_om/' },
                { label: 'Facebook',  href: 'https://www.facebook.com/albinaaom/' },
                { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/al-binaa' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.58)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 500, transition: 'color 0.18s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.58)')}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', flexWrap: 'wrap', gap: '1rem', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.50)' }}>{t('rights')}</span>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} href={href}
                style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.52)', textDecoration: 'none', letterSpacing: isRTL ? '0' : '0.08em', textTransform: isRTL ? 'none' : 'uppercase', transition: 'color 0.18s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.52)')}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
