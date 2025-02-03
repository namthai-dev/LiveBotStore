'use server';

import { create, getAllByStoreId, remove, update } from './db';
import { CreateSizeParams, UpdateSizeParams } from './type';
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

export async function updateSize(params: UpdateSizeParams) {
  return await update(params);
}

export async function removeSize(id: string) {
  return await remove(id);
}
