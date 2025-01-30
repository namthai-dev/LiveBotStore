import { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { Product } from '@prisma/client';
import { getProductsByStoreId, createProduct } from './action';
import { CreateProductParams } from './type';

export const product = {
  query: {
    getStoreByRefId: (id: string): UseQueryOptions<Product[], Error> => ({
      queryKey: ['order', id],
      queryFn: async () => {
        return await getProductsByStoreId(id);
      },
      enabled: !!id,
      gcTime: 0,
      refetchInterval: 5000,
    }),
  },

  mutation: {
    create: (): UseMutationOptions<Product, Error, CreateProductParams> => ({
      mutationFn: async (params: CreateProductParams): Promise<Product> => {
        return await createProduct(params);
      },
    }),
  },
};
