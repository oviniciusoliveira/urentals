/* eslint-disable @typescript-eslint/no-non-null-assertion */
type EnvConfig = {
  port: number;
};

export const env: EnvConfig = {
  port: Number(process.env.PORT!) || 3333,
};
