'use server';

import { create, getAllByStoreId, remove, update } from './db';
import { CreateColorParams, UpdateColorParams } from './type';
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

export async function updateColor(params: UpdateColorParams) {
  return await update(params);
}

export async function removeColor(id: string) {
  return await remove(id);
}
