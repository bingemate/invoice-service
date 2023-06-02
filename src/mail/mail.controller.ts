import { Controller, Get, Param } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Mail test')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('/:email')
  public async sendMail(@Param('email') email: string): Promise<void> {
    return await this.mailService.sendMail(email);
  }
}
