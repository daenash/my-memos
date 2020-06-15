import React, { useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { createTodoRequest } from "../../../store/reducers/todos/actions";

export default function NewTodo() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="todo-input todo-list-item">
      <div className="contents">
        <input
          autoFocus
          type="text"
          value={value}
          placeholder="+ Type here your todo"
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              dispatch(createTodoRequest(value));
              setValue("");
            }
          }}
        />
      </div>
    </div>
  );
}
