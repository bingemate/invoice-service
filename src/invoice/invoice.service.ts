import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InvoiceEntity } from './invoice.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceDto } from './dto/invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepository: Repository<InvoiceEntity>,
  ) {}

  async createInvoice(
    userId: string,
    invoiceId: string,
    periodStart: Date,
    periodEnd: Date,
    paid: boolean,
    paidAt: Date,
    amountPaid: number,
    hostedInvoiceUrl: string,
    invoicePdf: string,
  ): Promise<string> {
    const invoice = await this.invoiceRepository.save({
      userId,
      invoiceId,
      periodStart,
      periodEnd,
      paid,
      paidAt,
      amountPaid,
      hostedInvoiceUrl,
      invoicePdf,
    });
    return invoice.id;
  }

  async getInvoicesByUserId(userId: string): Promise<InvoiceDto[]> {
    const invoices = await this.invoiceRepository
      .createQueryBuilder()
      .where('InvoiceEntity.userId=:userId', { userId })
      .orderBy('InvoiceEntity.periodStart', 'DESC')
      .getMany();

    return invoices.map((invoice) => new InvoiceDto(invoice));
  }

  async getInvoiceById(id: string, userId: string): Promise<InvoiceDto> {
    const invoice = await this.invoiceRepository
      .createQueryBuilder()
      .where('InvoiceEntity.id=:id', { id })
      .getOne();

    if (invoice.userId !== userId) {
      throw new UnauthorizedException();
    }

    return new InvoiceDto(invoice);
  }

  async getLastInvoiceByUserId(userId: string): Promise<InvoiceDto> {
    const invoice = await this.invoiceRepository
      .createQueryBuilder()
      .where('InvoiceEntity.userId=:userId', { userId })
      .orderBy('InvoiceEntity.periodStart', 'DESC')
      .getOne();

    return new InvoiceDto(invoice);
  }

  async getUsersWithExpiredSubscribe(): Promise<InvoiceDto[]> {
    const invoices = await this.invoiceRepository
      .createQueryBuilder()
      .distinctOn(['InvoiceEntity.userId'])
      .where('InvoiceEntity.periodEnd < :today', { today: new Date() })
      .getMany();

    return invoices.map((invoice) => new InvoiceDto(invoice));
  }
}
