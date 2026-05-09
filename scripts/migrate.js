import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255)        NOT NULL,
    email       VARCHAR(255)        UNIQUE NOT NULL,
    password    VARCHAR(255)        NOT NULL,
    created_at  TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP           DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

async function migrate() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    console.log("✔  Connected to MySQL");

    await connection.execute(CREATE_USERS_TABLE);
    console.log("✔  Table 'users' is ready");
  } catch (err) {
    console.error("✘  Migration failed:", err.message);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

migrate();
