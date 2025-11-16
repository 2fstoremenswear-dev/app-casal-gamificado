// Tipos do aplicativo de casais

export interface CoupleProfile {
  coupleName: string;
  relationshipDuration: string;
  photo?: string;
  sensualMode: boolean;
  isPremium: boolean;
  createdAt: Date;
}

export interface QuizInicio {
  nivelCarinho: number; // 1-5
  frequenciaEncontros: number; // 1-5
  intensidadeToque: number; // 1-5
  nivelProvocacao: number; // 1-5
  rotinaSexual: number; // 1-5
  conexaoDiaria: string;
  resolucaoProblemas: string;
  encantamentoInicial: string;
}

export interface QuizAtual {
  nivelCarinhoHoje: number; // 1-5
  distanciaEmocional: number; // 1-5
  mudancasRotina: string;
  gatilhosRecentes: string;
  tempoJuntos: number; // 1-5
  intimidadeAtual: number; // 1-5
  frequenciaDiscussoes: number; // 1-5
}

export interface MapaInicio {
  toque: number;
  comunicacao: number;
  desejo: number;
  presenca: number;
  romance: number;
  estabilidadeEmocional: number;
}

export interface DeltaEmocional {
  toque: number;
  comunicacao: number;
  desejo: number;
  presenca: number;
  romance: number;
  estabilidadeEmocional: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  category: 'toque' | 'comunicacao' | 'desejo' | 'presenca' | 'romance' | 'sensual';
  xp: number;
  completed: boolean;
  sensualOnly: boolean;
  date: Date;
}

export interface CheckInDaily {
  date: Date;
  humor: number; // 1-5
  conexao: number; // 1-5
  nivelDesejo: number; // 1-5
  nivelCarinho: number; // 1-5
  energiaEmocional: number; // 1-5
}

export interface CheckInWeekly {
  weekStart: Date;
  comoFoiSemana: string;
  pontoFortes: string[];
  pontoFracos: string[];
  sugestoesIA: string[];
}

export interface CoupleStats {
  pontos: number;
  nivel: number; // 1-15
  xpAtual: number;
  xpProximoNivel: number;
  medalhas: Medal[];
  missoesConcluidas: number;
}

export interface Medal {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface Memory {
  id: string;
  type: 'photo' | 'text' | 'promise' | 'plan';
  content: string;
  imageUrl?: string;
  date: Date;
  locked: boolean;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface PremiumPlan {
  type: 'monthly' | 'yearly';
  price: number;
  features: string[];
}
