import prisma from '@/lib/prisma';

import { CreateProductParams } from './type';

export async function create({
  storeId,
  categoryId,
  colorId,
  sizeId,
  name,
  price,
}: CreateProductParams) {
  return await prisma.product.create({
    data: {
      name,
      price,
      store: { connect: { id: storeId } },
      category: { connect: { id: categoryId } },
      color: { connect: { id: colorId } },
      size: { connect: { id: sizeId } },
    },
  });
}

export async function getAllByStoreId(id: string) {
  return await prisma.product.findMany({ where: { storeId: id } });
}
