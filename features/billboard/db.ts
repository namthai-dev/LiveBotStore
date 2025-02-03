import prisma from '@/lib/prisma';

import { CreateBillboardParams, UpdateBillboardParams } from './type';

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

export async function remove(id: string) {
  return await prisma.billboard.delete({ where: { id: id } });
}

export async function update({ id, label, imageUrl }: UpdateBillboardParams) {
  return await prisma.billboard.update({
    where: { id },
    data: { label, imageUrl },
  });
}
