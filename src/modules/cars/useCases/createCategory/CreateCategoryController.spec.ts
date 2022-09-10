import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { CryptAdapter } from '../../../../shared/infra/adapters';
import { app } from '../../../../shared/infra/express/app';

describe('Create Category Controller', () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const id = uuidV4();
    const cryptAdapter = new CryptAdapter();
    const password = await cryptAdapter.encrypt('admin');
    await connection.query(
      `INSERT INTO users(id, name, email, password, is_admin, driver_license) VALUES ('${id}', 'admin', 'admin@urentcars.com', '${password}', 'true', '55-55-55');`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/authenticate').send({
      email: 'admin@urentcars.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'any name',
        description: 'any description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new category if name already exists', async () => {
    const responseToken = await request(app).post('/authenticate').send({
      email: 'admin@urentcars.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'any name',
        description: 'any description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
