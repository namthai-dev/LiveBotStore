'use server';

import prisma from '@/lib/prisma';

export async function syncStore(id: string) {
  return await prisma.store.create({
    data: {
      refId: id,
    },
  });
}

export async function getStoreByRefId(id: string) {
  return await prisma.store.findUnique({ where: { refId: id } });
}
