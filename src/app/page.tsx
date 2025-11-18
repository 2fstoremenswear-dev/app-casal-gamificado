export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        fontSize: '24px',
        fontWeight: 'bold',
      }}
    >
      <div>PÁGINA INICIAL TESTE</div>
      <a
        href="/login"
        style={{ fontSize: '18px', color: 'blue', textDecoration: 'underline' }}
      >
        Ir para /login
      </a>
    </div>
  );
}
