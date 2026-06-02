import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import '../globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { QuoteProvider } from '@/components/QuoteContext';
import { FloatingCTA } from '@/components/FloatingCTA';
import { SITE_URL } from '@/lib/config';
import { ScrollProgress } from '@/components/ScrollProgress';

const locales = ['en', 'ar'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: 'General Contractor Muscat Oman | Civil, MEP & Finishing — Al Binaa Construction',
    template: '%s | Al Binaa',
  },
  description:
    "Al Binaa Construction & Industry SAOC — Oman's most trusted premium construction partner since 1997. Award-winning commercial, residential, hospitality & MEP projects across Muscat. ISO-certified. 20+ delivered projects. Request a consultation.",
  keywords:
    'Al Binaa Construction Oman, premium construction company Muscat, luxury construction Oman, commercial contractor Muscat, residential developer Oman, hospitality construction Oman, MEP contractor Muscat, SAOC construction company, top construction firm Oman, Al Khonji Group construction, شركة البناء للإنشاءات عمان, مقاول مسقط, شركة إنشاءات عمان, مشاريع سكنية عمان, مقاول تجاري مسقط, إنشاءات فاخرة عمان, مقاول MEP عمان, شركة بناء موثوقة عمان',
  authors: [{ name: 'Al Binaa Construction & Industry SAOC' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      en: `${SITE_URL}/en`,
      ar: `${SITE_URL}/ar`,
    },
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/`,
    title: 'Al Binaa Construction & Industry SAOC — Premium Construction in Oman',
    description:
      'Premium construction partner in Oman. 28+ years. 20+ landmark projects. Commercial, residential, hospitality & MEP. Request a consultation today.',
    images: [
      {
        url: `${SITE_URL}/images/rimal-1-exterior.jpg`,
        width: 1200,
        height: 630,
        alt: 'Al Binaa Construction — Rimal I Residential Complex, Bausher, Oman',
      },
    ],
    locale: 'en_GB',
    siteName: 'Al Binaa Construction & Industry SAOC',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Al Binaa Construction & Industry SAOC — Muscat, Oman',
    description: 'Premium construction partner in Oman. 28+ years of excellence. 20+ landmark projects delivered.',
    images: [`${SITE_URL}/images/rimal-1-exterior.jpg`],
  },
  other: {
    'geo.region': 'OM-MA',
    'geo.placename': 'Muscat, Oman',
    'geo.position': '23.5880;58.3829',
    ICBM: '23.5880, 58.3829',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'GeneralContractor'],
      '@id': `${SITE_URL}/#org`,
      name: 'Al Binaa Construction & Industry SAOC',
      alternateName: 'Al Binaa Construction',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      image: `${SITE_URL}/images/rimal-1-exterior.jpg`,
      description:
        'Leading premium construction company in Oman, established 1997. Specialising in commercial, residential, hospitality and MEP projects across Muscat and Oman.',
      foundingDate: '1997',
      numberOfEmployees: { '@type': 'QuantitativeValue', value: 600 },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1212 Way 2708',
        postalCode: '100',
        addressLocality: 'Muscat',
        addressRegion: 'Muscat Governorate',
        addressCountry: 'OM',
      },
      telephone: '+96824693300',
      email: 'info@albinaa-om.com',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 23.58800,
        longitude: 58.38290,
      },
      hasMap: 'https://maps.google.com/?q=1212+Way+2708+Muscat+Oman',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '08:00',
          closes: '17:00',
        },
      ],
      areaServed: [
        { '@type': 'Country', name: 'Oman' },
        { '@type': 'City', name: 'Muscat' },
      ],
      sameAs: [
        'https://www.instagram.com/albinaa_om/',
        'https://www.facebook.com/albinaaom/',
        'https://www.linkedin.com/company/al-binaa',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Construction & Industry Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Structural & Civil Construction', description: 'Commercial, residential and industrial structural works across Oman.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MEP Systems', description: 'Mechanical, electrical and plumbing engineering and installation.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Architectural Design & Build', description: 'End-to-end design-build services for premium developments.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interior Finishing & Quality', description: 'Luxury interior finishing and quality assurance services.' } },
        ],
      },
      award: 'ISO 9001:2015 Certified',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Al Binaa Construction & Industry SAOC',
      publisher: { '@id': `${SITE_URL}/#org` },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What construction services does Al Binaa offer in Oman?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Al Binaa Construction & Industry SAOC offers four core services: Structural & Civil Construction, MEP (Mechanical, Electrical & Plumbing) Systems, Architectural Design & Build, and Interior Finishing & Quality — serving residential, commercial, and hospitality sectors across Oman.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I request a consultation or project quote from Al Binaa?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Click "Request a Consultation" on our website or submit the contact form. Our team responds within one business day to discuss your project requirements.',
          },
        },
        {
          '@type': 'Question',
          name: 'What notable projects has Al Binaa completed in Oman?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Landmark completed projects include Rimal I (242 residential units, Bausher), OFFICE 1991 (9-storey commercial tower, Al Khuwair), Al Wadi Complex (21 townhouses), The Office (80 commercial units), Sur Plaza Hotel, and Desert Nights Resort (18,000 sqm renovation in Wahiba Sands).',
          },
        },
        {
          '@type': 'Question',
          name: 'How long has Al Binaa Construction been operating in Oman?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Al Binaa Construction & Industry SAOC has been operating in Oman for over 28 years, delivering 20+ projects across commercial, residential, and hospitality sectors since its founding in 1997.',
          },
        },
      ],
    },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Josefin+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Cairo:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en`} />
        <link rel="alternate" hrefLang="ar" href={`${SITE_URL}/ar`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en`} />
        {/* ⚠️  jsonLd is STATIC only — never interpolate user input, URL params,
             or CMS content here without sanitising first (XSS vector). */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <QuoteProvider>
              <Nav />
              <ScrollProgress />
              {children}
              <Footer />
              <FloatingCTA />
            </QuoteProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
