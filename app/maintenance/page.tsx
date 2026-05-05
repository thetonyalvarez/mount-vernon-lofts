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
      <h1
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 600,
          color: '#2D2B29',
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        Under Maintenance
      </h1>
    </div>
  );
}
