import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ConfigModule } from '@nestjs/config';
import { AppCacheModule } from '../app-cache/app-cache.module';

@Module({
  imports: [ConfigModule, AppCacheModule],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
