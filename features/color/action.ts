'use server';

import { create, getAllByStoreId } from './db';
import { CreateColorParams } from './type';
import { getStoreByRefId } from '../store/db';

export async function getColorsByStoreId(id: string) {
  const store = await getStoreByRefId(id);
  return await getAllByStoreId(store?.id || id);
}

export async function createColor(params: CreateColorParams) {
  const store = await getStoreByRefId(params.storeId);
  return await create({
    ...params,
    storeId: store?.id || params.storeId,
  });
}
