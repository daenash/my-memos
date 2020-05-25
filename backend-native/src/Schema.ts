import { GraphQLSchema } from "graphql";
import Query from "./models/Query";
import Mutation from "./models/Mutation";

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
