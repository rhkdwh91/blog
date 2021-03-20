import { Sequelize } from 'sequelize-typescript';
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.js")[env];

export const sequelize = new Sequelize({
  database: config.database,
  username: config.username,
  password: config.password,
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  pool: config.pool,
  models: [__dirname + '/models']
});