import React from "react";
import "./style.scss";
import classNames from "classnames";

interface Props {
  stopPropagation?: boolean;
  isChecked?: boolean;
  onCheck: Function;
}

const Checkbox: React.FC<Props> = ({ isChecked, onCheck, stopPropagation }) => {
  return (
    <div
      className="checkbox"
      onClick={(e) => {
        if (stopPropagation) e.stopPropagation();
        onCheck();
      }}
    >
      <i
        className={classNames({
          fa: true,
          "fa-circle": true,
          checked: isChecked,
        })}
      />
    </div>
  );
};

export default Checkbox;
