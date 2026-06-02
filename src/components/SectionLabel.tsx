export function SectionLabel({ children, inverted }: { children: React.ReactNode; inverted?: boolean }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem',
      border: `1px solid ${inverted ? 'rgba(255,255,255,0.14)' : 'rgba(201,10,26,0.22)'}`,
      borderRadius: 100,
      padding: '4px 14px 4px 10px',
      background: inverted ? 'rgba(255,255,255,0.04)' : 'rgba(245,20,31,0.05)',
    }}>
      <div style={{
        width: 5, height: 5, borderRadius: '50%',
        background: inverted ? 'rgba(255,255,255,0.55)' : 'var(--red)',
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.18em',
        textTransform: 'uppercase', fontWeight: 600,
        color: inverted ? 'rgba(255,255,255,0.55)' : 'var(--red)',
      }}>{children}</span>
    </div>
  );
}
