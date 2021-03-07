import mysql from "promise-mysql";

const dbConfig = {
  host: "localhost",
  port: 3306,
  user: "유저정보",
  password: "패스워드정보",
  database: "graphql_test",
};

export default mysql.createPool(dbConfig);