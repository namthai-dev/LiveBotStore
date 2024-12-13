import { Product } from '@prisma/client';

import prisma from '@/lib/prisma';

export async function createProduct({
  name,
  price,
  isFeatured = false,
  isArchived = false,
  storeId,
  categoryId,
  sizeId,
  colorId,
  images = [],
}: Product & { images: string[] }) {
  return await prisma.product.create({
    data: {
      name,
      price,
      isFeatured,
      isArchived,
      store: { connect: { id: storeId } },
      category: { connect: { id: categoryId } },
      size: { connect: { id: sizeId } },
      color: { connect: { id: colorId } },
      images: {
        create: images.map(url => ({ url })),
      },
    },
  });
}

export async function getProductsByStoreId(id: Product['storeId']) {
  return await prisma.product.findMany({ where: { sizeId: id } });
}
