import { PrismaClient } from '@prisma/client';

declare global {
    const __database__: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    // @ts-expect-error: '__database__' is a custom property we attach to globalThis
    if (!global.__database__) {
        // @ts-expect-error: '__database__' is a custom property we attach to globalThis
        global.__database__ = new PrismaClient();
    }
    // @ts-expect-error: '__database__' is a custom property we attach to globalThis
    prisma = global.__database__;
}

export default prisma;
