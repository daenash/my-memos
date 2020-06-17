import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { updateTodoRequest } from "../../../store/reducers/todos/actions";
import TodoModel from "../../../models/todo";
import "./style.scss";

interface Props {
  todo: TodoModel;
}

const TodoDueDate: React.FC<Props> = ({ todo }) => {
  const [dueDate, setDueDate] = useState(todo.dueDate || null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setDueDate(todo.dueDate || null);
    setIsEditing(false);
  }, [todo]);

  const dispatch = useDispatch();

  const updateTodo = () =>
    dispatch(
      updateTodoRequest(todo, {
        dueTo: dueDate ? dueDate.toDate() : null,
      })
    );

  return (
    <div className="todo-due-date">
      {todo.dueDate || isEditing ? (
        <input
          type="datetime-local"
          value={dueDate?.format("YYYY-MM-DDTHH:mm:ss")}
          onChange={(e) => setDueDate(moment(e.target.value))}
          onBlur={(e) => updateTodo()}
        />
      ) : (
        <p onClick={() => setIsEditing(true)}>Set due date</p>
      )}
    </div>
  );
};

export default TodoDueDate;
