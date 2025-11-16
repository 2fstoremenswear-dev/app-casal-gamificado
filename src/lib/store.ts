'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  CoupleProfile,
  QuizInicio,
  QuizAtual,
  MapaInicio,
  DeltaEmocional,
  Mission,
  CheckInDaily,
  CheckInWeekly,
  CoupleStats,
  Medal,
  Memory,
  AIMessage,
} from './types';
import { XP_PER_LEVEL } from './constants';

interface AppState {
  // Profile
  profile: CoupleProfile | null;
  setProfile: (profile: CoupleProfile) => void;

  // Quizzes
  quizInicio: QuizInicio | null;
  quizAtual: QuizAtual | null;
  setQuizInicio: (quiz: QuizInicio) => void;
  setQuizAtual: (quiz: QuizAtual) => void;

  // Maps
  mapaInicio: MapaInicio | null;
  deltaEmocional: DeltaEmocional | null;
  setMapaInicio: (mapa: MapaInicio) => void;
  setDeltaEmocional: (delta: DeltaEmocional) => void;

  // Stats
  stats: CoupleStats;
  addXP: (xp: number) => void;
  addMedal: (medal: Medal) => void;

  // Missions
  missions: Mission[];
  addMission: (mission: Mission) => void;
  completeMission: (missionId: string) => void;
  getTodayMissions: () => Mission[];

  // Check-ins
  dailyCheckIns: CheckInDaily[];
  weeklyCheckIns: CheckInWeekly[];
  addDailyCheckIn: (checkIn: CheckInDaily) => void;
  addWeeklyCheckIn: (checkIn: CheckInWeekly) => void;

  // Memories
  memories: Memory[];
  addMemory: (memory: Memory) => void;
  toggleMemoryLock: (memoryId: string) => void;

  // AI Chat
  aiMessages: AIMessage[];
  addAIMessage: (message: AIMessage) => void;

  // Premium
  isPremium: boolean;
  setPremium: (premium: boolean) => void;

  // Onboarding
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Profile
      profile: null,
      setProfile: (profile) => set({ profile }),

      // Quizzes
      quizInicio: null,
      quizAtual: null,
      setQuizInicio: (quiz) => set({ quizInicio: quiz }),
      setQuizAtual: (quiz) => set({ quizAtual: quiz }),

      // Maps
      mapaInicio: null,
      deltaEmocional: null,
      setMapaInicio: (mapa) => set({ mapaInicio: mapa }),
      setDeltaEmocional: (delta) => set({ deltaEmocional: delta }),

      // Stats
      stats: {
        pontos: 0,
        nivel: 1,
        xpAtual: 0,
        xpProximoNivel: 100,
        medalhas: [],
        missoesConcluidas: 0,
      },
      addXP: (xp) =>
        set((state) => {
          const newXP = state.stats.xpAtual + xp;
          const newPontos = state.stats.pontos + xp;
          let newNivel = state.stats.nivel;
          let remainingXP = newXP;

          // Check level up
          while (
            newNivel < XP_PER_LEVEL.length &&
            remainingXP >= XP_PER_LEVEL[newNivel]
          ) {
            remainingXP -= XP_PER_LEVEL[newNivel];
            newNivel++;
          }

          return {
            stats: {
              ...state.stats,
              pontos: newPontos,
              nivel: newNivel,
              xpAtual: remainingXP,
              xpProximoNivel:
                newNivel < XP_PER_LEVEL.length
                  ? XP_PER_LEVEL[newNivel]
                  : XP_PER_LEVEL[XP_PER_LEVEL.length - 1],
            },
          };
        }),
      addMedal: (medal) =>
        set((state) => ({
          stats: {
            ...state.stats,
            medalhas: [...state.stats.medalhas, medal],
          },
        })),

      // Missions
      missions: [],
      addMission: (mission) =>
        set((state) => ({
          missions: [...state.missions, mission],
        })),
      completeMission: (missionId) =>
        set((state) => {
          const mission = state.missions.find((m) => m.id === missionId);
          if (!mission || mission.completed) return state;

          const updatedMissions = state.missions.map((m) =>
            m.id === missionId ? { ...m, completed: true } : m
          );

          // Add XP
          get().addXP(mission.xp);

          return {
            missions: updatedMissions,
            stats: {
              ...state.stats,
              missoesConcluidas: state.stats.missoesConcluidas + 1,
            },
          };
        }),
      getTodayMissions: () => {
        const today = new Date().toDateString();
        return get().missions.filter(
          (m) => new Date(m.date).toDateString() === today
        );
      },

      // Check-ins
      dailyCheckIns: [],
      weeklyCheckIns: [],
      addDailyCheckIn: (checkIn) =>
        set((state) => ({
          dailyCheckIns: [...state.dailyCheckIns, checkIn],
        })),
      addWeeklyCheckIn: (checkIn) =>
        set((state) => ({
          weeklyCheckIns: [...state.weeklyCheckIns, checkIn],
        })),

      // Memories
      memories: [],
      addMemory: (memory) =>
        set((state) => ({
          memories: [...state.memories, memory],
        })),
      toggleMemoryLock: (memoryId) =>
        set((state) => ({
          memories: state.memories.map((m) =>
            m.id === memoryId ? { ...m, locked: !m.locked } : m
          ),
        })),

      // AI Chat
      aiMessages: [],
      addAIMessage: (message) =>
        set((state) => ({
          aiMessages: [...state.aiMessages, message],
        })),

      // Premium
      isPremium: false,
      setPremium: (premium) => set({ isPremium: premium }),

      // Onboarding
      hasCompletedOnboarding: false,
      setHasCompletedOnboarding: (completed) =>
        set({ hasCompletedOnboarding: completed }),
    }),
    {
      name: 'couple-app-storage',
    }
  )
);
