import React from "react";
import TodoModel from "../../models/todo";
import "./style.scss";

interface Props {
  todo?: TodoModel | null;
}

const Todo: React.FC<Props> = ({ todo }) => {
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
      <div className="contents">
        <h2>{todo.title}</h2>
        <h2>{todo.dueDate?.format("YYYY-MM-DD HH:mm:ss")}</h2>
        <h2>{todo.isChecked ? "done" : "not done"}</h2>
      </div>
    </div>
  );
};

export default Todo;
