import { prisma } from './prisma';

// Utility function to handle database operations with retry logic
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      const isLastAttempt = i === maxRetries - 1;
      const isPreparedStatementError = error && 
        typeof error === 'object' && 
        'message' in error && 
        typeof error.message === 'string' &&
        error.message.includes('prepared statement');

      if (isPreparedStatementError && !isLastAttempt) {
        console.log(`Database operation failed, retrying... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}

// Safe database operations
export const db = {
  async createPost(options: any) {
    return withRetry(() => prisma.post.create(options));
  },

  async findManyPosts(options: any) {
    return withRetry(() => prisma.post.findMany(options));
  },

  async createEvent(options: any) {
    return withRetry(() => prisma.event.create(options));
  },

  async findManyEvents(options: any) {
    return withRetry(() => prisma.event.findMany(options));
  },

  async countPosts(options: any) {
    return withRetry(() => prisma.post.count(options));
  },

  async countEvents(options: any) {
    return withRetry(() => prisma.event.count(options));
  },

  async findUniquePost(options: any) {
    return withRetry(() => prisma.post.findUnique(options));
  },

  async updatePost(options: any) {
    return withRetry(() => prisma.post.update(options));
  },

  async deletePost(options: any) {
    return withRetry(() => prisma.post.delete(options));
  },

  async createPhoto(options: any) {
    return withRetry(() => prisma.photo.create(options));
  },

  async findManyPhotos(options: any) {
    return withRetry(() => prisma.photo.findMany(options));
  },

  async countPhotos(options: any) {
    return withRetry(() => prisma.photo.count(options));
  },

  async findUniquePhoto(options: any) {
    return withRetry(() => prisma.photo.findUnique(options));
  },

  async updatePhoto(options: any) {
    return withRetry(() => prisma.photo.update(options));
  },

  async deletePhoto(options: any) {
    return withRetry(() => prisma.photo.delete(options));
  },
};
