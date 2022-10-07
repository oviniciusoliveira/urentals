import nodemailer, { Transporter } from 'nodemailer';

import { MailAdapterInterface } from '../../interfaces/MailAdapter';

export class MailAdapterEthereal implements MailAdapterInterface {
  private readonly systemEmail = 'noreply@urentcars.com';
  private readonly systemName = 'uRentCars';
  private client: Transporter | null = null;

  async createClient() {
    return nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
        return transporter;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    if (!this.client) {
      this.client = await this.createClient();
    }

    const message = {
      from: `${this.systemName} <${this.systemEmail}>`,
      to,
      subject,
      html,
    };

    const mail = await this.client.sendMail(message);
    console.log('Message sent: %s', mail.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mail));
  }
}
