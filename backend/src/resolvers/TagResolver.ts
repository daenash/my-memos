import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Tag } from "../models/Tag";

@Resolver()
export class TagResolver {
  /**
   * Return all tasks
   * @param isChecked optional flag if only checked or unchecked values should be returned
   */
  @Query(() => [Tag])
  tags() {
    return Tag.find();
  }

  /**
   * Return task
   * @param id ID of task
   */
  @Query(() => Tag, { nullable: true })
  tag(@Arg("id") id: string) {
    return Tag.findOne(id);
  }
}
