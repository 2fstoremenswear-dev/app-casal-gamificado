'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Brain, Lock, Sparkles } from 'lucide-react';
import type { AIMessage } from '@/lib/types';

export default function IAChatPage() {
  const router = useRouter();
  const isPremium = useAppStore((state) => state.isPremium);
  const aiMessages = useAppStore((state) => state.aiMessages);
  const addAIMessage = useAppStore((state) => state.addAIMessage);
  const profile = useAppStore((state) => state.profile);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiMessages]);

  // Initialize with welcome message
  useEffect(() => {
    if (aiMessages.length === 0) {
      addAIMessage({
        id: Date.now().toString(),
        role: 'assistant',
        content: `Olá, ${profile?.coupleName}! 💕\n\nEu sou a IA do relacionamento de vocês. Estou aqui para ajudar a fortalecer a conexão, sugerir ações práticas e entender melhor o que vocês estão vivendo.\n\nComo posso ajudar hoje?`,
        timestamp: new Date(),
      });
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!isPremium && aiMessages.length >= 10) {
      router.push('/perfil?tab=premium');
      return;
    }

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    addAIMessage(userMessage);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (in production, call OpenAI API)
    setTimeout(() => {
      const responses = [
        'Entendo como vocês estão se sentindo. Que tal tentarem um ritual de 5 minutos de conexão hoje? Sentem-se frente a frente, olhem nos olhos um do outro e compartilhem algo que admiram.',
        'Isso é muito comum em relacionamentos! A rotina pode distanciar, mas pequenos gestos fazem diferença. Sugiro que vocês façam uma missão de "Toque Surpresa" hoje.',
        'Percebo que vocês estão passando por um momento desafiador. Lembrem-se: todo relacionamento tem altos e baixos. O importante é manter a comunicação aberta e honesta.',
        'Que lindo! Vocês estão no caminho certo. Continue investindo nesses momentos de conexão. Que tal recriarem uma memória especial do início?',
        'Vejo que a intimidade precisa de atenção. Não se cobrem tanto - o desejo flutua naturalmente. Foquem primeiro em reconectar emocionalmente, e o resto vem naturalmente.',
      ];

      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      addAIMessage(aiResponse);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isPremium && aiMessages.length >= 10) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Limite Atingido</h2>
          <p className="text-gray-600 mb-6">
            Você atingiu o limite de 10 mensagens gratuitas. Seja Premium para
            conversas ilimitadas com a IA!
          </p>
          <Button
            onClick={() => router.push('/perfil?tab=premium')}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
          >
            Desbloquear Premium
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">IA do Relacionamento</h1>
              <p className="text-xs text-gray-500">
                {isPremium ? 'Ilimitado' : `${aiMessages.length}/10 mensagens`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
          {aiMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'bg-white text-gray-800 shadow-md'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-600">
                      IA do Casal
                    </span>
                  </div>
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p
                  className={`text-xs mt-2 ${
                    message.role === 'user'
                      ? 'text-pink-100'
                      : 'text-gray-500'
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    />
                    <div
                      className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">Pensando...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1 h-12"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="h-12 px-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          {!isPremium && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              {10 - aiMessages.length} mensagens restantes •{' '}
              <button
                onClick={() => router.push('/perfil?tab=premium')}
                className="text-purple-600 hover:underline font-medium"
              >
                Seja Premium para ilimitado
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
