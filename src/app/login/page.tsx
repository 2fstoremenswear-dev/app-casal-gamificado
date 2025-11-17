'use client';

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(135deg, #fee2e2, #fce7f3, #ede9fe)',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '24px 32px',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '20px',
            fontWeight: 700,
            marginBottom: '8px',
          }}
        >
          Tela de Login
        </h1>
        <p
          style={{
            fontSize: '14px',
            color: '#6b7280',
          }}
        >
          Se você está vendo esta tela, a rota <b>/login</b> está funcionando.
        </p>
      </div>
    </div>
  );
}
