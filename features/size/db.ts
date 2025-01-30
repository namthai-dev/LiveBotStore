import prisma from '@/lib/prisma';

import { CreateSizeParams } from './type';

export async function create({ storeId, name, value }: CreateSizeParams) {
  return await prisma.size.create({
    data: {
      name,
      value,
      store: { connect: { id: storeId } },
    },
  });
}

export async function getAllByStoreId(id: string) {
  return await prisma.size.findMany({ where: { storeId: id } });
}
