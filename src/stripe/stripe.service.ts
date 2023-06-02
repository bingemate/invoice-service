import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CheckoutSessionDto } from '../subscription/dto/checkout-session.dto';

@Injectable()
export class StripeService {
  private stripe;
  private readonly stripePriceId: string;
  private readonly stripeSecretKey: string;
  private readonly frontendUrl: string;
  private readonly endpointSecret: string;
  constructor(private readonly configService: ConfigService) {
    this.stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    this.stripePriceId = this.configService.get<string>('STRIPE_PRICE_ID');
    this.frontendUrl = this.configService.get<string>('FRONTEND_URL');
    this.endpointSecret = this.configService.get<string>(
      'STRIPE_WEBHOOK_SECRET',
    );

    this.stripe = new Stripe(this.stripeSecretKey, {
      apiVersion: '2022-11-15',
    });
  }

  async createCheckoutSession(): Promise<CheckoutSessionDto> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price: this.stripePriceId,
            quantity: 1,
          },
        ],
        success_url: `${this.frontendUrl}/billing/success`,
        cancel_url: `${this.frontendUrl}/billing/cancel`,
      });

      return new CheckoutSessionDto({ id: session.id });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e.message);
    }
  }

  async getCustomer(customerId: string): Promise<Stripe.Customer> {
    return this.stripe.customers.retrieve(customerId);
  }

  async getSession(sessionId: string): Promise<Stripe.Checkout.Session> {
    return this.stripe.checkout.sessions.retrieve(sessionId);
  }

  async constructEvent(body: Buffer, signature: string): Promise<Stripe.Event> {
    try {
      return this.stripe.webhooks.constructEvent(
        body,
        signature,
        this.endpointSecret,
      );
    } catch (err) {
      console.error(`Catch Error: ${err.message}`);
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }
  }

  async getSessionByCustomerId(
    customerId: string,
  ): Promise<Stripe.Checkout.Session> {
    const sessions = await this.stripe.checkout.sessions.list({
      limit: 1,
      customer: customerId,
    });

    return sessions.data[0];
  }
}
