import prisma from '@/lib/prisma';

import { CreateSizeParams, UpdateSizeParams } from './type';

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

export async function update({ id, name, value }: UpdateSizeParams) {
  return await prisma.size.update({
    where: { id: id },
    data: { name, value },
  });
}

export async function remove(id: string) {
  return await prisma.size.delete({ where: { id } });
}

export async function getSizeById(id: string) {
  return await prisma.size.findFirst({ where: { id } });
}
