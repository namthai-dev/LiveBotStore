import { create } from 'zustand';

type ColorStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useColor = create<ColorStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
