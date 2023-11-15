import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { readFile } from "node:fs/promises";

import { resolvers } from "./resolvers.js";

const PORT = 8080;

const app = express();
app.use(cors(), express.json());

const typeDefs = await readFile("./schema.graphql", "utf-8");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

try {
  await apolloServer.start();
  console.log("Apollo server started");
} catch (e) {
  console.log(e);
}

app.use("/graphql", apolloMiddleware(apolloServer));

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
