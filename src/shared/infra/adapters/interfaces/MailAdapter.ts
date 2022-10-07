export interface MailAdapterInterface {
  sendMail(to: string, subject: string, html: string): Promise<void>;
}
