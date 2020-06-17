import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTodoRequest } from "../../../store/reducers/todos/actions";
import TodoModel from "../../../models/todo";
import "./style.scss";

interface Props {
  todo: TodoModel;
}

const TodoDescription: React.FC<Props> = ({ todo }) => {
  const [description, setDescription] = useState(todo.description || "");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setDescription(todo.description || "");
    setIsEditing(false);
  }, [todo]);

  const dispatch = useDispatch();

  const updateTodo = () =>
    dispatch(
      updateTodoRequest(todo, {
        description: description === "" ? null : description,
      })
    );

  return isEditing ? (
    <div className="todo-description">
      <input
        type="text"
        autoFocus
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            updateTodo();
          }
          if (e.key === "Esc") {
            setIsEditing(false);
            setDescription(todo.description || "");
          }
        }}
      />
      <button className="btn-icon btn-success" onClick={() => updateTodo()}>
        <i className="fa fa-check-circle" />
      </button>
      <button
        className="btn-icon btn-danger"
        onClick={() => {
          setIsEditing(false);
          setDescription(todo.description || "");
        }}
      >
        <i className="fa fa-times-circle" />
      </button>
    </div>
  ) : (
    <p onClick={() => setIsEditing(true)}>
      {todo.description || "Set description"}
    </p>
  );
};

export default TodoDescription;
