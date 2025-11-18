'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAppStore } from '@/lib/store';
import { TrendingDown, ArrowRight, ArrowLeft } from 'lucide-react';
import type { QuizAtual, DeltaEmocional } from '@/lib/types';

export default function QuizAtualPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const setQuizAtual = useAppStore((state) => state.setQuizAtual);
  const setDeltaEmocional = useAppStore((state) => state.setDeltaEmocional);
  const mapaInicio = useAppStore((state) => state.mapaInicio);

  const [answers, setAnswers] = useState<QuizAtual>({
    nivelCarinhoHoje: 0,
    distanciaEmocional: 0,
    mudancasRotina: '',
    gatilhosRecentes: '',
    tempoJuntos: 0,
    intimidadeAtual: 0,
    frequenciaDiscussoes: 0,
  });

  const questions = [
    {
      id: 'nivelCarinhoHoje',
      title: 'Como está o nível de carinho hoje?',
      type: 'scale' as const,
      labels: ['Pouco carinhosos', 'Muito carinhosos'],
    },
    {
      id: 'distanciaEmocional',
      title: 'Vocês sentem distância emocional?',
      type: 'scale' as const,
      labels: ['Muito próximos', 'Muito distantes'],
      reverse: true,
    },
    {
      id: 'tempoJuntos',
      title: 'Quanto tempo de qualidade passam juntos?',
      type: 'scale' as const,
      labels: ['Muito pouco', 'Muito tempo'],
    },
    {
      id: 'intimidadeAtual',
      title: 'Como está a intimidade física hoje?',
      type: 'scale' as const,
      labels: ['Pouca intimidade', 'Muita intimidade'],
    },
    {
      id: 'frequenciaDiscussoes',
      title: 'Com que frequência vocês discutem?',
      type: 'scale' as const,
      labels: ['Raramente', 'Frequentemente'],
      reverse: true,
    },
    {
      id: 'mudancasRotina',
      title: 'O que mudou na rotina de vocês?',
      type: 'text' as const,
      placeholder:
        'Ex: Trabalho mais puxado, filhos, cansaço, menos tempo juntos...',
    },
    {
      id: 'gatilhosRecentes',
      title: 'Quais foram os principais gatilhos de conflito recentemente?',
      type: 'text' as const,
      placeholder: 'Ex: Falta de atenção, cansaço, estresse, ciúmes...',
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
      // Calculate Delta Emocional
      if (mapaInicio) {
        const delta: DeltaEmocional = {
          toque: answers.intimidadeAtual - mapaInicio.toque,
          comunicacao: (6 - answers.distanciaEmocional) - mapaInicio.comunicacao,
          desejo: answers.intimidadeAtual - mapaInicio.desejo,
          presenca: answers.tempoJuntos - mapaInicio.presenca,
          romance: answers.nivelCarinhoHoje - mapaInicio.romance,
          estabilidadeEmocional:
            (6 - answers.frequenciaDiscussoes) - mapaInicio.estabilidadeEmocional,
        };

        setQuizAtual(answers);
        setDeltaEmocional(delta);
      }

      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const isAnswered = () => {
    const value = answers[currentQuestion.id as keyof QuizAtual];
    if (currentQuestion.type === 'scale') {
      return value > 0;
    }
    return value !== '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex gap-2 mb-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  index <= step
                    ? 'bg-gradient-to-r from-slate-600 to-gray-700'
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
            <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-slate-600 to-gray-700 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {currentQuestion.title}
            </h2>
            <p className="text-sm text-gray-500">
              Seja honesto sobre o momento atual
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
                      answers[currentQuestion.id as keyof QuizAtual] === value
                        ? 'bg-gradient-to-br from-slate-600 to-gray-700 text-white scale-110 shadow-lg'
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
                value={answers[currentQuestion.id as keyof QuizAtual] as string}
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
              className="flex-1 h-12 bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 text-white"
            >
              {step === questions.length - 1 ? 'Ver Resultado' : 'Próxima'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
