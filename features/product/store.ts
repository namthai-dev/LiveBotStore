import { create } from 'zustand';

type ProductStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useProduct = create<ProductStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
