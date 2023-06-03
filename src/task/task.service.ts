import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InvoiceService } from '../invoice/invoice.service';

@Injectable()
export class TaskService {
  constructor(private readonly invoiceService: InvoiceService) {}
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async removeRoles() {
    const userWithExpiredSubscripbe =
      await this.invoiceService.getUsersWithExpiredSubscribe();
    /// TODO : remove role on keycloak
  }
}
