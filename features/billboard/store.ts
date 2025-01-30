import { create } from 'zustand';

type BillboardStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useBillboard = create<BillboardStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
