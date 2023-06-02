import { SubscriptionPlan } from './subscription-plan';

export class CustomerSubscriptionCreated {
  id: string;
  customer: string;
  created: number;
  plan: SubscriptionPlan;
  start_date: number;
  status: string;
  current_period_start: number;
  current_period_end: number;

  constructor(partial: Partial<CustomerSubscriptionCreated>) {
    Object.assign(this, partial);
  }
}
