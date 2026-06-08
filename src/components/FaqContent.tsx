'use client';

import { useLocale } from 'next-intl';
import { PageBanner } from '@/components/PageBanner';
import { IMGS, HOME_FAQ_EN, HOME_FAQ_AR } from '@/lib/data';

export function FaqContent() {
  const locale = useLocale();
  const isRTL  = locale === 'ar';
  const faq    = isRTL ? HOME_FAQ_AR : HOME_FAQ_EN;

  return (
    <main>
      <PageBanner
        title={isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
        subtitle={isRTL ? 'البناء للإنشاءات في عُمان' : 'Al Binaa Construction in Oman'}
        img={IMGS.commercial1}
      />

      <section style={{ background: 'var(--section-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          {faq.map((item, i) => (
            <div key={i} style={{ padding: 'clamp(1.5rem,2.5vw,2rem) 0', borderTop: '1px solid var(--border-color)', textAlign: isRTL ? 'right' : 'left' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.15rem,1.9vw,1.5rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 0.85rem', lineHeight: 1.3 }}>
                {item.q}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15.5, color: 'var(--fg-muted)', lineHeight: 1.85, margin: 0, maxWidth: '72ch', marginInlineStart: isRTL ? 'auto' : 0 }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
