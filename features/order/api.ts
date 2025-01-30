import { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { Order } from '@prisma/client';
import { getOrdersByStoreId, createOrder } from './action';
import { CreateOrderParams } from './type';

export const order = {
  query: {
    getStoreByRefId: (id: string): UseQueryOptions<Order[], Error> => ({
      queryKey: ['order', id],
      queryFn: async () => {
        return await getOrdersByStoreId(id);
      },
      enabled: !!id,
      gcTime: 0,
      refetchInterval: 5000,
    }),
  },

  mutation: {
    create: (): UseMutationOptions<Order, Error, CreateOrderParams> => ({
      mutationFn: async (params: CreateOrderParams): Promise<Order> => {
        return await createOrder(params);
      },
    }),
  },
};
