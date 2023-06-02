import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('invoice')
export class InvoiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  invoiceId: string;

  @Column()
  periodStart: Date;

  @Column()
  periodEnd: Date;

  @Column({ type: 'boolean' })
  paid: boolean;

  @Column()
  paidAt: Date;

  @Column()
  amountPaid: number;

  @Column()
  hostedInvoiceUrl: string;

  @Column()
  invoicePdf: string;
}
