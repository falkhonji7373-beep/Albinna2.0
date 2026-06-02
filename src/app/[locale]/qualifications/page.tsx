import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { QualificationsContent } from '@/components/QualificationsContent';
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
    ? 'المؤهلات والاعتمادات | البناء للإنشاءات عُمان'
    : 'Qualifications & Certifications | Al Binaa Construction Oman';

  const description = isRTL
    ? 'معتمد وفق ISO 9001:2015. السجل التجاري 2693300. 28 عامًا من التسليم الموثق. مؤهلات واعتمادات شركة البناء للإنشاءات والصناعة.'
    : 'ISO 9001:2015 certified. Commercial Registration 2693300. 28 years of verified delivery in Oman. Al Binaa Construction qualifications and credentials.';

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/qualifications`,
      languages: {
        en: `${SITE_URL}/en/qualifications`,
        ar: `${SITE_URL}/ar/qualifications`,
        'x-default': `${SITE_URL}/en/qualifications`,
      },
    },
    openGraph: {
      title,
      description,
      locale: isRTL ? 'ar_OM' : 'en_GB',
    },
  };
}

export default async function QualificationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isRTL = locale === 'ar';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#org`,
    name: 'Al Binaa Construction & Industry SAOC',
    alternateName: 'البناء للإنشاءات والصناعة',
    url: SITE_URL,
    foundingDate: '1997',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 600 },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        name: 'ISO 9001:2015 Quality Management System',
        recognizedBy: { '@type': 'Organization', name: 'Bureau Veritas' },
      },
    ],
    identifier: [
      { '@type': 'PropertyValue', name: 'Commercial Registration', value: '2693300' },
    ],
    areaServed: { '@type': 'Country', name: 'Oman' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <QualificationsContent />
    </>
  );
}
