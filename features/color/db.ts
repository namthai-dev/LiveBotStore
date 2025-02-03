import prisma from '@/lib/prisma';

import { CreateColorParams, UpdateColorParams } from './type';

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

export async function update({ id, name, value }: UpdateColorParams) {
  return await prisma.color.update({
    where: { id: id },
    data: { name, value },
  });
}

export async function remove(id: string) {
  return await prisma.color.delete({ where: { id } });
}
