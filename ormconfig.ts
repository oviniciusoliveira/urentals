module.exports = {
  name: 'default',
  type: 'postgres',
  port: 5432,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSSWORD,
  database: process.env.DATABASE_NAME,
  entities: [process.env.ORM_ENTITIES_PATH],
  migrations: [process.env.ORM_MIGRATIONS_PATH],
  cli: {
    migrationsDir: process.env.ORM_MIGRATIONS_DIR_PATH,
  },
};
