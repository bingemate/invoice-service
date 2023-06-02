import { Module } from '@nestjs/common';
import { SubscriptionModule } from './subscription/subscription.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WebhookModule } from './webhook/webhook.module';
import { StripeModule } from './stripe/stripe.module';
import { InvoiceModule } from './invoice/invoice.module';
import { AppCacheModule } from './app-cache/app-cache.module';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeCustomerModule } from './stripe-customer/stripe-customer.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
      }),
    }),
    SubscriptionModule,
    WebhookModule,
    StripeModule,
    InvoiceModule,
    AppCacheModule,
    StripeCustomerModule,
    MailModule,
  ],
})
export class AppModule {}
