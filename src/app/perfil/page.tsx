'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAppStore } from '@/lib/store';

export default function PerfilPage() {
  const router = useRouter();
  const profile = useAppStore((state) => state.profile);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h1 className="text-xl font-bold">Perfil do Casal</h1>

        <div className="text-sm text-gray-700 space-y-1">
          <p>
            <span className="font-semibold">Nome do casal: </span>
            {profile?.coupleName || 'Ainda não preenchido'}
          </p>
          <p>
            <span className="font-semibold">Tempo juntos: </span>
            {profile?.relationshipDuration || 'Ainda não preenchido'}
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            Voltar para o dashboard
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Sair da conta
          </Button>
        </div>
      </Card>
    </div>
  );
}
