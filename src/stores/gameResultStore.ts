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
  fractionsQuestions: number;
  geometryQuestions: number;
  algebraQuestions: number;
  percentageQuestions: number;
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

        const countModule = (moduleName: string) => {
          return log.filter((entry) => entry.module === moduleName).length;
        };

        const newPayload: GamePayload = {
          scoreGained: score,
          questionsCorrect,
          questionsWrong,
          fractionsQuestions: countModule('fractions'),
          geometryQuestions: countModule('geometry'),
          algebraQuestions: countModule('algebra'),
          percentageQuestions: countModule('percentage'),
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
