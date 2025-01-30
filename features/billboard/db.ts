import { Billboard } from '@prisma/client';
import prisma from '@/lib/prisma';

import { CreateBillboardParams } from './type';

export async function create({
  storeId,
  label,
  imageUrl,
}: CreateBillboardParams) {
  console.log(storeId, label, imageUrl);
  return await prisma.billboard.create({
    data: {
      label: label,
      imageUrl: imageUrl,
      store: { connect: { id: storeId } },
    },
  });
}

export async function getAllByStoreId(id: Billboard['storeId']) {
  return await prisma.billboard.findMany({ where: { storeId: id } });
}
