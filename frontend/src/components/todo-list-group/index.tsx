import React from "react";
import TodoModel from "../../models/todo";
import TodoListItem from "../todo-list-item";
import "./style.scss";
import TodoListItemLoader from "../loaders/todo-list-item-loader";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";

interface Props {
  name: string;
  todos?: Array<TodoModel>;
}

const TodoListGroup: React.FC<Props> = ({ name, todos }) => {
  const isFetching = useSelector((store: RootState) => store.todos.isFetching);
  const allTodos = useSelector((store: RootState) => store.todos.todos);

  return (
    <div className="todo-list-group">
      <h2>{name}</h2>
      <div className="todos">
        {isFetching && allTodos?.length === 0
          ? [1, 2, 3].map((e) => <TodoListItemLoader key={e} />)
          : todos
              ?.sort((a, b) => {
                if (!a.dueDate && !b.dueDate) {
                  return a.createdAt.diff(b.createdAt);
                }
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return a.dueDate.diff(b.dueDate, "day");
              })
              .map((todo) => <TodoListItem key={todo.id} todo={todo} />)}
      </div>
    </div>
  );
};

export default TodoListGroup;
