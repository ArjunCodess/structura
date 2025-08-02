import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW = 60;

export async function rateLimit(identifier: string) {
  const key = `rate_limit:${identifier}`;
  
  try {
    const pipeline = redis.pipeline();
    pipeline.incr(key);
    pipeline.expire(key, RATE_LIMIT_WINDOW);
    
    const results = await pipeline.exec();
    
    const count = results[0] as number;
    
    const remaining = Math.max(0, RATE_LIMIT_MAX - count);
    const success = count <= RATE_LIMIT_MAX;
    const reset = Date.now() + (RATE_LIMIT_WINDOW * 1000);
    
    return {
      success,
      limit: RATE_LIMIT_MAX,
      remaining,
      reset,
    };
  } catch (error) {
    console.error('Rate limiting error:', error);
    
    return {
      success: true,
      limit: RATE_LIMIT_MAX,
      remaining: RATE_LIMIT_MAX - 1,
      reset: Date.now() + (RATE_LIMIT_WINDOW * 1000),
    };
  }
}