'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message || 'Não foi possível fazer login.');
      setLoading(false);
      return;
    }

    // Login OK → manda pro dashboard (depois a gente melhora essa lógica)
    router.replace('/dashboard');
  }

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message || 'Não foi possível criar a conta.');
      setLoading(false);
      return;
    }

    setLoading(false);
    setErrorMsg(
      'Conta criada! Agora é só fazer login com seu e-mail e senha.'
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 px-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="mb-6 text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl text-white">♥</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Entrar no aplicativo do casal
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Use seu e-mail e senha para acessar seu painel.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {errorMsg}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="seuemail@exemplo.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="mínimo 6 caracteres"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>

          <Button
            type="button"
            disabled={loading}
            variant="outline"
            className="w-full mt-2"
            onClick={handleSignUp}
          >
            Criar conta com esse e-mail
          </Button>
        </form>

        <p className="mt-4 text-[11px] text-gray-500 text-center">
          Ao criar uma conta, vocês concordam em usar o app para fortalecer o relacionamento
          e não para bisbilhotar ou invadir a privacidade um do outro. 💘
        </p>
      </Card>
    </div>
  );
}
