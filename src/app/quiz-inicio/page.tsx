'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAppStore } from '@/lib/store';
import { Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import type { QuizInicio, MapaInicio } from '@/lib/types';

export default function QuizInicioPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const setQuizInicio = useAppStore((state) => state.setQuizInicio);
  const setMapaInicio = useAppStore((state) => state.setMapaInicio);

  const [answers, setAnswers] = useState<QuizInicio>({
    nivelCarinho: 0,
    frequenciaEncontros: 0,
    intensidadeToque: 0,
    nivelProvocacao: 0,
    rotinaSexual: 0,
    conexaoDiaria: '',
    resolucaoProblemas: '',
    encantamentoInicial: '',
  });

  const questions = [
    {
      id: 'nivelCarinho',
      title: 'Como era o nível de carinho entre vocês no início?',
      type: 'scale' as const,
      labels: ['Pouco carinhosos', 'Muito carinhosos'],
    },
    {
      id: 'frequenciaEncontros',
      title: 'Com que frequência vocês se encontravam?',
      type: 'scale' as const,
      labels: ['Raramente', 'Todos os dias'],
    },
    {
      id: 'intensidadeToque',
      title: 'Qual era a intensidade do toque físico?',
      type: 'scale' as const,
      labels: ['Pouco toque', 'Muito toque'],
    },
    {
      id: 'nivelProvocacao',
      title: 'Como era o nível de provocação e flerte?',
      type: 'scale' as const,
      labels: ['Pouca provocação', 'Muita provocação'],
    },
    {
      id: 'rotinaSexual',
      title: 'Como era a intimidade física entre vocês?',
      type: 'scale' as const,
      labels: ['Pouca intimidade', 'Muita intimidade'],
    },
    {
      id: 'conexaoDiaria',
      title: 'Como vocês se conectavam no dia a dia?',
      type: 'text' as const,
      placeholder:
        'Ex: Conversávamos por horas, mandávamos mensagens o dia todo...',
    },
    {
      id: 'resolucaoProblemas',
      title: 'Como vocês resolviam os problemas?',
      type: 'text' as const,
      placeholder: 'Ex: Conversávamos abertamente, evitávamos conflitos...',
    },
    {
      id: 'encantamentoInicial',
      title: 'O que mais encantava vocês um no outro?',
      type: 'text' as const,
      placeholder: 'Ex: O jeito de sorrir, a atenção, o carinho...',
    },
  ];

  const currentQuestion = questions[step];

  const handleScaleChange = (value: number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  const handleTextChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate Mapa do Início
      const mapa: MapaInicio = {
        toque: answers.intensidadeToque,
        comunicacao: answers.conexaoDiaria ? 4 : 3,
        desejo: answers.nivelProvocacao,
        presenca: answers.frequenciaEncontros,
        romance: answers.nivelCarinho,
        estabilidadeEmocional: answers.resolucaoProblemas ? 4 : 3,
      };

      setQuizInicio(answers);
      setMapaInicio(mapa);
      router.push('/quiz-atual');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const isAnswered = () => {
    const value = answers[currentQuestion.id as keyof QuizInicio];
    if (currentQuestion.type === 'scale') {
      return value > 0;
    }
    return value !== '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex gap-2 mb-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  index <= step
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <div className="text-right text-sm text-gray-500">
            {step + 1} de {questions.length}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="mb-8">
            <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {currentQuestion.title}
            </h2>
            <p className="text-sm text-gray-500">
              Pense em como era no início da relação
            </p>
          </div>

          {currentQuestion.type === 'scale' ? (
            <div className="space-y-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{currentQuestion.labels[0]}</span>
                <span>{currentQuestion.labels[1]}</span>
              </div>
              <div className="flex gap-3 justify-center">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleScaleChange(value)}
                    className={`w-14 h-14 rounded-full font-bold text-lg transition-all duration-300 ${
                      answers[currentQuestion.id as keyof QuizInicio] === value
                        ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white scale-110 shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <Textarea
                value={answers[currentQuestion.id as keyof QuizInicio] as string}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="min-h-32 text-base resize-none"
              />
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {step > 0 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 h-12"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Voltar
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!isAnswered()}
              className="flex-1 h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
            >
              {step === questions.length - 1 ? 'Finalizar' : 'Próxima'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
