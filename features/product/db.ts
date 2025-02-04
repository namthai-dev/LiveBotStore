import prisma from '@/lib/prisma';

import { CreateProductParams, UpdateProductParams } from './type';

export async function create({
  storeId,
  categoryId,
  colorId,
  sizeId,
  name,
  price,
  images,
}: CreateProductParams) {
  return await prisma.product.create({
    data: {
      name,
      price,
      store: { connect: { id: storeId } },
      category: { connect: { id: categoryId } },
      color: { connect: { id: colorId } },
      size: { connect: { id: sizeId } },
      images: {
        create: images,
      },
    },
    include: { images: true },
  });
}

export async function getAllByStoreId(id: string) {
  return await prisma.product.findMany({
    where: { storeId: id },
    include: {
      images: true,
      category: { select: { name: true } },
      color: { select: { name: true } },
      size: { select: { name: true } },
    },
  });
}

export async function remove(id: string) {
  return await prisma.product.delete({ where: { id } });
}

export async function update({
  id,
  categoryId,
  colorId,
  images,
  name,
  price,
  sizeId,
}: UpdateProductParams) {
  return await prisma.product.update({
    where: { id },
    data: {
      categoryId,
      colorId,
      sizeId,
      name,
      price,
      images: {
        update: images?.map(image => ({
          where: { id: image.id },
          data: { url: image.url },
        })),
      },
    },
  });
}
