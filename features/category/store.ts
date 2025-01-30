import { create } from 'zustand';

type CategoryStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCategory = create<CategoryStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
