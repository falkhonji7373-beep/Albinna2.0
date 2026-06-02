'use client';

import { useState } from 'react';
import { PageBanner } from '@/components/PageBanner';
import { SectionLabel } from '@/components/SectionLabel';
import { IMGS } from '@/lib/data';
import { FORMSPREE_ENDPOINT } from '@/lib/config';

const PROJECT_TYPES = ['Commercial', 'Residential', 'Hospitality', 'Industrial', 'Infrastructure', 'Renovation', 'Other'];
const BUDGETS = ['Under 50,000 OMR', '50,000 – 200,000 OMR', '200,000 – 500,000 OMR', '500,000 – 1,000,000 OMR', 'Above 1,000,000 OMR', 'To be discussed'];

type FormState = {
  name: string;
  company: string;
  phone: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = { name: '', company: '', phone: '', email: '', projectType: '', budget: '', message: '' };

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Full name is required';
  if (!f.phone.trim()) e.phone = 'Phone number is required';
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email address';
  if (!f.projectType) e.projectType = 'Please select a project type';
  if (!f.message.trim()) e.message = 'Please describe your project';
  return e;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const set = (k: keyof FormState, v: string) => {
    setForm(p => ({ ...p, [k]: v }));
    if (errors[k]) setErrors(p => { const n = { ...p }; delete n[k]; return n; });
  };

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
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          phone: form.phone,
          email: form.email,
          projectType: form.projectType,
          budget: form.budget,
          message: form.message,
          _subject: `New Project Enquiry — ${form.projectType} — ${form.name}`,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setSubmitError(data?.error || 'Something went wrong. Please try again or call us directly.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = (field: keyof FormState): React.CSSProperties => ({
    width: '100%',
    padding: '12px 14px',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    background: 'var(--alt-bg)',
    border: `1px solid ${errors[field] ? 'var(--red)' : 'var(--border-color)'}`,
    color: 'var(--fg)',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: 11,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    fontWeight: 600,
    color: 'var(--fg)',
    display: 'block',
    marginBottom: 6,
  };

  const errorStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: 11,
    color: 'var(--red)',
    marginTop: 4,
  };

  return (
    <main>
      <PageBanner
        title="Contact Us"
        subtitle="Tell us about your project. We respond within one business day."
        img={IMGS.building1}
      />

      <section style={{ background: 'var(--section-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '5rem', alignItems: 'start' }} className="about-grid">

          {/* ── LEFT: Contact info ── */}
          <div>
            <SectionLabel>Get in Touch</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 2rem', lineHeight: 1.05 }}>Start Your<br />Project Today</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {[
                { label: 'Address', value: '1212 Way 2708\nMuscat 100, Oman' },
                { label: 'Phone', value: '+968 24 693300' },
                { label: 'Email', value: 'info@albinaa-om.com' },
                { label: 'Office Hours', value: 'Sun – Thu: 8:00 AM – 5:00 PM\nFri – Sat: By appointment' },
              ].map(item => (
                <div key={item.label} style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--red)', marginBottom: '0.4rem' }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.65, whiteSpace: 'pre-line' }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Fast Response Guarantee */}
            <div style={{ background: 'var(--red)', padding: '1.75rem 2rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Fast Response Guarantee</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.65, margin: 0 }}>Every enquiry is reviewed by a senior project manager. You will receive a detailed response — including preliminary scope and indicative timeline — within one working day.</p>
            </div>

            {/* Registration */}
            <div style={{ marginTop: '1.5rem', padding: '1.25rem 1.5rem', background: 'var(--alt-bg)', borderLeft: '3px solid var(--border-color)' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--fg-muted)', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>Al Binaa Construction & Industry SAOC</strong><br />
                C.R: 2693300
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div>
            {submitted ? (
              <div style={{ padding: '4rem 3rem', background: 'var(--alt-bg)', textAlign: 'center', borderTop: '3px solid var(--red)' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--fg)', margin: '0 0 0.75rem' }}>Enquiry Received</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--fg-muted)', lineHeight: 1.7, margin: '0 0 2rem' }}>Thank you, {form.name.split(' ')[0]}. A senior project manager will review your enquiry and respond within one business day.</p>
                <button onClick={() => { setForm(EMPTY); setSubmitted(false); }} style={{ background: 'none', border: '1px solid var(--border-color)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--fg-muted)', padding: '10px 24px', transition: 'all 0.2s' }}>
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>Full Name <span style={{ color: 'var(--red)' }}>*</span></label>
                    <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Ahmed Al Rashidi" style={inputStyle('name')} />
                    {errors.name && <p style={errorStyle}>{errors.name}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Company / Developer</label>
                    <input value={form.company} onChange={e => set('company', e.target.value)} placeholder="AQAR Real Estate" style={inputStyle('company')} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>Phone <span style={{ color: 'var(--red)' }}>*</span></label>
                    <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+968 9XXX XXXX" type="tel" style={inputStyle('phone')} />
                    {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input value={form.email} onChange={e => set('email', e.target.value)} placeholder="name@company.com" type="email" style={inputStyle('email')} />
                    {errors.email && <p style={errorStyle}>{errors.email}</p>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>Project Type <span style={{ color: 'var(--red)' }}>*</span></label>
                    <select value={form.projectType} onChange={e => set('projectType', e.target.value)} style={{ ...inputStyle('projectType'), appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Select type…</option>
                      {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.projectType && <p style={errorStyle}>{errors.projectType}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Estimated Budget</label>
                    <select value={form.budget} onChange={e => set('budget', e.target.value)} style={{ ...inputStyle('budget'), appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Select range…</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Project Description <span style={{ color: 'var(--red)' }}>*</span></label>
                  <textarea value={form.message} onChange={e => set('message', e.target.value)} rows={5} placeholder="Describe your project — location, scope, timeline, and any specific requirements…" style={{ ...inputStyle('message'), resize: 'vertical', fontFamily: 'var(--font-body)' }} />
                  {errors.message && <p style={errorStyle}>{errors.message}</p>}
                </div>

                {submitError && (
                  <div role="alert" style={{ padding: '12px 16px', background: 'rgba(245,20,31,0.08)', border: '1px solid rgba(245,20,31,0.25)', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)', lineHeight: 1.55 }}>
                    {submitError}
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, color: 'var(--fg-muted)', margin: 0, lineHeight: 1.6 }}>
                    By submitting this form you agree to be contacted by Al Binaa regarding your project enquiry.
                  </p>
                  <button type="submit" disabled={submitting} style={{
                    background: 'var(--red)', color: '#fff', border: 'none', cursor: submitting ? 'wait' : 'pointer',
                    fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.14em',
                    textTransform: 'uppercase', fontWeight: 600, padding: '14px 36px',
                    opacity: submitting ? 0.7 : 1, transition: 'opacity 0.2s', whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                    onMouseEnter={e => { if (!submitting) e.currentTarget.style.opacity = '0.85'; }}
                    onMouseLeave={e => { if (!submitting) e.currentTarget.style.opacity = '1'; }}>
                    {submitting ? 'Sending…' : 'Send Enquiry →'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Map / Location band ── */}
      <section style={{ background: 'var(--stats-bg)', padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="about-grid">
          <div>
            <SectionLabel>Our Location</SectionLabel>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,2.5vw,2rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 1.25rem' }}>Muscat, Sultanate of Oman</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.75, margin: '0 0 2rem' }}>
              Our registered office is in Muscat, with active project sites across the Sultanate — from Dhofar to the Batinah Coast. We are equipped for full mobilisation anywhere in Oman.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                { label: 'Registered Office', value: '1212 Way 2708\nMuscat 100, Oman' },
                { label: 'Coverage', value: 'All Governorates\nSultanate of Oman' },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--red)', marginBottom: '0.4rem' }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--fg)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-strong)', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { n: '< 1 day', label: 'Response Time', desc: 'Every enquiry answered by a project manager within one business day.' },
              { n: '100%', label: 'Oman-Based Team', desc: 'All site management, engineering, and supervision performed in-house.' },
              { n: '24/7', label: 'Site Monitoring', desc: 'Active project sites monitored continuously by our operations team.' },
            ].map(item => (
              <div key={item.label} style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: '0.25rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--red)', lineHeight: 1 }}>{item.n}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--fg)' }}>{item.label}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--fg-muted)', margin: 0, lineHeight: 1.55 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
