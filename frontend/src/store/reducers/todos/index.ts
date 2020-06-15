import { TodosActionType, Actions } from "./types";
import TodoModel from "../../../models/todo";
import { stat } from "fs";

export type TodosState = Readonly<{
  isFetching: Boolean;
  todos: TodoModel[];
  selectedTodo: TodoModel | null;
}>;

const initialState: TodosState = {
  isFetching: false,
  todos: [],
  selectedTodo: null,
};

export default (state = initialState, action: TodosActionType) => {
  switch (action.type) {
    case Actions.SELECT:
      return {
        ...state,
        selectedTodo: action.payload.todo,
      };
    case Actions.FETCH_START:
      return {
        ...state,
        isFetching: true,
      };
    case Actions.FETCH_END:
      return {
        ...state,
        isFetching: false,
      };
    case Actions.FETCH_TODOS:
      return {
        ...state,
        todos: action.payload.todos,
      };
    case Actions.CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload.todo],
      };
    case Actions.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.todo.id),
        selectedTodo:
          state.selectedTodo?.id === action.payload.todo.id
            ? null
            : state.selectedTodo,
      };
    case Actions.UPDATE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos.filter((todo) => todo.id !== action.payload.todo.id),
          action.payload.todo,
        ],
        selectedTodo:
          state.selectedTodo?.id === action.payload.todo.id
            ? action.payload.todo
            : state.selectedTodo,
      };
    default:
      return state;
  }
};
