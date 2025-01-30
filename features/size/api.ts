import { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { Size } from '@prisma/client';
import { getSizesByStoreId, createSize } from './action';
import { CreateSizeParams } from './type';

export const size = {
  query: {
    getStoreByRefId: (id: string): UseQueryOptions<Size[], Error> => ({
      queryKey: ['size', id],
      queryFn: async () => {
        return await getSizesByStoreId(id);
      },
      enabled: !!id,
      gcTime: 0,
      refetchInterval: 5000,
    }),
  },

  mutation: {
    create: (): UseMutationOptions<Size, Error, CreateSizeParams> => ({
      mutationFn: async (params: CreateSizeParams): Promise<Size> => {
        return await createSize(params);
      },
    }),
  },
};
