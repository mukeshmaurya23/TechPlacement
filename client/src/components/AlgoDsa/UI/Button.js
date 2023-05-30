import React from "react";
import styles from "./Button.module.css";
const Button = ({ type, name, onClick, disabled }) => {
  //className={type === "SORT" ? "button sort" : "button newArray"}

  return (
    <>
      <button
        className={`${styles.button} ${
          type === "SORT" ? styles.sort : styles.newArray
        }`}
        disabled={disabled}
        onClick={onClick}
      >
        {name}
      </button>
    </>
  );
};

export default Button;
