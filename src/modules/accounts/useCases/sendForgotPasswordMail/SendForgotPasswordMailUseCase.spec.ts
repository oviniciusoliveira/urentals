import { MailAdapterInterface } from '@/shared/infra/adapters/interfaces/MailAdapter';

import { DateAdapterDate } from '../../../../shared/infra/adapters/date/DateAdapterDate';
import { DateAdapterInterface } from '../../../../shared/infra/adapters/interfaces/DateAdapter';
import { MailAdapterMemory } from '../../../../shared/infra/adapters/mail/memory/MailAdapterMemory';
import { UsersResetPasswordTokensRepositoryInterface } from '../../infra/repositories/interfaces/UsersResetPasswordTokensRepository';
import { UsersRepositoryMemory } from '../../infra/repositories/memory/UsersRepositoryMemory';
import { UsersResetPasswordTokenRepositoryMemory } from '../../infra/repositories/memory/UsersResetPasswordTokenRepositoryMemory';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

describe('Send Forgot Password Mail', () => {
  let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
  let usersRepository: UsersRepositoryMemory;
  let usersResetPasswordTokensRepository: UsersResetPasswordTokensRepositoryInterface;
  let dateAdapter: DateAdapterInterface;
  let mailAdapter: MailAdapterInterface;

  beforeEach(() => {
    usersRepository = new UsersRepositoryMemory();
    dateAdapter = new DateAdapterDate();
    usersResetPasswordTokensRepository = new UsersResetPasswordTokenRepositoryMemory();
    mailAdapter = new MailAdapterMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersResetPasswordTokensRepository,
      dateAdapter,
      mailAdapter,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailAdapter, 'sendMail');

    await usersRepository.create({
      driver_license: 'any_driver_license',
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
    });

    await sendForgotPasswordMailUseCase.perform('any_email');

    expect(sendMail).toHaveBeenCalled();
    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(sendForgotPasswordMailUseCase.perform('nonexistent_email')).rejects.toEqual(
      new Error('User does not exists'),
    );
  });

  it('should be able to create an users token', async () => {
    const createTokenMail = spyOn(usersResetPasswordTokensRepository, 'create');
    await usersRepository.create({
      driver_license: 'any_driver_license',
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
    });
    await sendForgotPasswordMailUseCase.perform('any_email');
    expect(createTokenMail).toHaveBeenCalled();
    expect(createTokenMail).toHaveBeenCalledTimes(1);
  });
});
