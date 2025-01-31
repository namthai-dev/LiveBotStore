import { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { Chatbot } from '@prisma/client';
import { getChatbotsByStoreId, createChatbot } from './action';
import { CreateChatbotParams } from './type';

export const chatbot = {
  query: {
    getStoreByRefId: (id: string): UseQueryOptions<Chatbot[], Error> => ({
      queryKey: ['chatbot', id],
      queryFn: async () => {
        return await getChatbotsByStoreId(id);
      },
      enabled: !!id,
      gcTime: 0,
      refetchInterval: 5000,
    }),
  },

  mutation: {
    create: (): UseMutationOptions<Chatbot, Error, CreateChatbotParams> => ({
      mutationFn: async (params: CreateChatbotParams): Promise<Chatbot> => {
        return await createChatbot(params);
      },
    }),
  },
};
