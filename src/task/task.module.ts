import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { InvoiceModule } from '../invoice/invoice.module';

@Module({
  imports: [InvoiceModule],
  providers: [TaskService],
})
export class TaskModule {}
