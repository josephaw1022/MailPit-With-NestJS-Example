import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { InjectNodeMailer } from './nodemailer.provider';
import { Logger } from '@nestjs/common';

// * Abstract class to define the EmailService
export abstract class EmailService {
  abstract sendEmail(
    email: string,
    subject: string,
    message: string,
  ): Promise<boolean>;
}

@Injectable()
//* Define our injected NodeMailerService class that will be used by other classes
export class NodeMailerService implements EmailService {
  private readonly logger = new Logger(NodeMailerService.name);

  constructor(
    private readonly configService: ConfigService,

    @InjectNodeMailer()
    private readonly nodeMailerClient,
  ) {}

  async sendEmail(
    to: string,
    subject: string,
    message: string,
  ): Promise<boolean> {
    this.logger.debug(
      `Sending email to ${to} with subject ${subject} and message ${message}`,
    );

    const fromOption = this.configService.get<string>(
      'MAIL_FROM_ADDRESS',
      'hello@example.com',
    );

    try {
      const response = await this.nodeMailerClient.sendMail({
        from: fromOption,
        to: to,
        subject,
        html: message,
      });

      this.logger.debug(response);

      return true;
    } catch (error: any) {
      this.logger.error(error);
      return false;
    }
  }
}

//* Define our NodeMailerProvider to be used by other classes that can be imported into the email module
export const NodeMailerProvider = {
  provide: EmailService,
  useClass: NodeMailerService,
};

//* Function to inject the EmailService
export function InjectEmailer() {
  return Inject(EmailService);
}
