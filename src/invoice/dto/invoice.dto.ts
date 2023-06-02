import { Exclude } from 'class-transformer';

export class InvoiceDto {
  id: string;
  invoiceId: string;
  periodStart: Date;
  periodEnd: Date;
  paid: boolean;
  paidAt: Date;
  amountPaid: number;
  hostedInvoiceUrl: string;
  invoicePdf: string;

  constructor(partial: Partial<InvoiceDto>) {
    Object.assign(this, partial);
  }
}
