'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Heart, Smile, Zap, Flame } from 'lucide-react';
import type { CheckInDaily, CheckInWeekly } from '@/lib/types';

export default function CheckInPage() {
  const router = useRouter();
  const addDailyCheckIn = useAppStore((state) => state.addDailyCheckIn);
  const addWeeklyCheckIn = useAppStore((state) => state.addWeeklyCheckIn);
  const addXP = useAppStore((state) => state.addXP);

  const [dailyAnswers, setDailyAnswers] = useState({
    humor: 0,
    conexao: 0,
    nivelDesejo: 0,
    nivelCarinho: 0,
    energiaEmocional: 0,
  });

  const [weeklyAnswers, setWeeklyAnswers] = useState({
    comoFoiSemana: '',
    pontoFortes: '',
    pontoFracos: '',
  });

  const handleDailySubmit = () => {
    const checkIn: CheckInDaily = {
      date: new Date(),
      ...dailyAnswers,
    };
    addDailyCheckIn(checkIn);
    addXP(30);
    router.push('/dashboard');
  };

  const handleWeeklySubmit = () => {
    const checkIn: CheckInWeekly = {
      weekStart: new Date(),
      comoFoiSemana: weeklyAnswers.comoFoiSemana,
      pontoFortes: weeklyAnswers.pontoFortes.split(',').map((s) => s.trim()),
      pontoFracos: weeklyAnswers.pontoFracos.split(',').map((s) => s.trim()),
      sugestoesIA: [],
    };
    addWeeklyCheckIn(checkIn);
    addXP(50);
    router.push('/dashboard');
  };

  const isDailyComplete = Object.values(dailyAnswers).every((v) => v > 0);
  const isWeeklyComplete =
    weeklyAnswers.comoFoiSemana &&
    weeklyAnswers.pontoFortes &&
    weeklyAnswers.pontoFracos;

  const ScaleSelector = ({
    value,
    onChange,
    icon: Icon,
    label,
  }: {
    value: number;
    onChange: (v: number) => void;
    icon: any;
    label: string;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-purple-600" />
        <Label className="text-base font-medium">{label}</Label>
      </div>
      <div className="flex gap-2 justify-center">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => onChange(num)}
            className={`w-12 h-12 rounded-full font-bold text-lg transition-all ${
              value === num
                ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white scale-110 shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-bold text-xl">Check-in</h1>
            <p className="text-sm text-gray-500">Como vocês estão hoje?</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="daily">Check-in Diário</TabsTrigger>
            <TabsTrigger value="weekly">Check-in Semanal</TabsTrigger>
          </TabsList>

          {/* Daily Check-in */}
          <TabsContent value="daily" className="mt-6">
            <Card className="p-8 space-y-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Como está o dia?</h2>
                <p className="text-gray-600">
                  Responda rápido sobre como vocês estão se sentindo
                </p>
              </div>

              <ScaleSelector
                value={dailyAnswers.humor}
                onChange={(v) => setDailyAnswers({ ...dailyAnswers, humor: v })}
                icon={Smile}
                label="Humor geral"
              />

              <ScaleSelector
                value={dailyAnswers.conexao}
                onChange={(v) =>
                  setDailyAnswers({ ...dailyAnswers, conexao: v })
                }
                icon={Heart}
                label="Nível de conexão"
              />

              <ScaleSelector
                value={dailyAnswers.nivelDesejo}
                onChange={(v) =>
                  setDailyAnswers({ ...dailyAnswers, nivelDesejo: v })
                }
                icon={Flame}
                label="Nível de desejo"
              />

              <ScaleSelector
                value={dailyAnswers.nivelCarinho}
                onChange={(v) =>
                  setDailyAnswers({ ...dailyAnswers, nivelCarinho: v })
                }
                icon={Heart}
                label="Nível de carinho"
              />

              <ScaleSelector
                value={dailyAnswers.energiaEmocional}
                onChange={(v) =>
                  setDailyAnswers({ ...dailyAnswers, energiaEmocional: v })
                }
                icon={Zap}
                label="Energia emocional"
              />

              <Button
                onClick={handleDailySubmit}
                disabled={!isDailyComplete}
                className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-base font-medium"
              >
                Salvar Check-in (+30 XP)
              </Button>
            </Card>
          </TabsContent>

          {/* Weekly Check-in */}
          <TabsContent value="weekly" className="mt-6">
            <Card className="p-8 space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Como foi a semana?</h2>
                <p className="text-gray-600">
                  Reflitam juntos sobre os últimos 7 dias
                </p>
              </div>

              <div>
                <Label className="text-base font-medium mb-2 block">
                  Como foi a semana de vocês?
                </Label>
                <Textarea
                  value={weeklyAnswers.comoFoiSemana}
                  onChange={(e) =>
                    setWeeklyAnswers({
                      ...weeklyAnswers,
                      comoFoiSemana: e.target.value,
                    })
                  }
                  placeholder="Conte como foi a semana, os momentos bons e desafiadores..."
                  className="min-h-32 resize-none"
                />
              </div>

              <div>
                <Label className="text-base font-medium mb-2 block">
                  Pontos fortes da semana
                </Label>
                <Textarea
                  value={weeklyAnswers.pontoFortes}
                  onChange={(e) =>
                    setWeeklyAnswers({
                      ...weeklyAnswers,
                      pontoFortes: e.target.value,
                    })
                  }
                  placeholder="Ex: Mais tempo juntos, conversas profundas, carinho..."
                  className="min-h-24 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separe por vírgulas
                </p>
              </div>

              <div>
                <Label className="text-base font-medium mb-2 block">
                  Pontos que precisam de atenção
                </Label>
                <Textarea
                  value={weeklyAnswers.pontoFracos}
                  onChange={(e) =>
                    setWeeklyAnswers({
                      ...weeklyAnswers,
                      pontoFracos: e.target.value,
                    })
                  }
                  placeholder="Ex: Pouco tempo juntos, discussões, cansaço..."
                  className="min-h-24 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separe por vírgulas
                </p>
              </div>

              <Button
                onClick={handleWeeklySubmit}
                disabled={!isWeeklyComplete}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-base font-medium"
              >
                Salvar Check-in Semanal (+50 XP)
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
