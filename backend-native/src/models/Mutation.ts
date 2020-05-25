import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from "graphql";
import { Task } from "./task/TaskType";
import { addTask } from "./task/TaskResolvers";

export default new GraphQLObjectType({
  name: "mutation",
  fields: {
    addTask: {
      type: Task,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        tagIds: { type: GraphQLList(GraphQLID) },
      },
      resolve(_, args) {
        return addTask({
          title: args.title,
          description: args.description,
          tagIds: args.tagIds,
        });
      },
    },
  },
});
