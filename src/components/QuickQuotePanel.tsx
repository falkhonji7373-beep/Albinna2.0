'use client';

import { useEffect, useState } from 'react';
import { FORMSPREE_ENDPOINT } from '@/lib/config';

interface QuickQuotePanelProps {
  open: boolean;
  onClose: () => void;
}

export function QuickQuotePanel({ open, onClose }: QuickQuotePanelProps) {
  const [form, setForm] = useState({ name: '', phone: '', projectType: '' });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (open) { setSubmitted(false); setForm({ name: '', phone: '', projectType: '' }); setErrors({}); setSubmitError(''); setSubmitting(false); }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, boolean> = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.phone.trim()) errs.phone = true;
    if (!form.projectType) errs.projectType = true;
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          projectType: form.projectType,
          _subject: `Quick Quote Request, ${form.projectType}, ${form.name}`,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setSubmitError(data?.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = (err: boolean): React.CSSProperties => ({
    width: '100%', background: 'var(--input-bg)',
    border: `1px solid ${err ? 'var(--red)' : 'var(--border-color)'}`,
    color: 'var(--fg)', fontFamily: 'var(--font-body)', fontSize: 15,
    padding: '13px 14px', outline: 'none', boxSizing: 'border-box', borderRadius: 0,
  });

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, backdropFilter: 'blur(2px)', animation: 'fadeIn 0.2s ease' }}
        />
      )}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
        width: 'min(440px, 100vw)',
        background: 'var(--section-bg)',
        boxShadow: '-8px 0 48px rgba(0,0,0,0.18)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }}>
        <div style={{ background: 'var(--red)', padding: '2rem 2rem 1.75rem', position: 'relative' }}>
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, lineHeight: 1 }}
          >×</button>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: '0.5rem', fontWeight: 600 }}>Project Enquiry, We respond within 48 hours</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 700, color: '#fff', lineHeight: 1.05 }}>Tell Us About<br />Your Project</div>
        </div>

        <div style={{ padding: '2rem', flex: 1 }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ width: 56, height: 56, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.75rem' }}>We'll Be in Touch!</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>Our team will review your request and respond within 48 hours.</p>
              <button onClick={onClose} style={{ background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, padding: '13px 28px' }}>Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: errors.name ? 'var(--red)' : 'var(--fg-muted)', marginBottom: '0.5rem' }}>
                  Your Name {errors.name && <span style={{ color: 'var(--red)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— required</span>}
                </label>
                <input
                  value={form.name}
                  onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: false }); }}
                  placeholder="Full name"
                  maxLength={120}
                  style={inputStyle(errors.name)}
                  onFocus={e => (e.target.style.borderColor = 'var(--red)')}
                  onBlur={e => (e.target.style.borderColor = errors.name ? 'var(--red)' : 'var(--border-color)')}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: errors.phone ? 'var(--red)' : 'var(--fg-muted)', marginBottom: '0.5rem' }}>
                  Phone Number {errors.phone && <span style={{ color: 'var(--red)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— required</span>}
                </label>
                <input
                  value={form.phone}
                  onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: false }); }}
                  placeholder="+968 ..."
                  type="tel"
                  maxLength={30}
                  style={inputStyle(errors.phone)}
                  onFocus={e => (e.target.style.borderColor = 'var(--red)')}
                  onBlur={e => (e.target.style.borderColor = errors.phone ? 'var(--red)' : 'var(--border-color)')}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: errors.projectType ? 'var(--red)' : 'var(--fg-muted)', marginBottom: '0.5rem' }}>
                  Project Type {errors.projectType && <span style={{ color: 'var(--red)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— required</span>}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {['Commercial', 'Residential', 'Industrial', 'Infrastructure', 'Engineering', 'Other'].map(t => (
                    <button
                      key={t} type="button"
                      onClick={() => { setForm({ ...form, projectType: t }); setErrors({ ...errors, projectType: false }); }}
                      style={{
                        background: form.projectType === t ? 'var(--red)' : 'var(--input-bg)',
                        border: `1px solid ${form.projectType === t ? 'var(--red)' : errors.projectType ? 'var(--red)' : 'var(--border-color)'}`,
                        color: form.projectType === t ? '#fff' : 'var(--fg)',
                        fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
                        padding: '10px 8px', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center',
                      }}
                    >{t}</button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, marginBottom: '1.5rem', padding: '1rem', background: 'var(--alt-bg)', borderLeft: '3px solid var(--red)' }}>
                {[{ val: '30 Years', sub: 'in Oman' }, { val: '200+ Projects', sub: 'delivered' }, { val: "48 Hours", sub: "response" }].map(item => (
                  <div key={item.val} style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--red)', fontWeight: 600, marginBottom: 2 }}>{item.val}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-muted)' }}>{item.sub}</div>
                  </div>
                ))}
              </div>

              {submitError && (
                <div role="alert" style={{ marginBottom: '1rem', padding: '10px 14px', background: 'rgba(245,20,31,0.08)', border: '1px solid rgba(245,20,31,0.3)', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)', lineHeight: 1.5 }}>
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{ width: '100%', background: 'var(--red)', color: '#fff', border: 'none', cursor: submitting ? 'wait' : 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, padding: '17px', transition: 'opacity 0.2s', opacity: submitting ? 0.7 : 1 }}
                onMouseEnter={e => { if (!submitting) e.currentTarget.style.opacity = '0.88'; }}
                onMouseLeave={e => { if (!submitting) e.currentTarget.style.opacity = submitting ? '0.7' : '1'; }}
              >{submitting ? 'Sending…' : 'Send Enquiry →'}</button>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-muted)', marginTop: '0.75rem', textAlign: 'center' }}>We respond within 48 hours.</p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
