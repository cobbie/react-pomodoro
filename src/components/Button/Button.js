import React from "react";
import "./style.css";
import dropdownButton from "../../resources/dropdown-button.svg";

const renderDropdown = containsDropdown => {
  if (containsDropdown) {
    return (
      <div className="dropdown-button">
        <img src={dropdownButton} />
      </div>
    );
  }
};

const classNames = require("classnames");
const Button = props => {
  const buttonText = classNames("button-name", {
    "green-text": props.isGreen,
    "white-text": props.isWhite,
    "yellow-text": props.isYellow
  });
  const buttonContainer = classNames({
    container: props.isSmall,
    "large-container": !props.isSmall,
    "red-button": props.isRed
  });
  const textBox = classNames({
      "sb-flexbox": props.isSmall,
      "bb-box": !props.isSmall
  })
  return (
    <div className={buttonContainer}>
      <div className={textBox}>
        <div className={buttonText}>{props.buttonName}</div>
        {renderDropdown(props.containsDropdown)}
      </div>
    </div>
  );
};

export default Button;
