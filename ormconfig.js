module.exports = {
  type: 'postgres',
  port: 5432,
  host: process.env.DATABASE_HOST,
  username: 'admin',
  password: 'admin',
  database: 'urentcars-db',
  entities: ['./src/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};
