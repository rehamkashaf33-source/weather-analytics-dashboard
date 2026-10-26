import Redis from "ioredis";
import { env } from "../config/env";
import { logger } from "./logger";

interface CacheDriver {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSeconds: number): Promise<void>;
}

class RedisCache implements CacheDriver {
  private client = new Redis(env.REDIS_URL!, { maxRetriesPerRequest: 2 });

  constructor() {
    this.client.on("error", (err) => logger.warn("Redis error", { message: err.message }));
  }
  async get(key: string) {
    return this.client.get(key).catch(() => null);
  }
  async set(key: string, value: string, ttl: number) {
    await this.client.set(key, value, "EX", ttl).catch(() => undefined);
  }
}

class MemoryCache implements CacheDriver {
  private store = new Map<string, { value: string; expiresAt: number }>();

  async get(key: string) {
    const hit = this.store.get(key);
    if (!hit) return null;
    if (hit.expiresAt < Date.now()) {
      this.store.delete(key);
      return null;
    }
    return hit.value;
  }
  async set(key: string, value: string, ttl: number) {
    this.store.set(key, { value, expiresAt: Date.now() + ttl * 1000 });
  }
}

const driver: CacheDriver = env.REDIS_URL ? new RedisCache() : new MemoryCache();

/** Read-through cache helper. */
export async function cached<T>(key: string, fetcher: () => Promise<T>, ttl = env.CACHE_TTL_SECONDS): Promise<T> {
  const hit = await driver.get(key);
  if (hit) return JSON.parse(hit) as T;
  const fresh = await fetcher();
  await driver.set(key, JSON.stringify(fresh), ttl);
  return fresh;
}
