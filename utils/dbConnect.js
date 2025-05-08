const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = db;
