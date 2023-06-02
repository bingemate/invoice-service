import { Controller, Headers, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CheckoutSessionDto } from './dto/checkout-session.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('subscription')
@ApiTags('Subscription')
export class SubscriptionController {
  constructor(private readonly paymentService: SubscriptionService) {}

  @ApiOperation({
    summary: 'Create a checkout session',
  })
  @ApiOkResponse({
    description: 'The checkout session ID',
    type: CheckoutSessionDto,
  })
  @Post('create-checkout-session')
  public async createCheckoutSession(
    @Headers() headers,
  ): Promise<CheckoutSessionDto> {
    const userId = headers['user-id'];
    return await this.paymentService.createCheckoutSession(userId);
  }
}
