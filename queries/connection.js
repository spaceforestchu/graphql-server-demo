import dotenv from "dotenv";
import knex from "knex";
dotenv.config();

export const connection = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    host: process.env.DB_DB_HOSTPORT || "localhost",
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
  },
});
