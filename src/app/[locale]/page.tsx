import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { HomeContent } from '@/components/HomeContent';
import { SITE_URL } from '@/lib/config';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isRTL = locale === 'ar';
  return {
    title: isRTL
      ? 'مقاول عام في مسقط عُمان | هيكل إنشائي وMEP وتشطيبات — البناء للإنشاءات'
      : 'General Contractor Muscat Oman | Civil, MEP & Finishing — Al Binaa Construction',
    description: isRTL
      ? 'شركة البناء للمقاولات — مقاول عام في مسقط منذ 1997. هيكل إنشائي وأنظمة MEP وتشطيبات فاخرة تحت عقد واحد. معتمد ISO 9001:2015. أكثر من 20 مشروعاً مُسلَّماً في عُمان.'
      : 'Al Binaa Construction — General contractor in Muscat since 1997. Civil structure, MEP systems, and interior finishing under one contract. ISO 9001:2015 certified. 20+ projects delivered across Oman.',
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: { en: `${SITE_URL}/en`, ar: `${SITE_URL}/ar`, 'x-default': `${SITE_URL}/en` },
    },
    openGraph: {
      title: isRTL
        ? 'البناء للإنشاءات والصناعة — شركة مقاولات متميزة في عُمان'
        : 'Al Binaa Construction & Industry — Premium Construction in Oman',
      description: isRTL
        ? 'شريكك الأول في البناء في عُمان. أكثر من 28 عاماً من الخبرة. 20+ مشروعاً. معتمد ISO.'
        : "Oman's trusted construction partner since 1997. 20+ landmark projects. ISO certified.",
      locale: isRTL ? 'ar_OM' : 'en_GB',
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent />;
}
