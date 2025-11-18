'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Heart,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Target,
  MessageCircle,
  Lock,
  User,
  CheckCircle2,
  Circle,
  Crown,
} from 'lucide-react';
import { LEVEL_NAMES, MISSIONS_DATABASE } from '@/lib/constants';

export default function DashboardPage() {
  const router = useRouter();
  const profile = useAppStore((state) => state.profile);
  const stats = useAppStore((state) => state.stats);
  const deltaEmocional = useAppStore((state) => state.deltaEmocional);
  const isPremium = useAppStore((state) => state.isPremium);
  const missions = useAppStore((state) => state.missions);
  const addMission = useAppStore((state) => state.addMission);
  const completeMission = useAppStore((state) => state.completeMission);

  const [todayMissions, setTodayMissions] = useState<any[]>([]);

  useEffect(() => {
    // Generate today's missions if none exist
    const today = new Date().toDateString();
    const existingTodayMissions = missions.filter(
      (m) => new Date(m.date).toDateString() === today
    );

    if (existingTodayMissions.length === 0) {
      // Generate 3 random missions
      const availableMissions = MISSIONS_DATABASE.filter(
        (m) => !m.sensualOnly || profile?.sensualMode
      );
      const shuffled = [...availableMissions].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 3);

      selected.forEach((mission) => {
        addMission({
          ...mission,
          id: `${mission.id}-${Date.now()}-${Math.random()}`,
          completed: false,
          date: new Date(),
        });
      });

      setTodayMissions(
        selected.map((m) => ({
          ...m,
          id: `${m.id}-${Date.now()}-${Math.random()}`,
          completed: false,
          date: new Date(),
        }))
      );
    } else {
      setTodayMissions(existingTodayMissions);
    }
  }, []);

  const xpProgress = (stats.xpAtual / stats.xpProximoNivel) * 100;

  const getDeltaColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getDeltaIcon = (value: number) => {
    if (value > 0) return TrendingUp;
    if (value < 0) return TrendingDown;
    return Circle;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">{profile?.coupleName}</h1>
              <p className="text-xs text-gray-500">
                Juntos há {profile?.relationshipDuration}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/perfil')}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Level Card */}
          <Card className="p-6 bg-gradient-to-br from-pink-500 to-purple-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm opacity-90">Nível do Casal</p>
                <h2 className="text-3xl font-bold">{stats.nivel}</h2>
                <p className="text-xs opacity-75">
                  {LEVEL_NAMES[stats.nivel - 1]}
                </p>
              </div>
              <Sparkles className="w-12 h-12 opacity-80" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>XP: {stats.xpAtual}</span>
                <span>{stats.xpProximoNivel}</span>
              </div>
              <Progress value={xpProgress} className="h-2 bg-white/20" />
            </div>
          </Card>

          {/* Points Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pontos Totais</p>
                <h2 className="text-3xl font-bold text-gray-800">
                  {stats.pontos}
                </h2>
                <p className="text-xs text-gray-500">
                  {stats.missoesConcluidas} missões concluídas
                </p>
              </div>
              <Target className="w-12 h-12 text-purple-500" />
            </div>
          </Card>

          {/* Premium Card */}
          <Card
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              isPremium
                ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white'
                : 'border-2 border-dashed border-purple-300'
            }`}
            onClick={() => !isPremium && router.push('/perfil?tab=premium')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">
                  {isPremium ? 'Premium Ativo' : 'Seja Premium'}
                </p>
                <h2 className="text-2xl font-bold">
                  {isPremium ? 'Ilimitado' : 'Desbloqueie'}
                </h2>
                <p className="text-xs opacity-75">
                  {isPremium ? 'Todos os recursos' : 'Cresçam 3x mais rápido'}
                </p>
              </div>
              {isPremium ? (
                <Crown className="w-12 h-12" />
              ) : (
                <Lock className="w-12 h-12 text-purple-400" />
              )}
            </div>
          </Card>
        </div>

        {/* Delta Emocional */}
        {deltaEmocional && (
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Delta Emocional - O que mudou
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(deltaEmocional).map(([key, value]) => {
                const Icon = getDeltaIcon(value);
                return (
                  <div
                    key={key}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <Icon className={`w-5 h-5 ${getDeltaColor(value)}`} />
                    <div>
                      <p className="text-xs text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className={`font-bold ${getDeltaColor(value)}`}>
                        {value > 0 ? '+' : ''}
                        {value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Today's Missions */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-pink-600" />
            Missões de Hoje
          </h3>
          <div className="space-y-3">
            {todayMissions.map((mission) => (
              <div
                key={mission.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  mission.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-white border-gray-200 hover:border-pink-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => completeMission(mission.id)}
                    disabled={mission.completed}
                    className="mt-1"
                  >
                    {mission.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 hover:text-pink-500" />
                    )}
                  </button>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">
                      {mission.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {mission.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                        +{mission.xp} XP
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {mission.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            onClick={() => router.push('/missoes')}
            variant="outline"
            className="w-full mt-4"
          >
            Ver Todas as Missões
          </Button>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={() => router.push('/checkin')}
            className="h-24 flex flex-col gap-2 bg-white text-gray-800 hover:bg-gray-50 border-2 border-gray-200"
          >
            <Heart className="w-6 h-6 text-pink-500" />
            <span className="text-sm">Check-in</span>
          </Button>
          <Button
            onClick={() => router.push('/ia-chat')}
            className="h-24 flex flex-col gap-2 bg-white text-gray-800 hover:bg-gray-50 border-2 border-gray-200"
          >
            <MessageCircle className="w-6 h-6 text-purple-500" />
            <span className="text-sm">IA do Casal</span>
          </Button>
          <Button
            onClick={() => router.push('/cofre')}
            className="h-24 flex flex-col gap-2 bg-white text-gray-800 hover:bg-gray-50 border-2 border-gray-200"
          >
            <Lock className="w-6 h-6 text-amber-500" />
            <span className="text-sm">Cofre</span>
          </Button>
          <Button
            onClick={() => router.push('/missoes')}
            className="h-24 flex flex-col gap-2 bg-white text-gray-800 hover:bg-gray-50 border-2 border-gray-200"
          >
            <Sparkles className="w-6 h-6 text-indigo-500" />
            <span className="text-sm">Missões</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
