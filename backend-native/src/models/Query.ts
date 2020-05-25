import { GraphQLObjectType, GraphQLList, GraphQLID } from "graphql";
import { Task } from "./task/TaskType";
import { getTasks, getTask } from "./task/TaskResolvers";
import { Tag } from "./tag/TagType";
import { getTag, getTags } from "./tag/TagResolvers";

export default new GraphQLObjectType({
  name: "query",
  fields: {
    // ----------------------
    // Base queries for tasks
    // ----------------------

    tasks: {
      type: GraphQLList(Task),
      args: {},
      resolve() {
        return getTasks();
      },
    },

    task: {
      type: Task,
      args: {
        id: { type: GraphQLID },
      },
      resolve(_, args) {
        return getTask(args.id);
      },
    },

    // ---------------------
    // Base queries for tags
    // ---------------------

    tags: {
      type: GraphQLList(Tag),
      args: {},
      resolve() {
        return getTags();
      },
    },

    tag: {
      type: Tag,
      args: {
        id: { type: GraphQLID },
      },
      resolve(_, args) {
        return getTag(args.id);
      },
    },
  },
});
