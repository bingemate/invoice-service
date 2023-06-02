import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail(email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Testing Nest MailerModule',
      text: 'welcome',
    });
  }
}
