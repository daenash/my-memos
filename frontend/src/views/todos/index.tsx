// Imports for hooky implementation
//
// import gql from "graphql-tag";
// import { useQuery } from "@apollo/react-hooks";
// import TodoModel from "../../models/todo";

import React, { useEffect } from "react";
import Todo from "../../components/todo";
import TodoListGroup from "../../components/todo-list-group";
import NewTodo from "../../components/inputs/new-todo";
import { useSelector, useDispatch } from "react-redux";

import "./style.scss";
import { RootState } from "../../store/reducers";
import { fetchTodosRequest } from "../../store/reducers/todos/actions";

export default function TodosView() {
  //
  // Could have been solved with hooks too.
  //
  // const GET_TASKS = gql`
  //   {
  //     tasks {
  //       id
  //       title
  //       isChecked
  //       createdAt
  //       dueTo
  //     }
  //   }
  // `;

  // const {
  //   loading: loadingTodos,
  //   error: errorTodos,
  //   data: { tasks } = { tasks: [] },
  // } = useQuery<{ tasks: TodoModel[] }, null>(GET_TASKS);

  const tasks = useSelector((store: RootState) => store.todos.todos);
  const task = useSelector((store: RootState) => store.todos.selectedTodo);
  const isFetching = useSelector((store: RootState) => store.todos.isFetching);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  const ongoingTodos = tasks.filter((todo) => !todo.isChecked);
  const completedTodos = tasks.filter((todo) => todo.isChecked);

  return (
    <div className="todos-view">
      <div>
        <NewTodo></NewTodo>
        <TodoListGroup
          name="Ongoing"
          todos={ongoingTodos}
          isLoading={isFetching}
        ></TodoListGroup>
        <TodoListGroup
          name="Completed"
          todos={completedTodos}
          isLoading={isFetching}
        ></TodoListGroup>
      </div>
      <div>
        <Todo todo={task}></Todo>
      </div>
    </div>
  );
}
