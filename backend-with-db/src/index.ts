import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { TaskResolver } from "./resolvers/TaskResolver";
import { buildSchema } from "type-graphql";
import express from "express";
import { TagResolver } from "./resolvers/TagResolver";

async function main() {
  await createConnection();

  // Create schema
  const schema = await buildSchema({
    resolvers: [TaskResolver, TagResolver],
  });

  // Create Apollo server instance
  const server = new ApolloServer({ schema });

  // Create express server instance
  const app = express();

  // apply express to the Apollo Server
  server.applyMiddleware({ app });

  // Start express app
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

main();
