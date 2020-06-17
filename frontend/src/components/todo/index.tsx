import React from "react";
import TodoModel from "../../models/todo";
import classNames from "classnames";
import "./style.scss";
import { useDispatch } from "react-redux";
import { deleteTodoRequest } from "../../store/reducers/todos/actions";
import TodoToggler from "../inputs/todo-toggler";
import TodoDescription from "../inputs/todo-description";
import TodoDueDate from "../inputs/todo-due-date";

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

        <div className="due-date flex">
          <p>Task due date:</p>
          <TodoDueDate todo={todo} />
        </div>

        <div className="description flex">
          <p>Description:</p>
          <TodoDescription todo={todo} />
        </div>

        <div className="footer flex">
          <button
            className="btn-text btn-danger icon-left"
            onClick={() => dispatch(deleteTodoRequest(todo))}
          >
            <i className="fa fa-trash" />
            Delete
          </button>
          <TodoToggler todo={todo} />
        </div>
      </div>
    </div>
  );
};

export default Todo;
