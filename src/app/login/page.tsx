'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      }

      // se deu certo, manda pro onboarding (primeiro acesso)
      router.replace('/onboarding');
    } catch (err: any) {
      setError(err.message ?? 'Ocorreu um erro ao autenticar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-3xl p-8 border border-pink-100">
          <h1 className="text-2xl font-bold text-center mb-2">
            App de Casal Gamificado
          </h1>
          <p className="text-center text-gray-500 mb-6">
            {isLogin
              ? 'Entre com seu e-mail e senha'
              : 'Crie sua conta para começar o jogo do relacionamento'}
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@exemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-2.5 shadow hover:opacity-90 disabled:opacity-60"
            >
              {loading
                ? isLogin
                  ? 'Entrando...'
                  : 'Criando conta...'
                : isLogin
                ? 'Entrar'
                : 'Criar conta'}
            </button>
          </form>

          <button
            type="button"
            className="mt-4 text-sm text-center w-full text-pink-600 hover:underline"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin
              ? 'Ainda não tenho conta – criar agora'
              : 'Já tenho conta – fazer login'}
          </button>
        </div>
      </div>
    </div>
  );
}
