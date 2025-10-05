import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasourceUrl: process.env.DATABASE_URL + '?pgbouncer=true&connection_limit=1'
  });

if (process.env.NODE_ENV === 'development') globalForPrisma.prisma = prisma;

// Add connection retry logic
export async function connectWithRetry(maxRetries = 5, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await prisma.$connect()
      console.log('Database connected successfully')
      return
    } catch (error) {
      console.log(`Database connection attempt ${i + 1} failed:`, error)
      if (i === maxRetries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}
