'use server';

import { create, getAllByStoreId, remove, update } from './db';
import { CreateProductParams, UpdateProductParams } from './type';
import { getStoreByRefId } from '../store/db';

export async function getProductsByStoreId(id: string) {
  const store = await getStoreByRefId(id);
  return (await getAllByStoreId(store?.id || id)).map(i => ({
    ...i,
    price: i.price.toNumber(),
  }));
}

export async function createProduct(params: CreateProductParams) {
  const store = await getStoreByRefId(params.storeId);
  const product = await create({
    ...params,
    storeId: store?.id || params.storeId,
  });
  return { ...product, price: product.price.toNumber() };
}

export async function removeProduct(id: string) {
  const product = await remove(id);
  return { ...product, price: product.price.toNumber() };
}

export async function updateProduct(params: UpdateProductParams) {
  const product = await update(params);
  return { ...product, price: product.price.toNumber() };
}
