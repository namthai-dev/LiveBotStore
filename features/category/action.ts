'use server';

import {
  create,
  getAllByStoreId,
  getAllByStoreIdWithBillboard,
  remove,
  update,
} from './db';
import { CreateCategoryParams, UpdateCatergoryParams } from './type';
import { getStoreByRefId } from '../store/db';

export async function getCategoriesByStoreId(id: string) {
  const store = await getStoreByRefId(id);
  return await getAllByStoreId(store?.id || id);
}

export async function getCategoriesByStoreIdWithBillboard(id: string) {
  const store = await getStoreByRefId(id);
  return await getAllByStoreIdWithBillboard(store?.id || id);
}

export async function createCategory(params: CreateCategoryParams) {
  const store = await getStoreByRefId(params.storeId);
  return await create({
    ...params,
    storeId: store?.id || params.storeId,
  });
}

export async function updateCategory(params: UpdateCatergoryParams) {
  return await update(params);
}

export async function removeCategory(id: string) {
  return await remove(id);
}
