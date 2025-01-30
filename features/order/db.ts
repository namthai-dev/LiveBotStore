import prisma from '@/lib/prisma';

import { CreateOrderParams } from './type';

export async function create({ storeId, phone, address }: CreateOrderParams) {
  return await prisma.order.create({
    data: {
      phone: phone,
      address: address,
      store: { connect: { id: storeId } },
    },
  });
}

export async function getAllByStoreId(id: string) {
  return await prisma.order.findMany({ where: { storeId: id } });
}
