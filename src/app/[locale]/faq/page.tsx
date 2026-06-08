import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { FaqContent } from '@/components/FaqContent';
import { SITE_URL } from '@/lib/config';
import { HOME_FAQ_EN } from '@/lib/data';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isRTL = locale === 'ar';
  return {
    title: isRTL ? 'الأسئلة الشائعة | البناء للإنشاءات عُمان' : 'FAQ | Al Binaa Construction Oman',
    description: isRTL
      ? 'إجابات عن الأسئلة الشائعة حول شركة البناء للإنشاءات في عُمان: الخبرة، نموذج العقد الواحد، الاعتمادات، أنواع المشاريع، ووقت الاستجابة.'
      : 'Answers to common questions about Al Binaa Construction in Oman: experience, the single-contract model, certifications, project types, and response time.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/faq`,
      languages: { en: `${SITE_URL}/en/faq`, ar: `${SITE_URL}/ar/faq`, 'x-default': `${SITE_URL}/en/faq` },
    },
    openGraph: {
      title: isRTL ? 'الأسئلة الشائعة | البناء للإنشاءات' : 'FAQ | Al Binaa Construction',
      description: isRTL ? 'إجابات عن الأسئلة الشائعة حول شركة البناء في عُمان.' : 'Answers to common questions about Al Binaa Construction in Oman.',
      locale: isRTL ? 'ar_OM' : 'en_GB',
    },
  };
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQ_EN.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <FaqContent />
    </>
  );
}
