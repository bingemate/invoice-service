import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StripeCustomerEntity } from './stripe-customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StripeCustomerService {
  constructor(
    @InjectRepository(StripeCustomerEntity)
    private readonly stripeCustomerRepository: Repository<StripeCustomerEntity>,
  ) {}

  async createStripeCustomer(
    stripeCustomerId: string,
    userId: string,
    stripeEmail: string,
    name: string,
  ): Promise<void> {
    await this.stripeCustomerRepository.save({
      stripeCustomerId,
      userId,
      stripeEmail,
      name,
    });
  }

  async getStripeCustomerByUserId(
    userId: string,
  ): Promise<StripeCustomerEntity> {
    return this.stripeCustomerRepository
      .createQueryBuilder()
      .where('StripeCustomerEntity.userId=:userId', { userId })
      .getOne();
  }

  async getStripeCustomerByStripeCustomerId(
    stripeCustomerId: string,
  ): Promise<StripeCustomerEntity> {
    return this.stripeCustomerRepository
      .createQueryBuilder()
      .where('StripeCustomerEntity.stripeCustomerId=:stripeCustomerId', {
        stripeCustomerId,
      })
      .getOne();
  }
}
