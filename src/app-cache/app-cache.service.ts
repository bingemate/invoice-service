import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class AppCacheService {
  private readonly defaultTtl: number;
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {
    this.defaultTtl = this.configService.get<number>('REDIS_TIMEOUT');
  }

  async get<T>(key): Promise<T> {
    return await this.cacheManager.get<T>(key);
  }

  async set<T>(key, data, ttl = this.defaultTtl): Promise<T> {
    await this.cacheManager.set(key, data.toString(), ttl * 1000);
    return data;
  }
}
