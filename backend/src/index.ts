import express from "express";
import expressGraphQL from "express-graphql";
import Schema from "./Schema";

const app = express();
app.use(
  "/graphql",
  expressGraphQL({
    schema: Schema,
    graphiql: true,
  })
);
app.listen(4000);
