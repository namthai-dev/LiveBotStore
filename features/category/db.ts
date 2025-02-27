import prisma from '@/lib/prisma';

import { CreateCategoryParams, UpdateCatergoryParams } from './type';

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

export async function getAllByStoreIdWithBillboard(id: string) {
  return await prisma.category.findMany({
    where: { storeId: id },
    include: {
      billboard: { select: { label: true } },
    },
  });
}

export async function update({ id, billboardId, name }: UpdateCatergoryParams) {
  return await prisma.category.update({
    where: { id: id },
    data: { billboardId, name },
  });
}

export async function remove(id: string) {
  return await prisma.category.delete({ where: { id } });
}

export async function getCategoryById(id: string) {
  return await prisma.category.findFirst({ where: { id } });
}
