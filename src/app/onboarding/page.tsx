'use client';

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAppStore } from '@/lib/store';
import { supabase } from '@/lib/supabaseClient';
import { Heart, Sparkles, Target, Brain, ArrowRight } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [formData, setFormData] = useState({
    coupleName: '',
    relationshipDuration: '',
    photo: '',
    sensualMode: false,
  });

  const setProfile = useAppStore((state) => state.setProfile);
  const setHasCompletedOnboarding = useAppStore(
    (state) => state.setHasCompletedOnboarding
  );

  const onboardingSteps = [
    {
      icon: Heart,
      title: 'Resgate o que vocês tinham no início',
      description:
        'Lembra daquele frio na barriga? Das conversas sem fim? Do toque que arrepiava? Vamos trazer isso de volta.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Target,
      title: 'Entenda o que mudou',
      description:
        'A rotina chegou. O cansaço também. Mas o amor ainda está aqui. Vamos mapear esses pontos.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Sparkles,
      title: 'Se conectem através de missões e desafios',
      description:
        'Pequenos gestos diários que fortalecem o vínculo e reacendem o brilho de vocês.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Brain,
      title: 'Receba ajuda personalizada da IA',
      description:
        'Uma inteligência que entende vocês, sugere missões certas e ajuda nos momentos difíceis.',
      gradient: 'from-indigo-500 to-violet-500',
    },
  ];

  const [step, setStep] = useState(0);

  // 🔐 Checa se tem usuário logado no Supabase
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        // Não logado -> volta para o login
        router.replace('/login');
      } else {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
        <p className="text-sm text-gray-600">Verificando sua sessão...</p>
      </div>
    );
  }

  // ... AQUI embaixo você mantém o restante do código que já existia:
  // handleNext, JSX do formulário, etc.
}


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAppStore } from '@/lib/store';
import { Heart, Sparkles, Target, Brain, ArrowRight, Upload } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    coupleName: '',
    relationshipDuration: '',
    photo: '',
    sensualMode: false,
  });

  const setProfile = useAppStore((state) => state.setProfile);
  const setHasCompletedOnboarding = useAppStore(
    (state) => state.setHasCompletedOnboarding
  );

  const onboardingSteps = [
    {
      icon: Heart,
      title: 'Resgate o que vocês tinham no início',
      description:
        'Lembra daquele frio na barriga? Das conversas sem fim? Do toque que arrepiava? Vamos trazer isso de volta.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Target,
      title: 'Entenda o que mudou',
      description:
        'A rotina chegou. O cansaço também. Mas o amor ainda está aí. Vamos identificar o que precisa de atenção.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Sparkles,
      title: 'Se conectem através de missões e desafios',
      description:
        'Pequenos gestos diários que fortalecem o vínculo. Gamificação que torna o amor mais divertido e intencional.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Brain,
      title: 'Receba ajuda personalizada da IA',
      description:
        'Uma inteligência que entende vocês, sugere ações, detecta padrões e ajuda a evitar conflitos antes que aconteçam.',
      gradient: 'from-indigo-500 to-violet-500',
    },
  ];

  const handleNext = () => {
    if (step < onboardingSteps.length) {
      setStep(step + 1);
    } else {
      // Save profile and redirect to quiz
      setProfile({
        coupleName: formData.coupleName,
        relationshipDuration: formData.relationshipDuration,
        photo: formData.photo,
        sensualMode: formData.sensualMode,
        isPremium: false,
        createdAt: new Date(),
      });
      setHasCompletedOnboarding(true);
      router.push('/quiz-inicio');
    }
  };

  const handleSkip = () => {
    setStep(onboardingSteps.length);
  };

  if (step < onboardingSteps.length) {
    const currentStep = onboardingSteps[step];
    const Icon = currentStep.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex gap-2 mb-2">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    index <= step ? 'bg-gradient-to-r ' + currentStep.gradient : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="text-right text-sm text-gray-500">
              {step + 1} de {onboardingSteps.length}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
            <div
              className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${currentStep.gradient} flex items-center justify-center shadow-lg`}
            >
              <Icon className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {currentStep.title}
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {currentStep.description}
            </p>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleSkip}
                variant="ghost"
                className="text-gray-500 hover:text-gray-700"
              >
                Pular
              </Button>
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 shadow-lg"
              >
                Continuar
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Form step
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Vamos começar!</h1>
            <p className="text-gray-600">Conte um pouco sobre vocês</p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="coupleName" className="text-base font-medium">
                Como vocês querem ser chamados?
              </Label>
              <Input
                id="coupleName"
                placeholder="Ex: Ana & João, Casal Silva..."
                value={formData.coupleName}
                onChange={(e) =>
                  setFormData({ ...formData, coupleName: e.target.value })
                }
                className="mt-2 h-12 text-base"
              />
            </div>

            <div>
              <Label htmlFor="duration" className="text-base font-medium">
                Há quanto tempo estão juntos?
              </Label>
              <Input
                id="duration"
                placeholder="Ex: 3 anos, 6 meses..."
                value={formData.relationshipDuration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    relationshipDuration: e.target.value,
                  })
                }
                className="mt-2 h-12 text-base"
              />
            </div>

            <div>
              <Label htmlFor="photo" className="text-base font-medium">
                Foto do casal (opcional)
              </Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-pink-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">
                  Clique para adicionar uma foto
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Você pode adicionar depois
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="sensual" className="text-base font-medium">
                    Ativar Modo Sensual? 🔥
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Missões e sugestões para esquentar a relação
                  </p>
                </div>
                <Switch
                  id="sensual"
                  checked={formData.sensualMode}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, sensualMode: checked })
                  }
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleNext}
            disabled={!formData.coupleName || !formData.relationshipDuration}
            className="w-full mt-8 h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-base font-medium shadow-lg"
          >
            Começar Jornada
            <Heart className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
