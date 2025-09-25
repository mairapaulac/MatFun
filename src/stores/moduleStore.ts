import { create } from 'zustand';

export interface ModuleState {
  selectedModules: string[]; // E.g., ['area', 'perimeter', 'algebra']
  setSelectedModules: (modules: string[]) => void;
  clearSelectedModules: () => void;
  // An 'all' selection can be handled by checking for an empty array
}

export const useModuleStore = create<ModuleState>((set) => ({
  selectedModules: [], // Default to all modules (empty array means all)
  setSelectedModules: (modules) => set({ selectedModules: modules }),
  clearSelectedModules: () => set({ selectedModules: [] }),
}));
