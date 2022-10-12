import nodemailer, { Transporter } from 'nodemailer';

import { MailAdapterInterface } from '../../interfaces/MailAdapter';

export class MailAdapterMailGun implements MailAdapterInterface {
  private client: Transporter | null = null;
  async createClient() {
    return nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PRIVATE_KEY,
      },
    });
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    if (!this.client) {
      this.client = await this.createClient();
    }

    const message = {
      from: `${process.env.SYSTEM_NAME} <${process.env.SYSTEM_EMAIL}>`,
      to,
      subject,
      html,
    };

    const mail = await this.client.sendMail(message);
    console.log('Message sent: %s', mail.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mail));
  }
}
