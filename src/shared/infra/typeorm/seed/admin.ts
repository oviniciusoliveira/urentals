import { v4 as uuidV4 } from 'uuid';

import { CryptAdapter } from '../../adapters';

import { currentConnection } from '..';

async function create() {
  const connection = await currentConnection();

  const id = uuidV4();
  const cryptAdapter = new CryptAdapter();
  // TODO - move to env config
  const password = await cryptAdapter.encrypt('admin');

  await connection.query(
    `INSERT INTO users(id, name, email, password, is_admin, driver_license) VALUES ('${id}', 'admin', 'admin@urentcars.com', '${password}', 'true', '55-55-55');`,
  );

  await connection.close();
}

create()
  .then(() => console.log('Admin user created'))
  .catch((error: any) => console.error(`Error creating admin user: ${error.message || error}`));
