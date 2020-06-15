import { Action } from "typesafe-actions";
import TodoModel from "../../../models/todo";
import {
  Actions,
  SelectTodo,
  FetchTodos,
  FetchStart,
  FetchEnd,
  CreateTodo,
  DeleteTodo,
  UpdateTodo,
} from "./types";
import { ThunkAction } from "redux-thunk";
import {
  fetchTodos as fetchTodosGql,
  createTodo as createTodoGql,
  deleteTodo as deleteTodoGql,
  updateTodo as updateTodoGql,
} from "../../../gql-client/todos";

// Actions declaration
export const selectTodo = (todo: TodoModel | null): SelectTodo => ({
  type: Actions.SELECT,
  payload: { todo },
});

const fetchStart = (): FetchStart => ({
  type: Actions.FETCH_START,
});
const fetchEnd = (): FetchEnd => ({
  type: Actions.FETCH_END,
});

const fetchTodos = (todos: TodoModel[]): FetchTodos => ({
  type: Actions.FETCH_TODOS,
  payload: { todos },
});

const createTodo = (todo: TodoModel): CreateTodo => ({
  type: Actions.CREATE_TODO,
  payload: { todo },
});

const deleteTodo = (todo: TodoModel): DeleteTodo => ({
  type: Actions.DELETE_TODO,
  payload: { todo },
});

const updateTodo = (todo: TodoModel): UpdateTodo => ({
  type: Actions.UPDATE_TODO,
  payload: { todo },
});

// Requests (thunks)
export const fetchTodosRequest = (): ThunkAction<
  any,
  any,
  any,
  Action
> => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const todos = await fetchTodosGql();
    dispatch(fetchTodos(todos));
  } catch (e) {
    console.log(e);
  }
  dispatch(fetchEnd());
};

export const createTodoRequest = (
  title: string
): ThunkAction<any, any, any, Action> => async (dispatch) => {
  try {
    dispatch(fetchStart());
    const createdTodo = await createTodoGql(title);
    dispatch(createTodo(createdTodo));
  } catch (e) {
    console.log(e);
  }
  dispatch(fetchEnd());
};

export const deleteTodoRequest = (
  todo: TodoModel
): ThunkAction<any, any, any, Action> => async (dispatch) => {
  try {
    dispatch(fetchStart());
    deleteTodoGql(todo.id.toString());
    dispatch(deleteTodo(todo));
  } catch (e) {
    console.log(e);
  }
  dispatch(fetchEnd());
};

export const toogleTodoRequest = (
  todo: TodoModel
): ThunkAction<any, any, any, Action> => async (dispatch) => {
  try {
    dispatch(fetchStart());
    const resp = await updateTodoGql(todo.id.toString(), {
      isChecked: !todo.isChecked,
    });
    dispatch(updateTodo(resp));
  } catch (e) {
    console.log(e);
  }
  dispatch(fetchEnd());
};
