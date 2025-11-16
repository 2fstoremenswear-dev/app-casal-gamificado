'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Flame,
  Heart,
  MessageCircle,
  Sparkles,
  Target,
  Users,
  Lock,
} from 'lucide-react';
import { MISSIONS_DATABASE } from '@/lib/constants';

export default function MissoesPage() {
  const router = useRouter();
  const profile = useAppStore((state) => state.profile);
  const missions = useAppStore((state) => state.missions);
  const addMission = useAppStore((state) => state.addMission);
  const completeMission = useAppStore((state) => state.completeMission);
  const isPremium = useAppStore((state) => state.isPremium);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Todas', icon: Sparkles },
    { id: 'toque', name: 'Toque', icon: Heart },
    { id: 'comunicacao', name: 'Comunicação', icon: MessageCircle },
    { id: 'desejo', name: 'Desejo', icon: Flame },
    { id: 'presenca', name: 'Presença', icon: Users },
    { id: 'romance', name: 'Romance', icon: Target },
    { id: 'sensual', name: 'Sensual', icon: Flame },
  ];

  const handleAddMission = (missionTemplate: any) => {
    if (!isPremium && missions.length >= 5) {
      router.push('/perfil?tab=premium');
      return;
    }

    if (missionTemplate.sensualOnly && !profile?.sensualMode) {
      return;
    }

    addMission({
      ...missionTemplate,
      id: `${missionTemplate.id}-${Date.now()}-${Math.random()}`,
      completed: false,
      date: new Date(),
    });
  };

  const filteredMissions =
    selectedCategory === 'all'
      ? MISSIONS_DATABASE
      : MISSIONS_DATABASE.filter((m) => m.category === selectedCategory);

  const todayMissions = missions.filter(
    (m) => new Date(m.date).toDateString() === new Date().toDateString()
  );

  const completedToday = todayMissions.filter((m) => m.completed).length;

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
            <h1 className="font-bold text-xl">Missões</h1>
            <p className="text-sm text-gray-500">
              {completedToday} de {todayMissions.length} concluídas hoje
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Free Limit Warning */}
        {!isPremium && missions.length >= 5 && (
          <Card className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-amber-600" />
              <div className="flex-1">
                <p className="font-semibold text-amber-900">
                  Limite de missões atingido
                </p>
                <p className="text-sm text-amber-700">
                  Seja Premium para missões ilimitadas
                </p>
              </div>
              <Button
                onClick={() => router.push('/perfil?tab=premium')}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              >
                Desbloquear
              </Button>
            </div>
          </Card>
        )}

        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="today">Hoje</TabsTrigger>
            <TabsTrigger value="discover">Descobrir</TabsTrigger>
          </TabsList>

          {/* Today's Missions */}
          <TabsContent value="today" className="space-y-4 mt-6">
            {todayMissions.length === 0 ? (
              <Card className="p-8 text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="font-semibold text-gray-800 mb-2">
                  Nenhuma missão para hoje
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Adicione missões da aba "Descobrir"
                </p>
              </Card>
            ) : (
              todayMissions.map((mission) => (
                <Card
                  key={mission.id}
                  className={`p-6 transition-all ${
                    mission.completed
                      ? 'bg-green-50 border-green-200'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => completeMission(mission.id)}
                      disabled={mission.completed}
                      className="mt-1"
                    >
                      {mission.completed ? (
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      ) : (
                        <Circle className="w-8 h-8 text-gray-400 hover:text-pink-500 transition-colors" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-1">
                        {mission.title}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {mission.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                          +{mission.xp} XP
                        </span>
                        <span className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full capitalize">
                          {mission.category}
                        </span>
                        {mission.sensualOnly && (
                          <span className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded-full">
                            🔥 Sensual
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Discover Missions */}
          <TabsContent value="discover" className="space-y-6 mt-6">
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMissions.map((mission) => {
                const isAdded = missions.some(
                  (m) =>
                    m.title === mission.title &&
                    new Date(m.date).toDateString() ===
                      new Date().toDateString()
                );
                const isLocked =
                  mission.sensualOnly && !profile?.sensualMode;

                return (
                  <Card
                    key={mission.id}
                    className={`p-6 ${
                      isLocked ? 'opacity-50' : 'hover:shadow-lg'
                    } transition-all`}
                  >
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      {mission.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{mission.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                          +{mission.xp} XP
                        </span>
                        {mission.sensualOnly && (
                          <span className="text-sm">🔥</span>
                        )}
                      </div>
                      <Button
                        onClick={() => handleAddMission(mission)}
                        disabled={isAdded || isLocked}
                        size="sm"
                        className={
                          isAdded
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
                        }
                      >
                        {isLocked ? (
                          <Lock className="w-4 h-4" />
                        ) : isAdded ? (
                          'Adicionada'
                        ) : (
                          'Adicionar'
                        )}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
