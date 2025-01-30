import { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { createProduct } from './db';

export const query: Record<string, (params: any) => UseQueryOptions> = {
  getByStoreId: () => ({
    queryKey: ['product'],
    queryFn: async () => {},
  }),
};
export const mutation: Record<string, UseMutationOptions> = {
  create: {
    mutationFn: params => {
      return createProduct(params as any);
    },
  },
};

export const product = {
  query,
  mutation,
};
