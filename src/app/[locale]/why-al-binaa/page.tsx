import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { WhyAlBinaaContent } from '@/components/WhyAlBinaaContent';
import { SITE_URL } from '@/lib/config';

const LOCALES = ['en', 'ar'];

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isRTL = locale === 'ar';

  const title = isRTL
    ? 'لماذا شركة البناء؟ | مقارنة المقاولين في عُمان'
    : 'Why Al Binaa | The Case for Single-Contract Construction in Oman';

  const description = isRTL
    ? 'شركة البناء: عقد واحد يشمل الهيكل الإنشائي وأنظمة MEP والتشطيبات. معتمدة ISO 9001:2015. 30 عامًا. +200 مشروعًا في عُمان.'
    : 'Al Binaa delivers civil structure, MEP, and interior finishing under one management contract. ISO 9001:2015 certified. 30 years. 200+ projects across Oman.';

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/why-al-binaa`,
      languages: {
        en: `${SITE_URL}/en/why-al-binaa`,
        ar: `${SITE_URL}/ar/why-al-binaa`,
        'x-default': `${SITE_URL}/en/why-al-binaa`,
      },
    },
    openGraph: {
      title,
      description,
      locale: isRTL ? 'ar_OM' : 'en_GB',
    },
  };
}

export default async function WhyAlBinaaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isRTL = locale === 'ar';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does Al Binaa compare to Galfar for a commercial building project in Oman?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Galfar Engineering & Contracting SAOG is Oman\'s largest contractor (25,000+ employees) and specialises in infrastructure, oil & gas, and government mega-projects. For private commercial or residential development, Al Binaa\'s dedicated focus on premium building construction, single-contract delivery covering civil structure, MEP, and interior finishing, and ISO 9001:2015 certification make it better suited. Al Binaa delivered OFFICE 1991, a 9-storey commercial tower in Al Khuwair, ahead of schedule.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Al Binaa compare to Al Turki Enterprises for construction in Oman?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Al Turki Enterprises is a 7,000-employee Omani contractor with a strong government and institutional portfolio, Royal Court, Royal Oman Police, PDO, Sultan Qaboos University. Al Binaa\'s clients are primarily private developers and hospitality groups. For a private residential complex, commercial tower, or hotel, Al Binaa\'s focus, scale, and single-contract model are the better fit.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Al Binaa Construction take on hospitality and hotel projects in Oman?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Delivered projects include Desert Nights Resort (18,000 sqm, Wahiba Sands), Best Western Sur Plaza Hotel (Sohar), and Al Wadi Hotel (110-room renovation, Sohar). Active pipeline includes Ibis Style Hotel Ruwi (183 rooms, OMR 5.2M). Al Binaa handles hospitality MEP, finishing, and coordination as part of its single-contract scope.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes Al Binaa different from other construction companies in Oman?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Al Binaa delivers civil structure, MEP systems, and interior finishing under a single management contract, eliminating handover risk and coordination failures between subcontractors. The company has held ISO 9001:2015 certification (Bureau Veritas), an Excellent contractor grade, and is part of Al Khonji Group, one of Oman\'s most established conglomerates. 30 years of continuous operation and 200+ delivered projects across Muscat, Sohar, Sur, and Wahiba Sands.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WhyAlBinaaContent />
    </>
  );
}
