/* eslint-disable @typescript-eslint/no-non-null-assertion */
type EnvConfig = {
  secretTokenKey: string;
  port: number;
};

export const env: EnvConfig = {
  secretTokenKey: process.env.SECRET_TOKEN_KEY!,
  port: Number(process.env.PORT!) || 3333,
};
