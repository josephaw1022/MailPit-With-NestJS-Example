import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { nodeMailerClient } from './nodemailer.provider';
import { NodeMailerProvider } from './email.providers';
import { EmailController } from './email.controller';

@Module({
  providers: [nodeMailerClient, NodeMailerProvider],
  exports: [NodeMailerProvider],
  controllers: [EmailController],
  imports: [ConfigModule],
})
export class EmailModule {}
