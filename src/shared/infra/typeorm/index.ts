import { createConnection } from 'typeorm';

export const currentConnection = async () => {
  return createConnection();
};
