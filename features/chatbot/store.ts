import { create } from 'zustand';

type ChatbotStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useChatbot = create<ChatbotStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
