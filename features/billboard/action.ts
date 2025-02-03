'use server';

import { create, getAllByStoreId, remove, update } from './db';
import { CreateBillboardParams, UpdateBillboardParams } from './type';
import { getStoreByRefId } from '../store/db';

export async function getBillboardsByStoreId(id: string) {
  const store = await getStoreByRefId(id);
  return await getAllByStoreId(store?.id || id);
}

export async function createBillboard(params: CreateBillboardParams) {
  const store = await getStoreByRefId(params.storeId);
  return await create({
    ...params,
    storeId: store?.id || params.storeId,
  });
}

export async function removeBillboard(id: string) {
  return await remove(id);
}

export async function updateBillboard(params: UpdateBillboardParams) {
  return await update(params);
}
