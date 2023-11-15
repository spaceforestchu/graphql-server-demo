import { connection } from "./connection.js";

const PostsTable = () => connection.table("posts");

export async function getAllPosts() {
  console.log(await PostsTable().select());
  return await PostsTable().select();
}

export async function getPostByUserId(userId) {
  return await PostsTable().select().where({ user_id: userId });
}

export async function getPostById(postId) {
  return await PostsTable().first().where({ id: postId });
}
