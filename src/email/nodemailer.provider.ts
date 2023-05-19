import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

//* provider factory to inject the NodeMailerClient
export const nodeMailerClient = {
  provide: 'NODE_MAILER_CLIENT',
  useFactory: async (configService: ConfigService) => {
    const client = await createTransport({
      host: configService.get('MAIL_HOST', 'localhost'),
      port: +configService.get('EMAIL_PORT', 1025),
      secure: configService.get('EMAIL_SECURE', false),
      auth: {
        user: configService.get('EMAIL_USER', ''),
        pass: configService.get('EMAIL_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    return client;
  },
  inject: [ConfigService],
};

//* Function to inject the NodeMailerClient
export function InjectNodeMailer() {
  return Inject('NODE_MAILER_CLIENT');
}
