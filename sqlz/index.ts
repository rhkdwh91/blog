import { Sequelize } from "sequelize-typescript";
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.js")[env];

/***
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
***/
const storage =
  env === "production" ? "../sqlite/blog.db" : "./sqlz/config/blog.db";
export const sequelize = new Sequelize({
  database: config.database,
  pool: config.pool,
  dialect: "sqlite",
  //storage:'official_website.db',
  storage,
  models: [__dirname + "/models"],
});
