import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ServicesContent } from '@/components/ServicesContent';
import { SITE_URL } from '@/lib/config';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isRTL = locale === 'ar';
  return {
    title: isRTL
      ? 'خدماتنا | هيكل إنشائي، أنظمة MEP، تشطيبات | البناء للإنشاءات عُمان'
      : 'Construction Services | MEP & Finishing | Oman',
    description: isRTL
      ? 'ثلاثة أقسام متكاملة تحت عقد واحد: الهيكل الإنشائي، أنظمة MEP الكهروميكانيكية، والتشطيبات الداخلية الفاخرة. خدمات إنشاء متكاملة في مسقط وسلطنة عُمان.'
      : 'Three integrated divisions under one contract: Structural & Civil, MEP Systems, and Interior Finishing. Full-service construction across Muscat and Oman.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/services`,
      languages: { en: `${SITE_URL}/en/services`, ar: `${SITE_URL}/ar/services`, 'x-default': `${SITE_URL}/en/services` },
    },
    openGraph: {
      title: isRTL ? 'خدمات الإنشاء | البناء للإنشاءات' : 'Construction Services | Al Binaa',
      description: isRTL
        ? 'هيكل إنشائي، أنظمة MEP، تشطيبات داخلية، عقد واحد، فريق واحد، معيار واحد.'
        : 'Structure, MEP & Interior Finishing, one contract, one team, one standard.',
      locale: isRTL ? 'ar_OM' : 'en_GB',
    },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesContent />;
}
