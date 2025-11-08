import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameLogEntry {
  module: string;
  correct: boolean;
}

interface GamePayload {
  scoreGained: number;
  questionsCorrect: number;
  questionsWrong: number;
  algebraCorrect: number;
  geometryCorrect: number;
  fractionsCorrect: number;
  percentageCorrect: number;
}

interface GameResultState {
  gameLog: GameLogEntry[];
  totalScore: number;
  payload: GamePayload | null;
  setGameResult: (log: GameLogEntry[], score: number) => void;
  clearGameResult: () => void;
}

const initialState = {
  gameLog: [],
  totalScore: 0,
  payload: null,
};

export const useGameResultStore = create<GameResultState>()(
  persist(
    (set) => ({
      ...initialState,
      setGameResult: (log, score) => {
        const questionsCorrect = log.filter((entry) => entry.correct).length;
        const questionsWrong = log.length - questionsCorrect;

        const countModuleCorrect = (moduleName: string) => {
          return log.filter(
            (entry) => entry.module === moduleName && entry.correct
          ).length;
        };

        const newPayload: GamePayload = {
          scoreGained: score,
          questionsCorrect,
          questionsWrong,
          algebraCorrect: countModuleCorrect('algebra'),
          geometryCorrect: countModuleCorrect('geometry'),
          fractionsCorrect: countModuleCorrect('fraction'),
          percentageCorrect: countModuleCorrect('percentage'),
        };

        set({ gameLog: log, totalScore: score, payload: newPayload });
      },
      clearGameResult: () => set(initialState),
    }),
    {
      name: 'game-result-storage', // nome da chave no localStorage
    }
  )
);
