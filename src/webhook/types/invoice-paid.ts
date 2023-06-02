import { StatusTransition } from './status-transition';

export class InvoicePaid {
  id: string;
  customer: string;
  customer_email: string;
  customer_name: string;

  hosted_invoice_url: string;
  invoice_pdf: string;

  subscription: string;
  amount_paid: number;
  payment_intent: string;
  number: string;

  period_start: number;
  period_end: number;

  status: string;
  paid: boolean;

  status_transitions: StatusTransition;

  constructor(partial: Partial<InvoicePaid>) {
    Object.assign(this, partial);
  }
}
