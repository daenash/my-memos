import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Task } from "../models/Task";
import { CreateTaskInput, EditTaskInput } from "../inputs/Task";
import { ApolloError, UserInputError } from "apollo-server-express";

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

  /**
   * Delete a task with the specified id
   * @param id The task id
   */
  @Mutation(() => Boolean)
  async deleteTask(@Arg("id") id: string) {
    const taskToDelete = await Task.findOne(id);
    if (!taskToDelete) {
      throw new UserInputError("Task not found", {
        id: `Task with id ${id} not found`,
      });
    }
    await taskToDelete.remove();
    return true;
  }

  /**
   * Delete a task with the specified id
   * @param id The task id
   */
  @Mutation(() => Task)
  async updateTask(@Arg("data") data: EditTaskInput, @Arg("id") id: string) {
    const taskToEdit = await Task.findOne(id);

    if (!taskToEdit) {
      throw new UserInputError("Task not found", {
        id: `Task with id ${id} not found`,
      });
    }

    if (data.title) taskToEdit.title = data.title;
    if (data.dueTo) taskToEdit.dueTo = data.dueTo;
    if (data.description) taskToEdit.description = data.description;
    if (data.isChecked !== undefined) taskToEdit.isChecked = data.isChecked;
    await taskToEdit.save();
    return taskToEdit;
  }
}
