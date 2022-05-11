import { PrismaClient } from "@prisma/client";

/* Const to log all the changes made on prisma  */
export const prisma = new PrismaClient({
    log: ['query']
});