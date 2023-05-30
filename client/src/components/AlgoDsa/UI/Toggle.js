import React from "react";
import styles from "./Toggle.module.css";
const Toggle = ({ context, soundState, onChange, disabled }) => {
  return (
    <>
      <div className={styles.toggle}>
        <span className={styles.context}>{context}</span>
        <div onChange={onChange}>
          <label className={styles["toggle-switch"]}>
            <input
              type="checkbox"
              disabled={disabled}
              defaultChecked
              className={styles.input}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
          <span className={styles["sound-state"]}>{soundState}</span>
        </div>
      </div>
    </>
  );
};

export default Toggle;
