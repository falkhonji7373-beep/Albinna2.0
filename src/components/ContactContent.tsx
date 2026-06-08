'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { PageBanner } from '@/components/PageBanner';
import { SectionLabel } from '@/components/SectionLabel';
import { IMGS } from '@/lib/data';
import { FORMSPREE_ENDPOINT } from '@/lib/config';
import { useReveal } from '@/hooks/useReveal';

const PROJECT_TYPES_EN = ['Commercial', 'Residential', 'Hospitality', 'Health', 'Industrial', 'Infrastructure', 'Renovation', 'Other'];
const PROJECT_TYPES_AR = ['تجاري', 'سكني', 'ضيافة', 'صحي', 'صناعي', 'بنية تحتية', 'تجديد', 'أخرى'];
const BUDGETS_EN = ['Under 50,000 OMR', '50,000 – 200,000 OMR', '200,000 – 500,000 OMR', '500,000 – 1,000,000 OMR', 'Above 1,000,000 OMR', 'To be discussed'];
const BUDGETS_AR = ['أقل من 50,000 ريال', '50,000 – 200,000 ريال', '200,000 – 500,000 ريال', '500,000 – 1,000,000 ريال', 'أكثر من 1,000,000 ريال', 'يحدد لاحقاً'];

type FormState = {
  name: string; company: string; phone: string;
  email: string; projectType: string; budget: string; message: string;
};
type Errors = Partial<Record<keyof FormState, string>>;
const EMPTY: FormState = { name: '', company: '', phone: '', email: '', projectType: '', budget: '', message: '' };

export function ContactContent() {
  const t      = useTranslations('contact');
  const locale = useLocale();
  const isRTL  = locale === 'ar';

  // Scroll-reveal for the left info column children
  const infoColRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = infoColRef.current;
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const children = Array.from(container.querySelectorAll<HTMLElement>('[data-reveal]'));
    children.forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(18px)'; c.style.transition = 'none'; });
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      children.forEach((c, i) => {
        setTimeout(() => {
          c.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
          c.style.opacity = '1'; c.style.transform = 'translateY(0)';
        }, i * 90);
      });
      obs.disconnect();
    }, { threshold: 0.08 });
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  const PROJECT_TYPES = isRTL ? PROJECT_TYPES_AR : PROJECT_TYPES_EN;
  const BUDGETS       = isRTL ? BUDGETS_AR       : BUDGETS_EN;

  const [form,        setForm]        = useState<FormState>(EMPTY);
  const [errors,      setErrors]      = useState<Errors>({});
  const [submitted,   setSubmitted]   = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [submitError, setSubmitError] = useState('');

  const set = (k: keyof FormState, v: string) => {
    setForm(p => ({ ...p, [k]: v }));
    if (errors[k]) setErrors(p => { const n = { ...p }; delete n[k]; return n; });
  };

  function validate(f: FormState): Errors {
    const e: Errors = {};
    if (!f.name.trim())     e.name        = isRTL ? 'الاسم الكامل مطلوب'         : 'Full name is required';
    if (!f.phone.trim())    e.phone       = isRTL ? 'رقم الهاتف مطلوب'           : 'Phone number is required';
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
                            e.email       = isRTL ? 'أدخل عنوان بريد إلكتروني صالحاً' : 'Enter a valid email address';
    if (!f.projectType)     e.projectType = isRTL ? 'الرجاء تحديد نوع المشروع'   : 'Please select a project type';
    if (!f.message.trim())  e.message     = isRTL ? 'يرجى وصف مشروعك'            : 'Please describe your project';
    return e;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: `New Project Enquiry, ${form.projectType}, ${form.name}` }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setSubmitError(data?.error || (isRTL ? 'حدث خطأ. يرجى المحاولة مجدداً.' : 'Something went wrong. Please try again.'));
      }
    } catch {
      setSubmitError(isRTL ? 'خطأ في الشبكة. يرجى التحقق من اتصالك.' : 'Network error. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = (field: keyof FormState): React.CSSProperties => ({
    width: '100%', padding: '12px 14px', fontFamily: 'var(--font-body)', fontSize: 14,
    background: 'var(--alt-bg)', border: `1px solid ${errors[field] ? 'var(--red)' : 'var(--border-color)'}`,
    color: 'var(--fg)', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
    textAlign: isRTL ? 'right' : 'left',
    direction: isRTL ? 'rtl' : 'ltr',
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.12em',
    textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600, color: 'var(--fg)',
    display: 'block', marginBottom: 6,
  };

  const errorStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--red)', marginTop: 4,
  };

  const MAPS_URL = 'https://www.google.com/maps/dir//Al+Binaa+Construction+%26+Industry+SAOC,+1212+Way+2708%D8%8C+Muscat+100,+Oman%E2%80%AD/@23.5886062,58.397839,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3e91ff2839adbf3b:0xfd200a0b7f36082!2m2!1d58.4536493!2d23.5871371?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D';

  const contactInfo = [
    {
      label: t('info_address'),
      value: '1212 Way 2708\nMuscat 100, Oman',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      action: (
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: '0.6rem',
          fontFamily: 'var(--font-body)', fontSize: 10.5, fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--red)', textDecoration: 'none',
          transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {isRTL ? 'الحصول على الاتجاهات' : 'Get Directions'}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M7 7h10v10"/>
          </svg>
        </a>
      ),
    },
    {
      label: t('info_phone'),
      value: '+968 24 693300',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 13.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.86 2.83h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
        </svg>
      ),
    },
    {
      label: t('info_email'),
      value: 'info@albinaa-om.com',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      label: t('info_hours'),
      value: isRTL ? 'الأحد – الخميس: 8 ص – 5 م\nالجمعة – السبت: عند الحاجة'
                   : 'Sun – Thu: 8:00 AM – 5:00 PM\nFri – Sat: By appointment',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
  ];

  return (
    <main>
      <PageBanner
        title={t('banner_title')}
        subtitle={t('banner_sub')}
        img={IMGS.building1}
      />

      <section style={{ background: 'var(--section-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '5rem', alignItems: 'start' }} className="about-grid">

          {/* LEFT: Contact info */}
          <div ref={infoColRef}>
            <div data-reveal><SectionLabel>{isRTL ? 'تواصل معنا' : 'Get in Touch'}</SectionLabel></div>
            <h2 data-reveal style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 2rem', lineHeight: 1.05 }}>
              {isRTL ? 'ابدأ مشروعك\nاليوم' : 'Start Your\nProject Today'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '2.5rem' }}>
              {contactInfo.map((item) => (
                <div key={item.label} data-reveal style={{ paddingTop: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'flex-start', gap: '1rem', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  {/* Icon wrapper */}
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(245,20,31,0.07)', border: '1px solid rgba(245,20,31,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: isRTL ? '0' : '0.14em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 700, color: 'var(--red)', marginBottom: '0.3rem' }}>{item.label}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.65, whiteSpace: 'pre-line' }}>{item.value}</div>
                    {(item as any).action ?? null}
                  </div>
                </div>
              ))}
            </div>

            <div data-reveal style={{ background: 'var(--red)', padding: '1.75rem 2rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
                {isRTL ? 'ضمان الاستجابة السريعة' : 'Fast Response Guarantee'}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.65, margin: 0 }}>
                {isRTL
                  ? 'يُراجَع كل استفسار من قِبل مدير مشروع أول. ستتلقى رداً مفصلاً، يشمل النطاق الأولي والجدول الزمني التقديري، خلال 48 ساعة.'
                  : 'Every enquiry is reviewed by a senior project manager. You will receive a detailed response, including preliminary scope and indicative timeline, within 48 hours.'}
              </p>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1.25rem 1.5rem', background: 'var(--alt-bg)', borderInlineStart: '3px solid var(--border-color)' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--fg-muted)', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>Al Binaa Construction & Industry SAOC</strong><br />
                C.R: 2693300
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div>
            {submitted ? (
              <div style={{ padding: '4rem 3rem', background: 'var(--alt-bg)', textAlign: 'center', borderBlockStart: '3px solid var(--red)' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--fg)', margin: '0 0 0.75rem' }}>
                  {isRTL ? 'تم استلام استفساركم' : 'Enquiry Received'}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--fg-muted)', lineHeight: 1.7, margin: '0 0 2rem' }}>{t('form_success')}</p>
                <button onClick={() => { setForm(EMPTY); setSubmitted(false); }} style={{ background: 'none', border: '1px solid var(--border-color)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.12em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600, color: 'var(--fg-muted)', padding: '10px 24px', transition: 'all 0.2s' }}>
                  {isRTL ? 'إرسال استفسار آخر' : 'Submit Another Enquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>{t('form_name')} <span style={{ color: 'var(--red)' }}>*</span></label>
                    <input value={form.name} onChange={e => set('name', e.target.value)} style={inputStyle('name')} />
                    {errors.name && <p style={errorStyle}>{errors.name}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>{t('form_company')}</label>
                    <input value={form.company} onChange={e => set('company', e.target.value)} style={inputStyle('company')} />
                  </div>
                </div>

                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>{t('form_phone')} <span style={{ color: 'var(--red)' }}>*</span></label>
                    <input value={form.phone} onChange={e => set('phone', e.target.value)} type="tel" style={inputStyle('phone')} dir="ltr" />
                    {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>{t('form_email')}</label>
                    <input value={form.email} onChange={e => set('email', e.target.value)} type="email" style={inputStyle('email')} dir="ltr" />
                    {errors.email && <p style={errorStyle}>{errors.email}</p>}
                  </div>
                </div>

                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>{t('form_type')} <span style={{ color: 'var(--red)' }}>*</span></label>
                    <select value={form.projectType} onChange={e => set('projectType', e.target.value)} style={{ ...inputStyle('projectType'), appearance: 'none', cursor: 'pointer' }}>
                      <option value="">{isRTL ? 'اختر النوع…' : 'Select type…'}</option>
                      {PROJECT_TYPES.map(tp => <option key={tp} value={tp}>{tp}</option>)}
                    </select>
                    {errors.projectType && <p style={errorStyle}>{errors.projectType}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>{t('form_budget')}</label>
                    <select value={form.budget} onChange={e => set('budget', e.target.value)} style={{ ...inputStyle('budget'), appearance: 'none', cursor: 'pointer' }}>
                      <option value="">{isRTL ? 'اختر النطاق…' : 'Select range…'}</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>{t('form_message')} <span style={{ color: 'var(--red)' }}>*</span></label>
                  <textarea
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    rows={5}
                    style={{ ...inputStyle('message'), resize: 'vertical', fontFamily: 'var(--font-body)' }}
                  />
                  {errors.message && <p style={errorStyle}>{errors.message}</p>}
                </div>

                {submitError && (
                  <div role="alert" style={{ padding: '12px 16px', background: 'rgba(245,20,31,0.08)', border: '1px solid rgba(245,20,31,0.25)', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)', lineHeight: 1.55 }}>
                    {submitError}
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, color: 'var(--fg-muted)', margin: 0, lineHeight: 1.6 }}>
                    {isRTL
                      ? 'بإرسال هذا النموذج، توافق على أن يتواصل معك فريق البناء بشأن استفسارك.'
                      : 'By submitting this form you agree to be contacted by Al Binaa regarding your project enquiry.'}
                  </p>
                  <button type="submit" disabled={submitting} style={{
                    background: 'var(--red)', color: '#fff', border: 'none', cursor: submitting ? 'wait' : 'pointer',
                    fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.14em',
                    textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600, padding: '14px 36px',
                    opacity: submitting ? 0.7 : 1, transition: 'opacity 0.2s', whiteSpace: 'nowrap', flexShrink: 0,
                  }}
                    onMouseEnter={e => { if (!submitting) e.currentTarget.style.opacity = '0.85'; }}
                    onMouseLeave={e => { if (!submitting) e.currentTarget.style.opacity = '1'; }}>
                    {submitting ? t('form_sending') : t('form_submit')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map / Location band */}
      <section style={{ background: 'var(--stats-bg)', padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="about-grid">
          <div>
            <SectionLabel>{isRTL ? 'موقعنا' : 'Our Location'}</SectionLabel>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,2.5vw,2rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 1.25rem' }}>
              {isRTL ? 'مسقط، سلطنة عُمان' : 'Muscat, Sultanate of Oman'}
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.75, margin: '0 0 2rem' }}>
              {isRTL
                ? 'مكتبنا المسجل في مسقط، مع مواقع مشاريع نشطة عبر السلطنة، من ظفار إلى ساحل الباطنة. نحن مجهزون للتعبئة الكاملة في أي مكان في عُمان.'
                : 'Our registered office is in Muscat, with active project sites across the Sultanate, from Dhofar to the Batinah Coast. We are equipped for full mobilisation anywhere in Oman.'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                { label: isRTL ? 'المكتب المسجل' : 'Registered Office', value: isRTL ? 'طريق 2708، رقم 1212\nمسقط 100، عُمان' : '1212 Way 2708\nMuscat 100, Oman' },
                { label: isRTL ? 'التغطية'       : 'Coverage',          value: isRTL ? 'جميع المحافظات\nسلطنة عُمان' : 'All Governorates\nSultanate of Oman' },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: isRTL ? '0' : '0.12em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600, color: 'var(--red)', marginBottom: '0.4rem' }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--fg)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-strong)', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { n: isRTL ? '48 ساعة' : '48 hrs', label: isRTL ? 'وقت الاستجابة' : 'Response Time',      desc: isRTL ? 'يُجيب على كل استفسار مدير مشروع خلال 48 ساعة.' : 'Every enquiry answered by a project manager within 48 hours.' },
              { n: '100%',  label: isRTL ? 'فريق عُماني بالكامل' : 'Oman-Based Team', desc: isRTL ? 'جميع إدارة المواقع والهندسة والإشراف تتم داخلياً.' : 'All site management, engineering, and supervision performed in-house.' },
              { n: '24/7',  label: isRTL ? 'مراقبة الموقع' : 'Site Monitoring',     desc: isRTL ? 'تُراقَب المواقع النشطة باستمرار من قِبل فريق العمليات.' : 'Active project sites monitored continuously by our operations team.' },
            ].map(item => (
              <div key={item.label} style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: '0.25rem', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--red)', lineHeight: 1 }}>{item.n}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.1em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600, color: 'var(--fg)' }}>{item.label}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--fg-muted)', margin: 0, lineHeight: 1.55 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Embedded Google Map, exact registered office location */}
        <div style={{ maxWidth: 1400, margin: 'clamp(2.5rem,4vw,3.5rem) auto 0', border: '1px solid var(--border-strong)', overflow: 'hidden', lineHeight: 0 }}>
          <iframe
            title={isRTL ? 'موقع شركة البناء على خرائط جوجل' : 'Al Binaa Construction & Industry SAOC, Google Maps location'}
            src={`https://maps.google.com/maps?q=23.5871371,58.4536493%20(${encodeURIComponent('Al Binaa Construction & Industry SAOC')})&z=16&hl=${isRTL ? 'ar' : 'en'}&output=embed`}
            width="100%"
            height="420"
            style={{ border: 0, display: 'block', filter: 'grayscale(0.15)' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </main>
  );
}
