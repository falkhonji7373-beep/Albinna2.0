'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    const LOCALES = ['en', 'ar'] as const;
    type Locale = typeof LOCALES[number];
    const saved = localStorage.getItem('locale') as Locale | null;
    const locale = LOCALES.includes(saved as Locale) ? saved! : 'en';
    router.replace(`/${locale}`);
  }, [router]);
  return (
    <html lang="en">
      <body style={{ background: '#0d0d0d' }} />
    </html>
  );
}
