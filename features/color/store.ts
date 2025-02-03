import { create } from 'zustand';
import { UpdateColorParams } from './type';

type ColorStore = {
  data: UpdateColorParams | null;
  isOpen: boolean;
  isEditing: boolean;
  onOpen: () => void;
  onEditing: (data: UpdateColorParams) => void;
  onClose: () => void;
};

export const useColor = create<ColorStore>(set => ({
  data: null,
  isOpen: false,
  isEditing: false,
  onOpen: () => set({ isOpen: true }),
  onEditing: data => set({ isOpen: true, isEditing: true, data }),
  onClose: () => set({ isOpen: false, isEditing: false, data: null }),
}));
