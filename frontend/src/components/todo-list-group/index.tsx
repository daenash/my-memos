import React from "react";
import TodoModel from "../../models/todo";
import TodoListItem from "../todo-list-item";
import "./style.scss";
import TodoListItemLoader from "../loaders/todo-list-item-loader";

interface Props {
  name: string;
  todos?: Array<TodoModel>;
  isLoading?: Boolean;
}

const TodoListGroup: React.FC<Props> = ({ name, todos, isLoading }) => {
  return (
    <div className="todo-list-group">
      <h2>{name}</h2>
      <div className="todos">
        {isLoading && todos?.length === 0
          ? Array(3)
              .fill(1)
              .map(() => <TodoListItemLoader />)
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
