import React from "react";

import styles from "./InputControl.module.css";

function InputControl({ label, ...props }) {
  return (
    <div className={styles.container}>
      {label && (
        <label
          style={{
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          {label}
        </label>
      )}
      <input
        type="text"
        {...props}
        style={{
          border: "1px solid #e2e8f0",
          outline: "none",
          padding: "10px 12px",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      />
    </div>
  );
}

export default InputControl;
