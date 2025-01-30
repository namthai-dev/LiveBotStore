import prisma from '@/lib/prisma';

import { CreateCategoryParams } from './type';

export async function create({
  storeId,
  billboardId,
  name,
}: CreateCategoryParams) {
  return await prisma.category.create({
    data: {
      name: name,
      billboard: { connect: { id: billboardId } },
      store: { connect: { id: storeId } },
    },
  });
}

export async function getAllByStoreId(id: string) {
  return await prisma.category.findMany({ where: { storeId: id } });
}
