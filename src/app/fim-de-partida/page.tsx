'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import { useGameResultStore } from '@/stores/gameResultStore';
import { Button } from '@/components/ui/button';

export default function EndGamePage() {
  const router = useRouter();
  const { payload, clearGameResult } = useGameResultStore((state) => state);

  const handleGoHome = () => {
    clearGameResult();
    router.push('/home');
  };

  // Fallback in case the page is accessed directly without a payload
  if (!payload) {
    return (
      <div className="min-h-screen bg-background bg-pattern flex items-center justify-center p-4">
        <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Nenhum resultado para exibir</h1>
            <Button onClick={() => router.push('/home')}>Voltar para Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-pattern flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl p-6 border-[#6D93FF] border-4 max-w-md sm:max-w-lg md:max-w-2xl w-full">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Fim da Partida</h1>
        </div>

        <div className="my-6 space-y-4">
          <div className="flex flex-col space-y-4 bg-slate-100 p-4 rounded-lg">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700">Pontuação Total</p>
              <p className="text-2xl font-bold text-green-500">{payload.scoreGained} pts</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700">Acertos</p>
              <p className="text-2xl font-bold text-blue-500">{payload.questionsCorrect}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700">Erros</p>
              <p className="text-2xl font-bold text-red-500">{payload.questionsWrong}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            onClick={handleGoHome}
            className="w-full max-w-xs mx-auto whitespace-normal h-auto active:scale-95 transition-all duration-200"
          >
            Voltar para Home
          </Button>
        </div>
      </div>
    </div>
  );
}
