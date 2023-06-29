import {PrismaClient} from "@prisma/client";

// Give a global definition of prisma so it can run throughout the code
declare global {
    var prisma: PrismaClient | undefined
}

// create client to search for globalThis.prisma or create new PrismaClient
// then check if we are in development not in production then set globalThis as a new client
const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = client;
}

export default client