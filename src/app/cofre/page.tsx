'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Lock,
  Unlock,
  Plus,
  Image,
  FileText,
  Heart,
  Calendar,
  Trash2,
} from 'lucide-react';
import type { Memory } from '@/lib/types';

export default function CofrePage() {
  const router = useRouter();
  const memories = useAppStore((state) => state.memories);
  const addMemory = useAppStore((state) => state.addMemory);
  const toggleMemoryLock = useAppStore((state) => state.toggleMemoryLock);
  const isPremium = useAppStore((state) => state.isPremium);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMemory, setNewMemory] = useState({
    type: 'text' as 'photo' | 'text' | 'promise' | 'plan',
    content: '',
    imageUrl: '',
  });

  const handleAddMemory = () => {
    if (!isPremium && memories.length >= 5) {
      router.push('/perfil?tab=premium');
      return;
    }

    if (!newMemory.content) return;

    const memory: Memory = {
      id: Date.now().toString(),
      type: newMemory.type,
      content: newMemory.content,
      imageUrl: newMemory.imageUrl || undefined,
      date: new Date(),
      locked: false,
    };

    addMemory(memory);
    setNewMemory({ type: 'text', content: '', imageUrl: '' });
    setIsAddDialogOpen(false);
  };

  const memoryTypes = [
    { id: 'text', name: 'Memória', icon: FileText },
    { id: 'photo', name: 'Foto', icon: Image },
    { id: 'promise', name: 'Promessa', icon: Heart },
    { id: 'plan', name: 'Plano Futuro', icon: Calendar },
  ];

  const filteredMemories = (type?: string) =>
    type ? memories.filter((m) => m.type === type) : memories;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/dashboard')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-xl">Cofre Emocional</h1>
              <p className="text-sm text-gray-500">
                {memories.length} memórias guardadas
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Free Limit Warning */}
        {!isPremium && memories.length >= 5 && (
          <Card className="p-4 mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-amber-600" />
              <div className="flex-1">
                <p className="font-semibold text-amber-900">
                  Limite de memórias atingido
                </p>
                <p className="text-sm text-amber-700">
                  Seja Premium para memórias ilimitadas
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

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="text">Memórias</TabsTrigger>
            <TabsTrigger value="photo">Fotos</TabsTrigger>
            <TabsTrigger value="promise">Promessas</TabsTrigger>
            <TabsTrigger value="plan">Planos</TabsTrigger>
          </TabsList>

          {['all', 'text', 'photo', 'promise', 'plan'].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-6">
              {filteredMemories(tab === 'all' ? undefined : tab).length === 0 ? (
                <Card className="p-12 text-center">
                  <Lock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Nenhuma memória ainda
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Comece a guardar momentos especiais
                  </p>
                  <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                  >
                    Adicionar Primeira Memória
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMemories(tab === 'all' ? undefined : tab).map(
                    (memory) => {
                      const TypeIcon =
                        memoryTypes.find((t) => t.id === memory.type)?.icon ||
                        FileText;
                      return (
                        <Card
                          key={memory.id}
                          className="p-6 hover:shadow-lg transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <TypeIcon className="w-5 h-5 text-amber-600" />
                              <span className="text-sm font-medium text-gray-700 capitalize">
                                {memoryTypes.find((t) => t.id === memory.type)
                                  ?.name}
                              </span>
                            </div>
                            <button
                              onClick={() => toggleMemoryLock(memory.id)}
                              className="text-gray-400 hover:text-amber-600 transition-colors"
                            >
                              {memory.locked ? (
                                <Lock className="w-5 h-5" />
                              ) : (
                                <Unlock className="w-5 h-5" />
                              )}
                            </button>
                          </div>

                          {memory.imageUrl && (
                            <div className="mb-3 rounded-lg overflow-hidden">
                              <img
                                src={memory.imageUrl}
                                alt="Memory"
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          )}

                          <p className="text-gray-800 mb-3 line-clamp-3">
                            {memory.content}
                          </p>

                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>
                              {new Date(memory.date).toLocaleDateString(
                                'pt-BR'
                              )}
                            </span>
                            {memory.locked && (
                              <span className="flex items-center gap-1 text-amber-600">
                                <Lock className="w-3 h-3" />
                                Protegido
                              </span>
                            )}
                          </div>
                        </Card>
                      );
                    }
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Add Memory Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar ao Cofre</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-3 block">
                Tipo de memória
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {memoryTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() =>
                        setNewMemory({
                          ...newMemory,
                          type: type.id as any,
                        })
                      }
                      className={`p-4 rounded-xl border-2 transition-all ${
                        newMemory.type === type.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 mx-auto mb-2 ${
                          newMemory.type === type.id
                            ? 'text-amber-600'
                            : 'text-gray-400'
                        }`}
                      />
                      <p
                        className={`text-sm font-medium ${
                          newMemory.type === type.id
                            ? 'text-amber-900'
                            : 'text-gray-700'
                        }`}
                      >
                        {type.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {newMemory.type === 'photo' && (
              <div>
                <Label htmlFor="imageUrl">URL da Imagem</Label>
                <Input
                  id="imageUrl"
                  value={newMemory.imageUrl}
                  onChange={(e) =>
                    setNewMemory({ ...newMemory, imageUrl: e.target.value })
                  }
                  placeholder="Cole o link da imagem..."
                  className="mt-2"
                />
              </div>
            )}

            <div>
              <Label htmlFor="content">
                {newMemory.type === 'promise'
                  ? 'Qual é a promessa?'
                  : newMemory.type === 'plan'
                  ? 'Qual é o plano?'
                  : 'Conte sobre essa memória'}
              </Label>
              <Textarea
                id="content"
                value={newMemory.content}
                onChange={(e) =>
                  setNewMemory({ ...newMemory, content: e.target.value })
                }
                placeholder={
                  newMemory.type === 'promise'
                    ? 'Ex: Prometo sempre te ouvir com atenção...'
                    : newMemory.type === 'plan'
                    ? 'Ex: Viajar para a praia em dezembro...'
                    : 'Ex: Aquele dia que fomos ao parque e...'
                }
                className="mt-2 min-h-32 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setIsAddDialogOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddMemory}
                disabled={!newMemory.content}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              >
                Salvar no Cofre
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
