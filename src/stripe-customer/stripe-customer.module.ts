import { Module } from '@nestjs/common';
import { StripeCustomerService } from './stripe-customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeCustomerEntity } from './stripe-customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StripeCustomerEntity])],
  providers: [StripeCustomerService],
  exports: [StripeCustomerService],
})
export class StripeCustomerModule {}
