import { create } from 'zustand';
import { UpdateSizeParams } from './type';

type SizeStore = {
  data: UpdateSizeParams | null;
  isOpen: boolean;
  isEditing: boolean;
  onOpen: () => void;
  onEditing: (data: UpdateSizeParams) => void;
  onClose: () => void;
};

export const useSize = create<SizeStore>(set => ({
  data: null,
  isOpen: false,
  isEditing: false,
  onOpen: () => set({ isOpen: true }),
  onEditing: data => set({ isOpen: true, isEditing: true, data }),
  onClose: () => set({ isOpen: false, isEditing: false, data: null }),
}));
