'use server';

import { create, getAllByStoreId } from './db';
import { CreateOrderParams } from './type';
import { getStoreByRefId } from '../store/db';

export async function getOrdersByStoreId(id: string) {
  const store = await getStoreByRefId(id);
  return await getAllByStoreId(store?.id || id);
}

export async function createOrder(params: CreateOrderParams) {
  const store = await getStoreByRefId(params.storeId);
  return await create({
    ...params,
    storeId: store?.id || params.storeId,
  });
}
