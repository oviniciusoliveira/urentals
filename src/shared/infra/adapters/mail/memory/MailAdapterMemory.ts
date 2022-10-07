import { MailAdapterInterface } from '../../interfaces/MailAdapter';

type Email = {
  to: string;
  subject: string;
  html: string;
};

export class MailAdapterMemory implements MailAdapterInterface {
  private emails: Email[] = [];

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    this.emails.push({
      to,
      subject,
      html,
    });
  }
}
