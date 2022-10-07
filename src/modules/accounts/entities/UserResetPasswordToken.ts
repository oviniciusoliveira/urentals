export type UserResetPasswordToken = {
  id: string;
  userId: string;
  resetPasswordToken: string;
  expiresDate: Date;
  createdAt: Date;
};
