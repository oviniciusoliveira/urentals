import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export const currentConnection: () => Promise<Connection> = async () => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === 'test' ? 'urentcars_test' : defaultOptions.database,
    }),
  );
};
