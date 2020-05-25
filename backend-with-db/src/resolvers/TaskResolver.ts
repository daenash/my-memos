import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Task } from "../models/Task";
import { CreateTaskInput } from "../inputs/Task";

@Resolver()
export class TaskResolver {
  /**
   * Return all tasks
   * @param isChecked optional flag if only checked or unchecked values should be returned
   */
  @Query(() => [Task])
  tasks(@Arg("isChecked", { nullable: true }) isChecked: boolean) {
    return Task.find({
      where: {
        ...(isChecked != undefined && { isChecked: isChecked }),
      },
    });
  }

  /**
   * Return task
   * @param id ID of task
   */
  @Query(() => Task, { nullable: true })
  task(@Arg("id") id: string) {
    return Task.findOne(id);
  }

  /**
   * Create a task with the specified data
   * @param data The task creation data
   */
  @Mutation(() => Task)
  async addTask(@Arg("data") data: CreateTaskInput) {
    const newTask = Task.create(data);
    await newTask.save();
    return newTask;
  }
}
