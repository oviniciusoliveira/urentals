module.exports = {
  type: 'postgres',
  port: 5432,
  host: process.env.DATABASE_HOST,
  username: 'admin',
  password: 'admin',
  database: 'urentcars-db',
};
