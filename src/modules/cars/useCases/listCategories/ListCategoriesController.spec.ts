import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { CryptAdapter } from '../../../../shared/infra/adapters';
import { app } from '../../../../shared/infra/express/app';

describe('List Category Controller', () => {
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

  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/authenticate').send({
      email: 'admin@urentcars.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'any name',
        description: 'any description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].name).toBe('any name');
    expect(response.body[0].description).toBe('any description');
  });
});
