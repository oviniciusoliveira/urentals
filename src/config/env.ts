type EnvConfig = {
  secretTokenKey: string;
};

export const env: EnvConfig = {
  secretTokenKey: process.env.SECRET_TOKEN_KEY!,
};
