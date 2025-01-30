import { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { Billboard } from '@prisma/client';
import { getBillboardsByStoreId, createBillboard } from './action';
import { CreateBillboardParams } from './type';

export const billboard = {
  query: {
    getStoreByRefId: (
      id: Billboard['storeId'],
    ): UseQueryOptions<Billboard[], Error> => ({
      queryKey: ['store', id],
      queryFn: async () => {
        return await getBillboardsByStoreId(id);
      },
      enabled: !!id,
      gcTime: 0,
      refetchInterval: 5000,
    }),
  },

  mutation: {
    create: (): UseMutationOptions<
      Billboard,
      Error,
      CreateBillboardParams
    > => ({
      mutationFn: async (params: CreateBillboardParams): Promise<Billboard> => {
        return await createBillboard(params);
      },
    }),
  },
};
