import prisma from '@/lib/prisma';

import { CreateColorParams } from './type';

export async function create({ storeId, name, value }: CreateColorParams) {
  return await prisma.color.create({
    data: {
      name: name,
      value: value,
      store: { connect: { id: storeId } },
    },
  });
}

export async function getAllByStoreId(id: string) {
  return await prisma.color.findMany({ where: { storeId: id } });
}
