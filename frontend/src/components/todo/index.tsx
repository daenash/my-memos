import React from "react";
import TodoModel from "../../models/todo";
import classNames from "classnames";
import "./style.scss";
import { useDispatch } from "react-redux";
import { deleteTodoRequest } from "../../store/reducers/todos/actions";

interface Props {
  todo?: TodoModel | null;
}

const Todo: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  // Empty state
  if (!todo) {
    return (
      <div className="todo-details">
        <div className="contents">No todo selected</div>
      </div>
    );
  }

  return (
    <div className="todo-details">
      <div
        className={classNames({
          "todo-status": true,
          "todo-status-checked": todo.isChecked,
          "todo-status-warning": todo.isSoftWarning(),
          "todo-status-warning-orange": todo.isSoftWarning(),
          "todo-status-warning-red": todo.isHardWarning(),
        })}
      >
        {todo.warningMessage()}
      </div>
      <div className="contents">
        <h2 className="title">{todo.title}</h2>

        <div className="due-date">
          <p>Task due date:</p>
          <p>
            {todo.dueDate
              ? todo.dueDate?.format("YYYY-MM-DD HH:mm:ss")
              : "Set due date"}
          </p>
        </div>
        <div className="description">
          <p>{todo.description}</p>
        </div>
        <div className="footer">
          <p onClick={() => dispatch(deleteTodoRequest(todo))}>Delete</p>
        </div>
      </div>
    </div>
  );
};

export default Todo;
