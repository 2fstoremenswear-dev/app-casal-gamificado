// Constantes do aplicativo

export const MISSIONS_DATABASE = [
  {
    id: 'toque-surpresa',
    title: 'Toque Surpresa do Dia',
    description: 'Surpreenda seu par com um toque carinhoso inesperado',
    category: 'toque' as const,
    xp: 50,
    sensualOnly: false,
  },
  {
    id: 'provocacao-secreta',
    title: 'Provocação Secreta',
    description: 'Envie uma mensagem provocante durante o dia',
    category: 'desejo' as const,
    xp: 60,
    sensualOnly: false,
  },
  {
    id: 'memoria-inicio',
    title: 'Recrie uma Memória do Início',
    description: 'Faça algo que vocês costumavam fazer no começo',
    category: 'romance' as const,
    xp: 80,
    sensualOnly: false,
  },
  {
    id: 'carinho-inesperado',
    title: 'Carinho Inesperado',
    description: 'Demonstre carinho de forma espontânea',
    category: 'toque' as const,
    xp: 40,
    sensualOnly: false,
  },
  {
    id: 'mensagem-quente',
    title: 'Mensagem Quente',
    description: 'Envie uma mensagem sensual para esquentar o clima',
    category: 'sensual' as const,
    xp: 70,
    sensualOnly: true,
  },
  {
    id: 'ritual-5min',
    title: 'Ritual de 5 Minutos de Conexão',
    description: 'Dediquem 5 minutos apenas para se olharem e conversarem',
    category: 'presenca' as const,
    xp: 60,
    sensualOnly: false,
  },
  {
    id: 'elogio-sincero',
    title: 'Elogio Sincero',
    description: 'Faça um elogio genuíno sobre algo que você admira',
    category: 'comunicacao' as const,
    xp: 45,
    sensualOnly: false,
  },
  {
    id: 'beijo-prolongado',
    title: 'Beijo Prolongado',
    description: 'Dê um beijo demorado, sem pressa',
    category: 'toque' as const,
    xp: 55,
    sensualOnly: false,
  },
  {
    id: 'plano-noite-especial',
    title: 'Plano para Noite Especial',
    description: 'Planeje uma noite especial com todos os detalhes',
    category: 'sensual' as const,
    xp: 100,
    sensualOnly: true,
  },
  {
    id: 'conversa-profunda',
    title: 'Conversa Profunda',
    description: 'Tenham uma conversa sincera sobre sentimentos',
    category: 'comunicacao' as const,
    xp: 70,
    sensualOnly: false,
  },
];

export const XP_PER_LEVEL = [
  0, 100, 250, 450, 700, 1000, 1400, 1850, 2350, 2900, 3500, 4200, 5000, 6000, 7500,
];

export const LEVEL_NAMES = [
  'Recomeço',
  'Descoberta',
  'Conexão',
  'Sintonia',
  'Cumplicidade',
  'Paixão',
  'Intimidade',
  'Harmonia',
  'Profundidade',
  'Fusão',
  'Transcendência',
  'Eternidade',
  'Almas Gêmeas',
  'Amor Infinito',
  'Lendários',
];

export const MEDALS = [
  {
    id: 'primeira-missao',
    name: 'Primeiro Passo',
    description: 'Completou a primeira missão',
    icon: '🎯',
  },
  {
    id: 'semana-completa',
    name: 'Semana Perfeita',
    description: 'Completou todas as missões da semana',
    icon: '⭐',
  },
  {
    id: 'nivel-5',
    name: 'Cumplicidade Alcançada',
    description: 'Alcançou o nível 5',
    icon: '💫',
  },
  {
    id: 'checkin-30dias',
    name: 'Dedicação Total',
    description: '30 dias consecutivos de check-in',
    icon: '🔥',
  },
  {
    id: 'modo-sensual',
    name: 'Chama Acesa',
    description: 'Completou 10 missões sensuais',
    icon: '🔥',
  },
  {
    id: 'cofre-10memorias',
    name: 'Guardião de Memórias',
    description: 'Salvou 10 memórias no cofre',
    icon: '💝',
  },
];

export const PREMIUM_FEATURES = {
  monthly: {
    price: 29.90,
    features: [
      'IA completa e ilimitada',
      'Modo Sensual desbloqueado',
      'Missões ilimitadas',
      'Cofre Emocional completo',
      'Relatórios semanais detalhados',
      'Níveis avançados (11-15)',
      'Sugestões personalizadas diárias',
      'Análise de padrões emocionais',
    ],
  },
  yearly: {
    price: 239.90,
    pricePerMonth: 19.99,
    discount: '33% de desconto',
    features: [
      'Todos os benefícios do plano mensal',
      '+ 2 meses grátis',
      'Prioridade no suporte',
      'Acesso antecipado a novos recursos',
    ],
  },
};

export const AI_PROMPTS = {
  missionSuggestion: `Você é uma IA especializada em relacionamentos. Com base no perfil do casal e no Delta Emocional, sugira uma missão personalizada que ajude a fortalecer o pilar mais fraco. Seja específico, romântico e prático. Formato: { title: string, description: string, category: string }`,
  
  conflictDetection: `Analise os check-ins recentes e identifique se o casal está entrando em um ciclo de conflito. Considere: frequência de discussões, distância emocional, energia emocional baixa. Retorne: { isConflict: boolean, severity: 'low' | 'medium' | 'high', suggestion: string }`,
  
  weeklyReport: `Crie um relatório semanal personalizado para o casal. Analise: pontos fortes da semana, áreas que precisam de atenção, sugestões práticas para a próxima semana. Seja encorajador e específico.`,
  
  sensualMessage: `Crie uma mensagem sensual elegante e provocante, mas não explícita. Deve ser romântica, aumentar o desejo e criar antecipação. Adapte ao contexto do relacionamento.`,
  
  chatResponse: `Você é uma IA conselheira de relacionamentos. Responda de forma empática, prática e encorajadora. Foque em soluções concretas e fortalecimento da conexão emocional.`,
};
