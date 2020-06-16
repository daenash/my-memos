import React from "react";
import TodoModel from "../../models/todo";
import "./style.scss";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import {
  selectTodo,
  toggleTodoRequest,
} from "../../store/reducers/todos/actions";
import Checkbox from "../inputs/checkbox";

interface Props {
  todo: TodoModel;
}

const TodoListItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="todo-list-item todo-list-item-hoverable"
      onClick={() => dispatch(selectTodo(todo))}
    >
      <div className="contents">
        <p>{todo.title}</p>
        <p>{todo.dueDate?.format("MMM DD. HH:mm")}</p>
        <Checkbox
          onCheck={() => dispatch(toggleTodoRequest(todo))}
          isChecked={todo.isChecked}
          stopPropagation
        />
      </div>

      <div
        className={classNames({
          "left-border": todo.isChecked || todo.isSoftWarning(),
          "left-border-green": todo.isChecked,
          "left-border-orange": todo.isSoftWarning(),
          "left-border-red": todo.isHardWarning(),
        })}
      />
    </div>
  );
};

export default TodoListItem;
