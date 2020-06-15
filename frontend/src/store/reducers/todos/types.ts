import TodoModel from "../../../models/todo";

// Action declarations
export enum Actions {
  FETCH_START = "FETCH_START",
  FETCH_END = "FETCH_END",

  FETCH_TODOS = "FETCH_TODOS",
  CREATE_TODO = "CREATE_TODO",
  DELETE_TODO = "DELETE_TODO",
  UPDATE_TODO = "UPDATE_TODO",

  SELECT = "SELECT",
}

// ------------------------
// Action Interfaces

export interface SelectTodo {
  type: typeof Actions.SELECT;
  payload: { todo: TodoModel | null };
}
export interface FetchStart {
  type: typeof Actions.FETCH_START;
}
export interface FetchEnd {
  type: typeof Actions.FETCH_END;
}
export interface FetchTodos {
  type: typeof Actions.FETCH_TODOS;
  payload: { todos: TodoModel[] };
}
export interface CreateTodo {
  type: typeof Actions.CREATE_TODO;
  payload: { todo: TodoModel };
}
export interface DeleteTodo {
  type: typeof Actions.DELETE_TODO;
  payload: { todo: TodoModel };
}
export interface UpdateTodo {
  type: typeof Actions.UPDATE_TODO;
  payload: { todo: TodoModel };
}

export type TodosActionType =
  | SelectTodo
  | FetchTodos
  | FetchStart
  | FetchEnd
  | CreateTodo
  | DeleteTodo
  | UpdateTodo;
