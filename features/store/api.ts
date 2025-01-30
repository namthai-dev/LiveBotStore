import { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { getStoreByRefId } from './db';
import { Store } from '@prisma/client';

export const query: Record<string, (params: any) => UseQueryOptions> = {
  getByRefId: (params: { id: Store['refId'] }) => ({
    queryKey: ['store'],
    queryFn: async () => {
      return await getStoreByRefId(params.id);
    },
  }),
};
export const mutation: Record<string, UseMutationOptions> = {};

export const store = {
  query,
  mutation,
};
