import { create } from 'zustand';

type SizeStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSize = create<SizeStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
