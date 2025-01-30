import prisma from '@/lib/prisma';

import { CreateBillboardParams } from './type';

export async function create({
  storeId,
  label,
  imageUrl,
}: CreateBillboardParams) {
  return await prisma.billboard.create({
    data: {
      label: label,
      imageUrl: imageUrl,
      store: { connect: { id: storeId } },
    },
  });
}

export async function getAllByStoreId(id: string) {
  return await prisma.billboard.findMany({ where: { storeId: id } });
}
