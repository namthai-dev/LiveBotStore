import { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { Billboard } from '@prisma/client';
import { getBillboardsByStoreId, createBillboard } from './action';
import { CreateBillboardParams } from './type';

export const billboard = {
  query: {
    getStoreByRefId: (id: string): UseQueryOptions<Billboard[], Error> => ({
      queryKey: ['billboards', id],
      queryFn: async () => {
        return await getBillboardsByStoreId(id);
      },
      enabled: !!id,
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
