import { Redis } from "@upstash/redis";

const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW = 3600;

const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

const inMemoryStore: Record<string, { count: number; reset: number }> = {};

/**
 * Rate limit function that uses Redis if available, otherwise falls back to in-memory
 * @param identifier The identifier to rate limit on (usually IP address)
 * @returns Rate limiting result
 */
export async function rateLimit(identifier: string): Promise<RateLimitResult> {
  const now = Math.floor(Date.now() / 1000);
  const key = `ratelimit:${identifier}`;
  const reset = now + RATE_LIMIT_WINDOW;
  
  if (redis) {
    try {
      const multi = redis.multi();
      multi.incr(key);
      multi.expire(key, RATE_LIMIT_WINDOW);
      const [count] = await multi.exec();
      
      const remaining = Math.max(0, RATE_LIMIT_MAX - (count as number));
      
      return {
        success: (count as number) <= RATE_LIMIT_MAX,
        limit: RATE_LIMIT_MAX,
        remaining,
        reset,
      };
    } catch (error) {
      console.error("Redis rate limiting error:", error);
    }
  }
  
  if (!inMemoryStore[key] || inMemoryStore[key].reset < now) {
    inMemoryStore[key] = { count: 1, reset };
  } else {
    inMemoryStore[key].count += 1;
  }
  
  const count = inMemoryStore[key].count;
  const remaining = Math.max(0, RATE_LIMIT_MAX - count);
  
  return {
    success: count <= RATE_LIMIT_MAX,
    limit: RATE_LIMIT_MAX,
    remaining,
    reset,
  };
}