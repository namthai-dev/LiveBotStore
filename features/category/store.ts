import { create } from 'zustand';
import { UpdateCatergoryParams } from './type';

type CategoryStore = {
  data: UpdateCatergoryParams | null;
  isOpen: boolean;
  isEditing: boolean;
  onOpen: () => void;
  onEditing: (data: UpdateCatergoryParams) => void;
  onClose: () => void;
};

export const useCategory = create<CategoryStore>(set => ({
  data: null,
  isOpen: false,
  isEditing: false,
  onOpen: () => set({ isOpen: true }),
  onEditing: data => set({ isOpen: true, isEditing: true, data }),
  onClose: () => set({ isOpen: false, isEditing: false, data: null }),
}));
