import { Put, Controller, Body } from '@nestjs/common';
import { EmailService, InjectEmailer } from './email.providers';
import { EmailPutBody } from './email-put-body';
import { ApiProduces, ApiResponseProperty } from '@nestjs/swagger';

@Controller('email')
export class EmailController {
  public constructor(@InjectEmailer() private readonly emailer: EmailService) {}

  @Put('send')
  @ApiProduces('application/json')
  public async sendEmail(
    @Body() emailBody: EmailPutBody,
  ): Promise<{ success: boolean }> {
    const { to, subject, message } = emailBody;

    const success = await this.emailer.sendEmail(to, subject, message);

    return {
      success,
    };
  }
}
