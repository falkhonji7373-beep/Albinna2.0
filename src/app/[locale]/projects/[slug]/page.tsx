import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ProjectDetailContent } from '@/components/ProjectDetailContent';
import { COMPLETED_PROJECTS } from '@/lib/data';
import { SITE_URL } from '@/lib/config';

const LOCALES = ['en', 'ar'];

export function generateStaticParams() {
  return COMPLETED_PROJECTS.flatMap(p =>
    LOCALES.map(locale => ({ locale, slug: p.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isRTL = locale === 'ar';
  const project = COMPLETED_PROJECTS.find(p => p.id === slug);

  if (!project) {
    return { title: isRTL ? 'مشروع غير موجود' : 'Project Not Found' };
  }

  const title    = isRTL ? ((project as any).titleAr    ?? project.title)    : project.title;
  const location = isRTL ? ((project as any).locationAr ?? project.location) : project.location;
  const desc     = isRTL ? ((project as any).descAr     ?? project.desc)     : project.desc;

  const metaTitle = isRTL
    ? `${title}، ${location} | البناء للإنشاءات عُمان`
    : `${title}, ${location} | Al Binaa Construction Oman`;

  return {
    title: { absolute: metaTitle },
    description: desc.substring(0, 155),
    alternates: {
      canonical: `${SITE_URL}/${locale}/projects/${slug}`,
      languages: {
        en: `${SITE_URL}/en/projects/${slug}`,
        ar: `${SITE_URL}/ar/projects/${slug}`,
        'x-default': `${SITE_URL}/en/projects/${slug}`,
      },
    },
    openGraph: {
      title: metaTitle,
      description: desc.substring(0, 155),
      images: [{ url: `${SITE_URL}${project.img}`, width: 1200, height: 630, alt: title }],
      locale: isRTL ? 'ar_OM' : 'en_GB',
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // JSON-LD for this project
  const project = COMPLETED_PROJECTS.find(p => p.id === slug);
  const jsonLd = project
    ? {
        '@context': 'https://schema.org',
        '@type': 'ConstructionProject',
        name: project.title,
        description: project.desc,
        location: {
          '@type': 'Place',
          name: project.location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: project.location.split(',')[0],
            addressCountry: 'OM',
          },
        },
        ...(project.year ? { startDate: String(project.year), endDate: String(project.year) } : {}),
        contractor: {
          '@type': 'GeneralContractor',
          '@id': `${SITE_URL}/#org`,
          name: 'Al Binaa Construction & Industry SAOC',
        },
        ...(project.client ? { client: { '@type': 'Organization', name: project.client } } : {}),
        url: `${SITE_URL}/en/projects/${slug}`,
        image: `${SITE_URL}${project.img}`,
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
      <ProjectDetailContent slug={slug} />
    </>
  );
}
