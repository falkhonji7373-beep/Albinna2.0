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
    { label: isRTL ? 'صناعي'           : 'Industrial',         href: `/${locale}/projects?filter=Industrial` },
    { label: isRTL ? 'صحي'             : 'Health',             href: `/${locale}/projects?filter=Health` },
  ];

  const NAV_LINKS = [
    { label: isRTL ? 'من نحن'           : 'About',          href: `/${locale}/about`          },
    { label: t('services'),                                   href: `/${locale}/services`       },
    { label: t('projects'),                                   href: `/${locale}/projects`       },
    { label: isRTL ? 'لماذا شركة البناء' : 'Why Al Binaa',   href: `/${locale}/why-al-binaa`   },
    { label: isRTL ? 'المؤهلات'          : 'Qualifications', href: `/${locale}/qualifications` },
    { label: isRTL ? 'الأسئلة الشائعة'    : 'FAQ',           href: `/${locale}/faq`            },
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
                style={{ height: 64, width: 'auto', display: 'block', marginInlineStart: isRTL ? 'auto' : 0, marginInlineEnd: isRTL ? 0 : 'auto' }}
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
            <div style={{ display: 'flex', gap: 10, marginTop: '1.25rem', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
              {[
                { label: 'Facebook',  href: 'https://www.facebook.com/albinaaom',
                  icon: <path d="M14 9h2.5V6H14c-1.93 0-3.5 1.57-3.5 3.5V11H8.5v3h2V21h3v-7h2.5l.5-3h-3V9.5c0-.28.22-.5.5-.5z" /> },
                { label: 'Instagram', href: 'https://www.instagram.com/albinaa_om',
                  icon: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1.2" fill="currentColor" stroke="none" /></> },
                { label: 'YouTube',   href: 'https://www.youtube.com/@albinaa_om',
                  icon: <><rect x="2.5" y="6" width="19" height="12" rx="3.5" /><path d="M10.5 9.2l4.2 2.8-4.2 2.8z" fill="currentColor" stroke="none" /></> },
                { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/albinaaom',
                  icon: <><rect x="3.5" y="3.5" width="17" height="17" rx="2.5" /><line x1="7.5" y1="10.5" x2="7.5" y2="16.5" /><circle cx="7.5" cy="7.5" r="0.9" fill="currentColor" stroke="none" /><path d="M11 16.5v-3.2c0-1.3.9-2.3 2.1-2.3s2.1 1 2.1 2.3v3.2" /></> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}
                  style={{ width: 38, height: 38, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '50%', color: 'rgba(255,255,255,0.6)', transition: 'color 0.18s, border-color 0.18s, background 0.18s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.background = 'var(--red)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.background = 'transparent'; }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {s.icon}
                  </svg>
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
