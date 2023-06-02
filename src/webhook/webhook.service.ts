import { Injectable } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { CustomerCreated } from './types/customer-created';
import { InvoicePaid } from './types/invoice-paid';
import { StripeCustomerService } from '../stripe-customer/stripe-customer.service';
import { AppCacheService } from '../app-cache/app-cache.service';
import { InvoiceService } from '../invoice/invoice.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly appCacheService: AppCacheService,
    private readonly stripeCustomerService: StripeCustomerService,
    private readonly invoiceService: InvoiceService,
  ) {}

  async handleWebhook(body: Buffer, signature: string) {
    const event = await this.stripeService.constructEvent(body, signature);

    const { type } = event;
    const { object } = event.data;

    switch (type) {
      case 'customer.created':
        console.log('customer.created');
        const customerCreated = new CustomerCreated(object);
        await this.handleCustomerCreated(customerCreated);
        break;

      case 'customer.subscription.created':
        console.log('customer.subscription.created');
        const customerSubscriptionCreated = new CustomerCreated(object);
        // console.log(customerSubscriptionCreated);
        break;

      case 'customer.subscription.updated':
        console.log('customer.subscription.updated');
        // console.log(object);
        break;

      case 'customer.subscription.deleted':
        console.log('customer.subscription.deleted');
        console.log(object);
        break;

      case 'invoice.paid':
        console.log('invoice.paid');
        const invoicePaid = new InvoicePaid(object);
        await this.handleInvoicePaid(invoicePaid);
        /// TODO : send email
        /// TODO : add role on keycloak
        break;
      default:
        console.log('Unhandled event type: ', event.type);
    }

    return;
  }

  async handleCustomerCreated(customerCreated: CustomerCreated) {
    const session = await this.stripeService.getSessionByCustomerId(
      customerCreated.id,
    );

    if (!session) {
      return;
    }

    const userId = await this.appCacheService.get<string>(session.id);

    if (!userId) {
      return;
    }

    await this.stripeCustomerService.createStripeCustomer(
      customerCreated.id,
      userId,
      customerCreated.email,
      customerCreated.name,
    );
  }

  async handleInvoicePaid(invoicePaid: InvoicePaid) {
    const stripeCustomer =
      await this.stripeCustomerService.getStripeCustomerByStripeCustomerId(
        invoicePaid.customer,
      );

    if (!stripeCustomer) {
      return;
    }

    await this.invoiceService.createInvoice(
      stripeCustomer.userId,
      invoicePaid.id,
      new Date(invoicePaid.period_start * 1000),
      new Date(invoicePaid.period_end * 1000),
      invoicePaid.paid,
      new Date(invoicePaid.status_transitions.paid_at * 1000),
      invoicePaid.amount_paid,
      invoicePaid.hosted_invoice_url,
      invoicePaid.invoice_pdf,
    );
  }
}
