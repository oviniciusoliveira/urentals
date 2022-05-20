module.exports = {
  type: 'postgres',
  port: 5432,
  host: process.env.DATABASE_HOST,
  username: 'admin',
  password: 'admin',
  database: 'urentcars-db',
  entities: ['./src/database/entities/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
