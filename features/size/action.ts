'use server';

import { create, getAllByStoreId } from './db';
import { CreateSizeParams } from './type';
import { getStoreByRefId } from '../store/db';

export async function getSizesByStoreId(id: string) {
  const store = await getStoreByRefId(id);
  return await getAllByStoreId(store?.id || id);
}

export async function createSize(params: CreateSizeParams) {
  const store = await getStoreByRefId(params.storeId);
  return await create({
    ...params,
    storeId: store?.id || params.storeId,
  });
}
