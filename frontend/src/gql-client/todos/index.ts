import client from "..";
import { gql } from "apollo-boost";
import TodoModel from "../../models/todo";

export type TodoUpdateRequest = {
  title?: string;
  description?: string | null;
  isChecked?: boolean;
  dueTo?: Date | null;
};

export type TodoResponse = {
  id: string;
  title: string;
  isChecked: boolean;
  createdAt: Date;
  description?: string;
  dueTo?: Date;
};

const todoResponseToModel = (todo: TodoResponse): TodoModel => {
  return new TodoModel({ ...todo, dueDate: todo.dueTo, id: parseInt(todo.id) });
};

export const fetchTodos = async (): Promise<TodoModel[]> => {
  const resp = await client.query<{
    tasks: TodoResponse[];
  }>({
    query: gql`
      {
        tasks {
          id
          title
          isChecked
          createdAt
          dueTo
          description
        }
      }
    `,
  });
  return resp.data.tasks.map((e) => todoResponseToModel(e));
};

export const createTodo = async (title: string): Promise<TodoModel> => {
  const resp = await client.mutate<{ addTask: TodoResponse }>({
    mutation: gql`
      mutation AddTask($title: String!) {
        addTask(data: { title: $title }) {
          id
          title
          isChecked
          createdAt
          dueTo
          description
        }
      }
    `,
    variables: { title },
  });
  return todoResponseToModel(resp.data?.addTask!);
};

export const deleteTodo = async (id: string): Promise<Boolean> => {
  const resp = await client.mutate<{ deleteTask: boolean }>({
    mutation: gql`
      mutation DeleteTask($id: String!) {
        deleteTask(id: $id)
      }
    `,
    variables: { id },
  });
  return resp.data?.deleteTask!;
};

export const updateTodo = async (
  id: string,
  updateFields: TodoUpdateRequest
): Promise<TodoModel> => {
  const resp = await client.mutate<{ updateTask: TodoResponse }>({
    mutation: gql`
      mutation UpdateTask($id: String!, $data: EditTaskInput!) {
        updateTask(id: $id, data: $data) {
          id
          title
          isChecked
          createdAt
          dueTo
          description
        }
      }
    `,
    variables: { id, data: updateFields },
  });
  return todoResponseToModel(resp.data?.updateTask!);
};
