export class CustomerCreated {
  id: string;
  email: string;
  name: string;

  constructor(partial: Partial<CustomerCreated>) {
    Object.assign(this, partial);
  }
}
