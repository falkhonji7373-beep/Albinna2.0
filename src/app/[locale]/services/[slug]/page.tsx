import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ServiceDetailContent } from '@/components/ServiceDetailContent';
import { SERVICES, SERVICE_FAQ } from '@/lib/data';
import { SITE_URL } from '@/lib/config';

const LOCALES = ['en', 'ar'];

export function generateStaticParams() {
  return SERVICES.flatMap(s =>
    LOCALES.map(locale => ({ locale, slug: s.key }))
  );
}

const META_TITLES: Record<string, string> = {
  structure:  'Structural & Civil Contractor Muscat, Oman | Al Binaa Construction',
  mep:        'MEP Contractor Oman, Mechanical, Electrical & Plumbing | Al Binaa',
  finishing:  'Interior Finishing Contractor Oman | Al Binaa Construction',
};

const META_TITLES_AR: Record<string, string> = {
  structure:  'مقاول هيكل إنشائي ومدني مسقط، عُمان | البناء للإنشاءات',
  mep:        'مقاول أنظمة MEP في عُمان، ميكانيكا وكهرباء وسباكة | البناء',
  finishing:  'مقاول تشطيبات داخلية في عُمان | البناء للإنشاءات',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isRTL  = locale === 'ar';
  const service = SERVICES.find(s => s.key === slug);

  if (!service) {
    return { title: isRTL ? 'خدمة غير موجودة' : 'Service Not Found' };
  }

  const title       = isRTL ? META_TITLES_AR[slug] ?? service.titleAr : META_TITLES[slug] ?? service.title;
  const description = isRTL ? service.descAr : service.desc;

  return {
    title: { absolute: title },
    description: description.substring(0, 155),
    alternates: {
      canonical: `${SITE_URL}/${locale}/services/${slug}`,
      languages: {
        en: `${SITE_URL}/en/services/${slug}`,
        ar: `${SITE_URL}/ar/services/${slug}`,
        'x-default': `${SITE_URL}/en/services/${slug}`,
      },
    },
    openGraph: {
      title,
      description: description.substring(0, 155),
      images: [{ url: `${SITE_URL}${service.img}`, width: 1200, height: 630, alt: isRTL ? service.titleAr : service.title }],
      locale: isRTL ? 'ar_OM' : 'en_GB',
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = SERVICES.find(s => s.key === slug);

  const jsonLd = service
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.desc,
        provider: {
          '@type': 'GeneralContractor',
          '@id': `${SITE_URL}/#org`,
          name: 'Al Binaa Construction & Industry SAOC',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Oman',
        },
        url: `${SITE_URL}/en/services/${slug}`,
      }
    : null;

  const faq = SERVICE_FAQ[slug];
  const faqJsonLd = faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.en.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <ServiceDetailContent slug={slug} />
    </>
  );
}
