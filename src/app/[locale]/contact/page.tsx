import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ContactContent } from '@/components/ContactContent';
import { SITE_URL } from '@/lib/config';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isRTL = locale === 'ar';
  return {
    title: isRTL
      ? 'تواصل معنا | ابدأ مشروعك اليوم | البناء للإنشاءات مسقط عُمان'
      : 'Contact Al Binaa | Start Your Project in Oman',
    description: isRTL
      ? 'تواصل مع شركة البناء للإنشاءات والصناعة في مسقط، عُمان. احصل على عرض سعر لمشروعك الإنشائي. نرد خلال 48 ساعة. هاتف: 24693300 968+. بريد: info@albinaa-om.com'
      : 'Contact Al Binaa Construction & Industry in Muscat, Oman. Request a project quote. We respond within 48 hours. Tel: +968 24693300. Email: info@albinaa-om.com',
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: { en: `${SITE_URL}/en/contact`, ar: `${SITE_URL}/ar/contact`, 'x-default': `${SITE_URL}/en/contact` },
    },
    openGraph: {
      title: isRTL ? 'تواصل معنا | البناء للإنشاءات عُمان' : 'Contact Al Binaa Construction Oman',
      description: isRTL
        ? 'احصل على عرض سعر لمشروعك. نرد خلال 48 ساعة.'
        : 'Request a project quote. We respond within 48 hours.',
      locale: isRTL ? 'ar_OM' : 'en_GB',
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}
