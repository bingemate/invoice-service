import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('stripe_customer')
export class StripeCustomerEntity {
  @PrimaryColumn()
  stripeCustomerId: string;

  @PrimaryColumn('uuid')
  userId: string;

  @Column()
  stripeEmail: string;

  @Column()
  name: string;
}
