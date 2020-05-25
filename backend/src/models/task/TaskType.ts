import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from "graphql";

import { Tag } from "../tag/TagType";
import { getTagsForTask } from "../tag/TagResolvers";

export const Task: GraphQLObjectType = new GraphQLObjectType({
  name: "task",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    tags: {
      type: GraphQLList(Tag)!,
      resolve(parent) {
        return getTagsForTask(parent.id);
      },
    },
  }),
});
