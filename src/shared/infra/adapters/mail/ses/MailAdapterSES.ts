import { SES } from 'aws-sdk';
import nodemailer, { Transporter } from 'nodemailer';

import { MailAdapterInterface } from '../../interfaces/MailAdapter';

export class MailAdapterSES implements MailAdapterInterface {
  private client: Transporter;

  constructor() {
    const ses = new SES({
      apiVersion: '2010-12-01',
      region: process.env.AWS_REGION,
    });

    this.client = nodemailer.createTransport({
      SES: ses,
    });
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    const message = {
      from: `${process.env.SYSTEM_NAME} <${process.env.SYSTEM_EMAIL}>`,
      to,
      subject,
      html,
    };

    await this.client.sendMail(message);
  }
}
