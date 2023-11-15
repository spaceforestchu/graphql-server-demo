import { GraphQLError } from "graphql";

import { getAllUsers, getUserById } from "./queries/users.js";
import { getAllPosts, getPostByUserId, getPostById } from "./queries/posts.js";

export const resolvers = {
  Query: {
    users: () => getAllUsers(),
    posts: () => getAllPosts(),
    user: async (_root, _user) => {
      const user = await getUserById(_user.id);

      if (!user) {
        throw notFoundError(`No user found with id ${_user.id}`);
      }

      return user;
    },
    post: async (_root, _post) => {
      const post = await getPostById(_post.id);

      if (!post) {
        throw notFoundError(`No post found with id ${_post.id}`);
      }

      return post;
    },
  },
  Post: {
    user_id: (data) => {
      return data.user_id;
    },
    user_info: (data) => {
      return getUserById(data.user_id);
    },
  },
  User: {
    posts: (data) => {
      return getPostByUserId(data.id);
    },
  },
};

const notFoundError = (message) =>
  new GraphQLError(message, {
    extensions: { code: 404, message: "NOT_FOUND" },
  });
