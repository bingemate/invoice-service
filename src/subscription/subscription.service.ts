import { Injectable } from '@nestjs/common';
import { CheckoutSessionDto } from './dto/checkout-session.dto';
import { StripeService } from '../stripe/stripe.service';
import { AppCacheService } from '../app-cache/app-cache.service';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly appCacheService: AppCacheService,
  ) {}

  async createCheckoutSession(userId: string): Promise<CheckoutSessionDto> {
    const checkoutSession = await this.stripeService.createCheckoutSession();
    await this.appCacheService.set(checkoutSession.id, userId);
    return checkoutSession;
  }
}
