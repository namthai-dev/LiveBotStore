import { create } from 'zustand';
import { UpdateBillboardParams } from './type';

type BillboardStore = {
  data: UpdateBillboardParams | null;
  isOpen: boolean;
  isEditing: boolean;
  onOpen: () => void;
  onClose: () => void;
  onEditing: (data: UpdateBillboardParams) => void;
};

export const useBillboard = create<BillboardStore>(set => ({
  data: null,
  isOpen: false,
  isEditing: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, isEditing: false, data: null }),
  onEditing: data => set({ isOpen: true, isEditing: true, data }),
}));
