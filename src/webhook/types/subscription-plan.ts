export class SubscriptionPlan {
  id: string;
  product: string;

  constructor(partial: Partial<SubscriptionPlan>) {
    Object.assign(this, partial);
  }
}
