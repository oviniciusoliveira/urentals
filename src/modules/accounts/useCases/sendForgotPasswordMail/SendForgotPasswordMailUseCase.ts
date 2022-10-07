import fs from 'fs';
import handlebars from 'handlebars';
import { resolve } from 'path';
import { v4 as uuidV4 } from 'uuid';

import { DateAdapterInterface } from '@/shared/infra/adapters/interfaces/DateAdapter';
import { MailAdapterInterface } from '@/shared/infra/adapters/interfaces/MailAdapter';

import { UsersRepositoryInterface } from '../../infra/repositories/interfaces/UsersRepository';
import { UsersResetPasswordTokensRepositoryInterface } from '../../infra/repositories/interfaces/UsersResetPasswordTokensRepository';

export class SendForgotPasswordMailUseCase {
  private TOKEN_LIFETIME_IN_HOURS = 3;

  constructor(
    private usersRepository: UsersRepositoryInterface,
    private usersResetPasswordTokensRepository: UsersResetPasswordTokensRepositoryInterface,
    private dateAdapter: DateAdapterInterface,
    private mailAdapter: MailAdapterInterface,
  ) {}

  async perform(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('User does not exists');
    }

    const resetToken = uuidV4();
    const expiresDate = this.dateAdapter.addDays(new Date(), this.TOKEN_LIFETIME_IN_HOURS);

    await this.usersResetPasswordTokensRepository.create({
      userId: user.id,
      resetPasswordToken: resetToken,
      expiresDate: expiresDate,
    });

    const templatePath = resolve(__dirname, '../../views/email/forgotPassword.hbs');
    const emailTemplateFile = fs.readFileSync(templatePath).toString('utf-8');
    const handlebarsTemplate = handlebars.compile(emailTemplateFile);

    const templateVariables = {
      name: user.name,
      link: `${process.env.BASE_API_URL}/passwords/reset?token=${resetToken}`,
    };

    const templateHTML = handlebarsTemplate(templateVariables);

    await this.mailAdapter.sendMail(email, 'Recuperação de Senha', templateHTML);
  }
}
