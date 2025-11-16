'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export default function Home() {
  const router = useRouter();
  const hasCompletedOnboarding = useAppStore(
    (state) => state.hasCompletedOnboarding
  );

  useEffect(() => {
    if (!hasCompletedOnboarding) {
      router.push('/onboarding');
    } else {
      router.push('/dashboard');
    }
  }, [hasCompletedOnboarding, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
      <div className="text-center">
        <div className="animate-pulse">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Carregando...
          </h1>
        </div>
      </div>
    </div>
  );
}
