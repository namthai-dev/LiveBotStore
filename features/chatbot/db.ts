import prisma from '@/lib/prisma';

import { CreateChatbotParams } from './type';

export async function create({ storeId, name }: CreateChatbotParams) {
  return await prisma.chatbot.create({
    data: {
      name: name,
      store: { connect: { id: storeId } },
    },
  });
}

export async function getAllByStoreId(id: string) {
  return await prisma.chatbot.findMany({ where: { storeId: id } });
}
