'use server';

import { Billboard } from '@prisma/client';
import { create, getAllByStoreId } from './db';
import { CreateBillboardParams } from './type';
import { getStoreByRefId } from '../store/db';

export async function getBillboardsByStoreId(id: Billboard['storeId']) {
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
