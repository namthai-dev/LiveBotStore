import { exit } from 'node:process';

import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const prisma = new PrismaClient();

// const prettyPrint = (object: object) =>
//     console.log(JSON.stringify(object, undefined, 2));

async function seed() {
    // const user = await prisma.userProfile.create({
    //     data: {
    //         email: 'nam.thai.dev@outlook.com',
    //         name: 'Nam Thai',
    //     },
    // });

    console.log('========= result of seed: =========');
    // prettyPrint({ user });
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