import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ProjectsContent } from '@/components/ProjectsContent';
import { SITE_URL } from '@/lib/config';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isRTL = locale === 'ar';
  return {
    title: isRTL
      ? 'مشاريعنا | سكنية وتجارية وضيافة في عُمان | البناء للإنشاءات'
      : 'Projects | Residential, Commercial & Hospitality',
    description: isRTL
      ? 'مشاريع البناء في عُمان: ريمال I (242 وحدة)، أوفيس 1991 (برج 9 طوابق)، مجمع الوادي والمزيد. سكنية وتجارية وضيافة في مسقط وعُمان.'
      : 'Al Binaa projects in Oman: Rimal I (242 units), OFFICE 1991 (9-storey tower), Al Wadi Complex and more. Residential, commercial & hospitality across Muscat.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/projects`,
      languages: { en: `${SITE_URL}/en/projects`, ar: `${SITE_URL}/ar/projects`, 'x-default': `${SITE_URL}/en/projects` },
    },
    openGraph: {
      title: isRTL ? 'مشاريعنا | البناء للإنشاءات عُمان' : 'Our Projects | Al Binaa Construction Oman',
      description: isRTL
        ? 'أكثر من 20 مشروعاً منجزاً في عُمان، سكني، تجاري، ضيافة.'
        : '200+ completed projects in Oman, residential, commercial, hospitality.',
      locale: isRTL ? 'ar_OM' : 'en_GB',
    },
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProjectsContent />;
}
