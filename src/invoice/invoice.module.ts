import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { StripeModule } from '../stripe/stripe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from './invoice.entity';
import { InvoiceController } from './invoice.controller';

@Module({
  imports: [StripeModule, TypeOrmModule.forFeature([InvoiceEntity])],
  providers: [InvoiceService],
  exports: [InvoiceService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
