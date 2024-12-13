import { exit } from 'node:process';

import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const prisma = new PrismaClient();

const prettyPrint = (object: object) =>
  console.log(JSON.stringify(object, undefined, 2));

async function seed() {
  const store = await prisma.store.create({
    data: {
      refId: 'random-id',
    },
  });

  console.log('========= result of seed: =========');
  prettyPrint({ store });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async error => {
    console.error(error);
    await prisma.$disconnect();
    exit(1);
  });
