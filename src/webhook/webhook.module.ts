import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { StripeModule } from '../stripe/stripe.module';
import { StripeCustomerModule } from '../stripe-customer/stripe-customer.module';
import { AppCacheModule } from '../app-cache/app-cache.module';
import { InvoiceModule } from '../invoice/invoice.module';

@Module({
  imports: [StripeModule, AppCacheModule, StripeCustomerModule, InvoiceModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
