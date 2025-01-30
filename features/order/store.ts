import { create } from 'zustand';

type OrderStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useOrder = create<OrderStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
