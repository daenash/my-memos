import React from "react";
import TodoModel from "../../models/todo";
import "./style.scss";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import {
  selectTodo,
  toogleTodoRequest,
} from "../../store/reducers/todos/actions";

interface Props {
  todo: TodoModel;
}

const TodoListItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div className="todo-list-item" onClick={() => dispatch(selectTodo(todo))}>
      <div className="contents">
        <p>{todo.title}</p>
        <p>{todo.dueDate?.format("MMM DD. HH:mm")}</p>
        <input
          type="checkbox"
          checked={todo.isChecked}
          onChange={() => {
            dispatch(toogleTodoRequest(todo));
          }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {todo.isChecked ? (
        <div className="left-border left-border-green"></div>
      ) : (
        <div
          className={classNames({
            "left-border": todo.dueDate && todo.dueIn()! < 5,
            "left-border-orange": todo.dueDate && todo.dueIn()! < 5,
            "left-border-red": todo.dueDate && todo.dueIn()! < 2,
          })}
        ></div>
      )}
    </div>
  );
};

export default TodoListItem;
