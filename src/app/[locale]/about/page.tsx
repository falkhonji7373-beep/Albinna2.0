import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AboutContent } from '@/components/AboutContent';
import { SITE_URL } from '@/lib/config';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isRTL = locale === 'ar';
  return {
    title: isRTL
      ? 'من نحن | البناء للإنشاءات والصناعة | تأسست 1997 مسقط عُمان'
      : 'About Al Binaa | Construction Company, Est. 1997',
    description: isRTL
      ? 'شركة البناء للإنشاءات والصناعة ش.م.ع.م، تأسست 1997 تحت مجموعة الخنجي. 30+ عاماً من التسليم في عُمان. 1,000+ متخصص. معتمد ISO 9001:2015.'
      : 'Al Binaa Construction & Industry SAOC, founded 1997 under Al Khonji Group. 30+ years of delivery in Oman, 1,000+ professionals, ISO 9001:2015 certified.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: { en: `${SITE_URL}/en/about`, ar: `${SITE_URL}/ar/about`, 'x-default': `${SITE_URL}/en/about` },
    },
    openGraph: {
      title: isRTL ? 'من نحن | البناء للإنشاءات' : 'About Al Binaa Construction',
      description: isRTL
        ? 'تأسست 1997. 30+ عاماً. 1,000+ متخصص. معتمد ISO. مقاول مسقط الموثوق.'
        : 'Est. 1997. 30+ years. 1,000+ professionals. ISO certified. Muscat, Oman.',
      locale: isRTL ? 'ar_OM' : 'en_GB',
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}
