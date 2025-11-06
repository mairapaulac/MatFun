import { create } from 'zustand';

interface GameLogEntry {
  module: string;
  correct: boolean;
}

interface GameResultState {
  gameLog: GameLogEntry[];
  totalScore: number;
  setGameResult: (log: GameLogEntry[], score: number) => void;
  clearGameResult: () => void;
}

export const useGameResultStore = create<GameResultState>((set) => ({
  gameLog: [],
  totalScore: 0,
  setGameResult: (log, score) => {
    console.log('STORE - Recebendo dados:', { log, score });
    set({ gameLog: log, totalScore: score });
  },
  clearGameResult: () => set({ gameLog: [], totalScore: 0 }),
}));
