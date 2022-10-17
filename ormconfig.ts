module.exports = {
  name: 'default',
  type: 'postgres',
  port: 5432,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['./src/modules/**/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};
