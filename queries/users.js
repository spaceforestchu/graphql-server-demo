import { connection } from "../queries/connection.js";

const UsersTable = () => connection.table("users");

export async function getAllUsers() {
  return await UsersTable().select();
}
export async function getUserById(id) {
  return await UsersTable().first().where({ id });
}
