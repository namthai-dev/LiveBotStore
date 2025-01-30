'use server';

import { create, getAllByStoreId } from './db';
import { CreateProductParams } from './type';
import { getStoreByRefId } from '../store/db';

export async function getProductsByStoreId(id: string) {
  const store = await getStoreByRefId(id);
  return await getAllByStoreId(store?.id || id);
}

export async function createProduct(params: CreateProductParams) {
  const store = await getStoreByRefId(params.storeId);
  return await create({
    ...params,
    storeId: store?.id || params.storeId,
  });
}
