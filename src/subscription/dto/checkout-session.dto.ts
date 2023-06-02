import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Expose()
export class CheckoutSessionDto {
  constructor(partial: Partial<CheckoutSessionDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: "L'identifiant de la session Stripe",
  })
  public id: string;
}
