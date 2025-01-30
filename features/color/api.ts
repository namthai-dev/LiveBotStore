import { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { Color } from '@prisma/client';
import { getColorsByStoreId, createColor } from './action';
import { CreateColorParams } from './type';

export const color = {
  query: {
    getStoreByRefId: (id: string): UseQueryOptions<Color[], Error> => ({
      queryKey: ['color', id],
      queryFn: async () => {
        return await getColorsByStoreId(id);
      },
      enabled: !!id,
      gcTime: 0,
      refetchInterval: 5000,
    }),
  },

  mutation: {
    create: (): UseMutationOptions<Color, Error, CreateColorParams> => ({
      mutationFn: async (params: CreateColorParams): Promise<Color> => {
        return await createColor(params);
      },
    }),
  },
};
