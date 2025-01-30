import { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { Category } from '@prisma/client';
import { getCategoriesByStoreId, createCategory } from './action';
import { CreateCategoryParams } from './type';

export const category = {
  query: {
    getStoreByRefId: (id: string): UseQueryOptions<Category[], Error> => ({
      queryKey: ['category', id],
      queryFn: async () => {
        return await getCategoriesByStoreId(id);
      },
      enabled: !!id,
      gcTime: 0,
      refetchInterval: 5000,
    }),
  },

  mutation: {
    create: (): UseMutationOptions<Category, Error, CreateCategoryParams> => ({
      mutationFn: async (params: CreateCategoryParams): Promise<Category> => {
        return await createCategory(params);
      },
    }),
  },
};
