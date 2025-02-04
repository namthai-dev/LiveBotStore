import { create } from 'zustand';
import { UpdateProductParams } from './type';

type ProductStore = {
  data: UpdateProductParams | null;
  isOpen: boolean;
  isEditing: boolean;
  onOpen: () => void;
  onEditing: (data: UpdateProductParams) => void;
  onClose: () => void;
};

export const useProduct = create<ProductStore>(set => ({
  data: null,
  isOpen: false,
  isEditing: false,
  onOpen: () => set({ isOpen: true }),
  onEditing: data => set({ isOpen: true, isEditing: true, data }),
  onClose: () => set({ isOpen: false, isEditing: false, data: null }),
}));
