import React from "react";
import Checkbox from "../checkbox";
import { useDispatch } from "react-redux";
import { toggleTodoRequest } from "../../../store/reducers/todos/actions";
import TodoModel from "../../../models/todo";

interface Props {
  todo: TodoModel;
}

const TodoToggler: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  return (
    <Checkbox
      onCheck={() => dispatch(toggleTodoRequest(todo))}
      isChecked={todo.isChecked}
      stopPropagation
    />
  );
};

export default TodoToggler;
