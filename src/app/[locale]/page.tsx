import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { HomeContent } from '@/components/HomeContent';
import { SITE_URL } from '@/lib/config';
import { PROCESS_STEPS_EN } from '@/lib/data';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isRTL = locale === 'ar';
  return {
    title: isRTL
      ? 'مقاول عام في مسقط عُمان | هيكل إنشائي وMEP وتشطيبات | البناء للإنشاءات'
      : 'General Contractor Muscat Oman | Civil, MEP & Finishing | Al Binaa Construction',
    description: isRTL
      ? 'مقاول عام في مسقط منذ 1997. هيكل إنشائي وأنظمة MEP وتشطيبات فاخرة تحت عقد واحد. معتمد ISO 9001:2015. 200+ مشروع في عُمان.'
      : 'General contractor in Muscat since 1997. Civil structure, MEP, and interior finishing under one contract. ISO 9001:2015 certified. 200+ projects across Oman.',
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: { en: `${SITE_URL}/en`, ar: `${SITE_URL}/ar`, 'x-default': `${SITE_URL}/en` },
    },
    openGraph: {
      title: isRTL
        ? 'البناء للإنشاءات والصناعة، شركة مقاولات متميزة في عُمان'
        : 'Al Binaa Construction & Industry, Premium Construction in Oman',
      description: isRTL
        ? 'شريكك الأول في البناء في عُمان. أكثر من 30 عاماً من الخبرة. 200+ مشروعاً. معتمد ISO.'
        : "Oman's trusted construction partner since 1997. 200+ landmark projects. ISO certified.",
      locale: isRTL ? 'ar_OM' : 'en_GB',
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How Al Binaa delivers a construction project in Oman',
    description: 'Al Binaa delivers every construction project in four phases under a single contract, from first site visit to handover.',
    totalTime: 'P9M',
    step: PROCESS_STEPS_EN.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
    supply: [],
    tool: [],
    provider: { '@type': 'GeneralContractor', '@id': `${SITE_URL}/#org`, name: 'Al Binaa Construction & Industry SAOC' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <HomeContent />
    </>
  );
}
