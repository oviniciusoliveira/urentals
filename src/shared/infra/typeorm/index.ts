import { createConnection, getConnectionOptions } from 'typeorm';

export const currentConnection = async () => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === 'test' ? 'urentcars_test' : defaultOptions.database,
    }),
  );
};
