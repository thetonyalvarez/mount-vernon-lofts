export default function MaintenancePage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: '#FFFCF7',
        fontFamily: 'Inter, system-ui, sans-serif',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#E07A5F',
          marginBottom: '1.5rem',
          margin: '0 0 1.5rem',
        }}
      >
        Mount Vernon Lofts
      </p>
      <h1
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 600,
          color: '#2D2B29',
          marginBottom: '1rem',
          margin: '0 0 1rem',
          lineHeight: 1.2,
        }}
      >
        Coming Soon
      </h1>
      <p
        style={{
          fontSize: '1rem',
          color: '#7A6248',
          maxWidth: '420px',
          lineHeight: 1.6,
          margin: '0 auto',
        }}
      >
        We&rsquo;re working on something new. Check back soon for updates on
        available units and pricing.
      </p>
    </div>
  );
}
