import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { Task } from "../task/TaskType";
import { getTasksForTag } from "../task/TaskResolvers";

export const Tag: GraphQLObjectType = new GraphQLObjectType({
  name: "tags",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    color: { type: GraphQLString },
    tasks: {
      type: GraphQLList(Task)!,
      resolve(parent) {
        return getTasksForTag(parent.id);
      },
    },
  }),
});
