'use server';

import { create, getAllByStoreId } from './db';
import { CreateChatbotParams } from './type';
import { getStoreByRefId } from '../store/db';

export async function getChatbotsByStoreId(id: string) {
  const store = await getStoreByRefId(id);
  return await getAllByStoreId(store?.id || id);
}

export async function createChatbot(params: CreateChatbotParams) {
  const store = await getStoreByRefId(params.storeId);
  return await create({
    ...params,
    storeId: store?.id || params.storeId,
  });
}
