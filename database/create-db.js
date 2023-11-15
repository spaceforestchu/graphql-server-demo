import { connection } from "../queries/connection.js";

const { schema } = connection;

await schema.dropTableIfExists("users");

await schema.dropTableIfExists("posts");

await schema.createTable("users", (table) => {
  table.increments("id").primary();
  table.text("name").notNullable();
  table.text("email").unique().notNullable();
});

await schema.createTable("posts", (table) => {
  table.increments("id").primary();
  table.integer("user_id").notNullable();
  table.text("title").notNullable();
  table.text("body").notNullable();
  table.text("createdAt").notNullable();

  table.foreign("user_id").references("id").inTable("users");
});

await connection.table("users").insert([
  {
    name: "michael jordan",
    email: "mj@bulls.com",
  },
  {
    name: "lebron james",
    email: "lj@lakers.com",
  },
]);

await connection.table("posts").insert([
  {
    user_id: 1,
    title: "How I won 6 championchips",
    body: "Just practice over and over",
    createdAt: new Date().toISOString(),
  },
  {
    user_id: 1,
    title: "Just shoot the ball",
    body: "Shoot no matter how many players are guarding you",
    createdAt: new Date().toISOString(),
  },
  {
    user_id: 2,
    title: "How I keep winning",
    body: "Just practice and practice",
    createdAt: new Date().toISOString(),
  },
]);

process.exit();
