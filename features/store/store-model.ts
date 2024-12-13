import prisma from '@/lib/prisma';
import { Store } from '@prisma/client';

export async function syncStore(id: Store['refId']) {
  return await prisma.store.create({
    data: {
      refId: id,
    },
  });
}

export async function getStoreByRefId(id: Store['refId']) {
  return await prisma.store.findUnique({ where: { refId: id } });
}
