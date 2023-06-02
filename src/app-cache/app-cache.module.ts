import {
  CACHE_MANAGER,
  CacheModule,
  Inject,
  Module,
  OnModuleDestroy,
} from '@nestjs/common';
import { AppCacheService } from './app-cache.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-ioredis';
import { Cache } from 'cache-manager';

@Module({
  imports: [
    ConfigModule,
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>('REDIS_HOST');
        const port = configService.get<number>('REDIS_PORT');
        const ttl = configService.get<number>('REDIS_TIMEOUT');

        return {
          store: redisStore,
          host,
          port,
          ttl,
        };
      },
    }),
  ],
  providers: [AppCacheService],
  exports: [CacheModule, AppCacheService],
})
export class AppCacheModule implements OnModuleDestroy {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  onModuleDestroy() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const redis: Redis = this.cacheManager.store.getClient();
    if (redis) {
      redis.disconnect();
    }
  }
}
